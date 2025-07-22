const multer = require("multer");
const sendResponse = require("../utils/response");
const Album = require("../models/albumModel");

// Multer storage (in-memory for Cloudinary)
const storage = multer.memoryStorage();

// File filter for image types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG, and WebP are allowed."));
  }
};

// Multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

////////////////////////////////////////////// Middleware to check album image count /////////////////////////////////////////////////

const checkImageCount = async (req, res, next) => {
  try {
    const album = await Album.findOne({
      _id: req.params.albumId,
      userId: req.user.id,
      status: "active",
    });
    if (!album) {
      return sendResponse(
        res,
        404,
        null,
        "Album not found or not owned by user"
      );
    }
    if (album.imageCount >= 50) {
      return sendResponse(
        res,
        400,
        null,
        "Album limit reached. Please create a new album."
      );
    }
    req.album = album;
    next();
  } catch (error) {
    sendResponse(res, 500, null, error.message);
  }
};

module.exports = { upload, checkImageCount };
