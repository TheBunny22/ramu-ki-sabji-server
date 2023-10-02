// User document structure
const mongoose = require("mongoose");
const { comparePasswords, hashPassword } = require("../helpers/EncryptingPass");

const userSchema = new mongoose.Schema({
  username: {
    f_name: { type: String, required: true },
    l_name: { type: String, required: true },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Regular expression for a valid email pattern
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(v);
      },
      message: "Email address is not valid.",
    },
  },
  password: { type: String, required: true },
  mobile: { type: Number, required: true },
  address: [
    {
      add_name: { type: String, default: "home", maxlength: 10 },
      street: { type: String, default: "" },
      landmark: { type: String, default: "" },
      city: { type: String, default: "Himmatnagar" },
      zipcode: { type: Number, default: 383001 },
      state: { type: String, default: "Gujarat , In" },
    },
  ],
  cart: [
    {
      cart_id: { type: mongoose.Schema.Types.ObjectId, required: true }, // Assuming you use MongoDB ObjectId for items
      quantity: { type: Number, required: true },
    },
  ],
});

// user sign-up / register static function
userSchema.statics.NewUser = async function (
  f_name,
  l_name,
  email,
  password,
  mobile
) {
  if (!f_name || !l_name || !email || !password || !mobile) {
    throw new Error("--:DB Provide all Field to Sign-UP");
  }

  return this.create({
    username: {
      f_name,
      l_name,
    },
    email,
    password: hashPassword(password),
    mobile,
  });
};

// // match otp
// userSchema.statics.matchOtp = async function (_id, otp) {
//   if (!_id || !otp) {
//     throw new Error("--:DB Provide all Credentials for Otp Verification:--");
//   }
//   const user = await this.findOne({ _id });
//   if (user.otp != otp) {
//     return null;
//   }
//   return user;
// };

// user sign-in / login static function
userSchema.statics.signIn = async function (email, password) {
  if (!email || !password) {
    throw new Error("--:DB Provide all Credentials for User Login:--");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("--:DB User Not Found:--");
  }
  const verify = comparePasswords(password, user.password);
  if (!verify) {
    return null;
  }
  return user;
};

// get cart item
userSchema.statics.getCart = async function (_id) {
  const cart = await this.findById(_id, "cart");
  return cart.cart;
};

// function to address in user
userSchema.statics.addAddress = async function(userId, address) {
  try {
    const updatedUser = await this.findOneAndUpdate(
      { _id: userId },
      { $push: { address: address } },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  } catch (error) {
    console.error(error.message);
    throw new Error("Error adding address");
  }
};

// Static function to remove an address by add_name
userSchema.statics.removeAddress = async function (userId, addName) {
  const user = await this.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const updatedAddresses = user.address.filter(
    (address) => address.add_name !== addName
  );
  user.address = updatedAddresses;
  await user.save();

  return user;
};

userSchema.statics.addItemToCart = async function (userId, item) {
  const user = await this.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  user.cart.push(item);
  await user.save();

  return user;
};

// Static function to remove an item from the cart by item_id
userSchema.statics.removeItemFromCart = async function (userId, cartId) {
  const user = await this.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const updatedCart = user.cart.filter(
    (cartItem) => cartItem.cart_id.toString() !== cartId.toString()
  );
  user.cart = updatedCart;
  await user.save();

  return user;
};

// Static function to empty the cart
userSchema.statics.emptyCart = async function (_id) {
  const user = await this.findById(_id);
  if (!user) {
    throw new Error("User not found");
  }

  user.cart = [];
  await user.save();

  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = {
  User,
};