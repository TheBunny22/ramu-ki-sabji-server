require("dotenv").config();
const generateOTP = require("../../helpers/otpGenrator");
const { User } = require("../../models/userModel");
const jwt = require("jsonwebtoken");
// const { OtpMailGenerator } = require("../../templates/OtpMail");
// const { EmailSender } = require("../../helpers/EmailSender");
const secret = process.env.SALT;

const signUp = async (req, res) => {
  const { f_name, l_name, email, password, mobile } = req.body;
  try {
    if (!f_name || !l_name || !email || !password || !mobile) {
      return res.status(401).json({ msg: "provide all field to sign up" });
    }
    // const otp = generateOTP();
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(401).json({ msg: "User Already Exists" });
    }

    const user = await User.NewUser(f_name, l_name, email, password, mobile);
    if (!user) {
      return res
        .status(500)
        .json({ msg: "Internal server errror while creating User" });
    }
    const u = {
      _id: user._id,
      username: user.username.f_name + " " + user.username.l_name,
      email: user.email,
    };
    const token = jwt.sign(u, secret, {
      expiresIn: "2d",
    });

    return res.status(200).json({ token: token, user });
    // const email_template = OtpMailGenerator(email, f_name + " " + l_name, otp);
    // const sended = await EmailSender(
    //   email,
    //   "Ramu Ki Sabji - Otp Verification",
    //   email_template
    // );
    // if (!sended) {
    //   return res.status(500).json({ msg: "error while sending Mail" });
    // }
    // return res.status(200);
  } catch (error) {
    console.log(
      `-->> ${new Date()} Error while creating new user <<-- \n ${error}`
    );
    return res
      .status(500)
      .json({ msg: "Internal Server Error While user Sign Up " });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(401).json({ msg: "provide all credentials" });
    }
    const user = await User.signIn(email, password);
    if (!user) {
      return res.status(404).json({ msg: "Invalid username / Password" });
    }
    const u = {
      _id: user._id,
      username: user.username.f_name + " " + user.username.l_name,
      email: user.email,
    };
    const token = jwt.sign(u, secret, {
      expiresIn: "2d",
    });
    return res.status(200).json({ user: user, token });
  } catch (error) {
    console.log(`-->> ${new Date()} Error while user login <<-- \n ${error}`);
    return res
      .status(500)
      .json({ msg: "Internal Server Error While user Login " });
  }
};

const matchOtp = async (req, res) => {
  try {
    const { _id, otp } = req.body;
    // Call the matchOtp static method from the User model
    const isOTPValid = await User.matchOtp(_id, otp);

    if (isOTPValid === null) {
      // OTP does not match
      return res.status(401).json({ message: "Invalid OTP" });
    } else {
      // OTP matches
      const token = jwt.sign(isOTPValid._id, secret, { expiresIn: "1h" });
      return res.status(200).json({ message: "OTP is valid", token });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { Login, signUp, matchOtp };
