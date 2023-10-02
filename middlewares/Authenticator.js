const { Admin } = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");
require("dotenv").config();

const secret = process.env.SALT;

const adminAuth = async (req, res, next) => {
  // verify user is authenticated
  try {
    // Get the token from the request headers
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authorization.split(" ")[1];

    // Verify and decode the token
    const { _id } = jwt.verify(token, secret);

    // Check if the user exists in the database
    const user = await Admin.findOne({ _id });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    // Attach the user object to the request for further use
    req.user = user;
    // Move to the next middleware or route handler
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

const userAuth = async (req, res, next) => {
  // Verify user authentication
  try {
    // Get the token from the request headers
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authorization.split(" ")[1];

    // Verify and decode the token
    const decodedToken = jwt.verify(token, secret);
    // console.log(decodedToken);
    // Check if the user exists in the database using the decoded token's _id
    const user = await User.findOne({ _id: decodedToken._id });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    // Attach the user object to the request for further use
    req.user = user;
    // req.user = {
    //   _id: decodedToken._id,
    // };

    // Move to the next middleware or route handler
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
