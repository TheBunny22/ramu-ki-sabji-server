const { User } = require("../../models/userModel");
const jwt = require("jsonwebtoken");

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(401).json({ msg: "provide all credentials" });
    }
    const user = await User.signIn(email, password);
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    const token = jwt.sign(
        
    );
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal Server Error While user Login " });
  }
};
