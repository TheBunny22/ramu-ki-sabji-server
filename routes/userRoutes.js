const express = require("express");
const {
  Login,
  signUp,
  matchOtp,
} = require("../controllers/Client/UserLoginCrontroller");
const { userAuth } = require("../middlewares/Authenticator");
const { getCartItem } = require("../controllers/Client/cartController");
const { UpdateProfile } = require("../controllers/Client/profileController");
const userRouter = express.Router();

// open routes without authentication for login and sign up
// userRouter.post("/verify-reg", matchOtp);
userRouter.post("/login", Login);
userRouter.post("/register", signUp);

// Aunthenticated Secure routes to be used after login
userRouter.get("/cart", userAuth, getCartItem);
userRouter.post("/update-profile", userAuth, UpdateProfile);
userRouter.post("/place-order", userAuth);
userRouter.post("/my-order", userAuth);
userRouter.post("/my-history", userAuth);
// TODO : reset pass , address (add , remove), profile (update) , get live order , place order

module.exports = { userRouter };
