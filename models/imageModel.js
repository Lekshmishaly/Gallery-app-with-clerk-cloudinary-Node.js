const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  albumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Album",
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  mimeType: {
    type: String,
    required: true,
  },
  cloudUrl: {
    type: String,
    required: true,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.Schema("Image", imageSchema);
