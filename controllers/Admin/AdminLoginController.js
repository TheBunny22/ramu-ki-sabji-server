const { comparePasswords } = require("../../helpers/EncryptingPass");
const { Admin } = require("../../models/adminModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.SALT;

const LoginAdmin = async (req, res) => {
  try {
    const { pass, email } = req.body;
    if (!pass || !email) {
      return res
        .status(400)
        .json({ msg: "All Credentials are required to verify Admin" });
    }
    console.log(`-->> ${new Date()} Admin Login Attempt by ${email} <<--`);
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      return res.status(404).json({ msg: `${email} User not found` });
    }
    const verify = comparePasswords(pass, admin.password);
    if (!verify) {
      console.log(`-->> ${new Date()} Admin Login Failed by ${email} <<--`);
      return res.status(400).json({ msg: `email or password is incorrect` });
    }

    // Convert the admin document to a plain JavaScript object
    const adminObject = admin.toObject();

    const token = jwt.sign(adminObject._id, secret, { expiresIn: "1h" });
    console.log(`-->> ${new Date()} Admin Login Success by ${email} <<--`);
    return res.status(200).json({ ...adminObject, token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ err: `Internal server error while Admin Login` });
  }
};

module.exports = {
  LoginAdmin,
};
