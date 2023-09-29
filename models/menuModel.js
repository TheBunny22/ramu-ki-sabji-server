const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  feedbacks: [
    {
      userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      user: String,
      rating: Number,
      comment: String,
    },
  ],
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  description: String,
  stock: { type: Number, default: 0 },
});

module.exports = mongoose.model("MenuItem", menuItemSchema);
