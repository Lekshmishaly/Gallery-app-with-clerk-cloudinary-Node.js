const cloudinary = require("cloudinary").v2;
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

// Configure Cloudinary
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// Reusable upload function
const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "gallery-app",
      resource_type: "image",
    });
    return {
      url: result.secure_url,
      publicId: result.public_id,
      size: result.bytes,
      mimeType: result.format,
    };
  } catch (error) {
    throw new Error("Cloudinary upload failed: " + error.message);
  }
};

// Delete image from Cloudinary
const deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new Error("Cloudinary deletion failed: " + error.message);
  }
};

module.exports = { uploadToCloudinary, deleteFromCloudinary };
