// server/config/cloudinary.js
const multer =  require('multer');
const { v2: cloudinary } =  require("cloudinary");
const dotenv =  require("dotenv");

dotenv.config();

// cloudinary configuration 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//  multer memory storage 
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


// upload images to cloudinary
const imageUpload = (file)=>{
    return new Promise((resolve, reject)=>{
        cloudinary.uploader.upload_stream(
        {
            resource_type: 'image',
            folder: 'petFinder/product_images',
            allowed_formats: ["jpg", "jpeg", "png", "webp"]
        },
        (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
        }
        ).end(file.buffer);
    });
};

// to upload multiple images
const uploadMultipleFiles = async(files)=>{
    const promise4Upload = files.map(file=>imageUpload(file));
    return await Promise.all(promise4Upload);
};


module.exports =  {cloudinary, uploadMultipleFiles, upload, imageUpload};
