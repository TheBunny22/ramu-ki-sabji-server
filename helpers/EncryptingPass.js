const crypto = require("crypto");
require("dotenv").config();
const salt = process.env.SALT;

// Function to hash a password
const hashPassword = (password) => {
  // const salt =crypto.randomBytes(16).toString('hex'); // Generate a random salt
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash;
};

// Function to compare a password with a hashed password
const comparePasswords = (password, hashedPassword) => {
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === hashedPassword;
};

module.exports = { hashPassword, comparePasswords };
