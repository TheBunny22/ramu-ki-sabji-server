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
  address: {
    no: { type: String, default: "", trim: true, maxlength: 10 },
    street: { type: String, default: "" },
    landmark: { type: String, default: "" },
    city: { type: String, default: "Himmatnagar" },
    zipcode: { type: Number, default: 383001 },
    state: { type: String, default: "Gujarat , In" },
  },
  cart: {
    type: Array,
    default: [],
  },
});

// user sign-up / register static function
userSchema.statics.signUp = async function (
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

const User = mongoose.model("User", userSchema);
module.exports = {
  User,
};
