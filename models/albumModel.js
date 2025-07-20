const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  userId: {
    // Clerk userId
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
  deletedAt: {
    // For soft delete
    type: Date,
    default: null,
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

module.exports = mongoose.Schema("Album", albumSchema);
