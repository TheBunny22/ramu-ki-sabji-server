const express = require("express");
const adminRouter = express.Router();

adminRouter.get("/", (req, res) => {
  res.send("Welcome to the admin dashboard!");
});

module.exports = { adminRouter };
