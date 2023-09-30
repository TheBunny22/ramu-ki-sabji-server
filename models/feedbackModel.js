const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  username: String,
  rating: Number,
  comment: String,
});

const FeedBack = mongoose.model("Feedback", feedbackSchema);

modules.exports = { FeedBack };