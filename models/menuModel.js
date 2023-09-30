const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  name: String,
  format: String,
  image: {
    data: Buffer,
    contentType: String,
  },
});

const menuItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  image: imageSchema,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  description: String,
  stock: { type: Number, default: 0 },
});

const Menu = mongoose.model("MenuItem", menuItemSchema);

module.exports = { Menu };
