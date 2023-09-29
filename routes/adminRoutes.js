const express = require("express");
const { LoginAdmin } = require("../controllers/Admin/AdminLoginController");
const multer = require("multer");
const {
  uploadItemImage,
  getMenuItemImageById,
} = require("../controllers/Admin/MenuController");
const adminRouter = express.Router();
const upload = multer({ dest: "uploads/" });

// login api for Amdin
adminRouter.post("/login", LoginAdmin);

// Route for uploading an image for a MenuItem
adminRouter.post(
  "/menu/:id/upload-image",
  upload.single("image"),
  uploadItemImage
);

// Route for fetching the image of a MenuItem by MenuItem ID
adminRouter.get("/menu/:id/image", getMenuItemImageById);

module.exports = { adminRouter };
