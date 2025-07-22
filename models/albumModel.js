const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  imageCount: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["active", "inactive", "deleted"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Album", albumSchema);
