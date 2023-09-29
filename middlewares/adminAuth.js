const { Admin } = require("../models/adminModel");
const jwt = require("jsonwebtoken");
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

module.exports = {
  adminAuth,
};
