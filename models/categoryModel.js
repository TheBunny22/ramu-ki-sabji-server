const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
  description: String,
});

module.exports = mongoose.model('Category', categorySchema);
