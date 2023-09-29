const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    required: [true, "Password is required."],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    required: [true, "Email is required."],
    validate: {
      validator: (value) => {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        return emailRegex.test(value);
      },
      message: "Invalid email address.",
    },
  },
});

// Define models based on the schemas

const Admin = mongoose.model("Admin", adminSchema);

module.exports = { Admin };
