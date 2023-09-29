const MenuItem = require("../../models/menuModel"); // Import your Mongoose model for MenuItem

// Controller function for uploading an image for a MenuItem
const uploadItemImage = async (req, res) => {
  try {
    const { originalname, mimetype, buffer } = req.file;
    const menuItemId = req.params.id; // Assuming you pass the MenuItem ID in the URL parameters

    // Find the MenuItem by ID
    const menuItem = await MenuItem.findById(menuItemId);

    if (!menuItem) {
      return res.status(404).json({ error: "MenuItem not found" });
    }

    // Create an Image document
    const image = {
      name: originalname,
      format: mimetype,
      data: buffer,
      contentType: mimetype,
    };

    // Add the image to the MenuItem
    menuItem.image = image;
    await menuItem.save();

    res
      .status(201)
      .json({ message: "Image uploaded successfully for MenuItem" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error uploading image" });
  }
};

// Controller function for fetching the image of a MenuItem by MenuItem ID
const getMenuItemImageById = async (req, res) => {
  try {
    const menuItemId = req.params.id; // Assuming you pass the MenuItem ID in the URL parameters

    // Find the MenuItem by ID
    const menuItem = await MenuItem.findById(menuItemId);

    if (!menuItem || !menuItem.image) {
      return res.status(404).json({ error: "Image not found for MenuItem" });
    }

    res.setHeader("Content-Type", menuItem.image.contentType);
    res.send(menuItem.image.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching image" });
  }
};

module.exports = {
  uploadItemImage,
  getMenuItemImageById,
};
