// User document structure
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
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
  cart: [
    {
      itemName: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
});
