const multer = require("multer");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

// Function to upload images to Cloudinary
const uploadToCloudinary = (file) => {
    
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "petfinder/pets",
        // transformation: [
        //   { width: 800, height: 600, crop: "fill" },
        //   { quality: "auto" }
        // ]
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    ).end(file.buffer);
  });
};

// Function to upload multiple images
const uploadMultipleImages = async (files) => {
  const uploadPromises = files.map(file => uploadToCloudinary(file));
  return await Promise.all(uploadPromises);
};

module.exports = {
  upload,
  uploadToCloudinary,
  uploadMultipleImages,
  cloudinary
};
