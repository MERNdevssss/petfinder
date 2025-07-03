const express = require("express");
const router = express.Router();
const { upload } = require("../../services/uploadService");
const { uploadImagesToExistingPet, removeImageFromPet } = require("../../controllers/uploadController");

// Add images to existing pet
router.post("/upload", upload.array("images", 5), uploadImagesToExistingPet);

// Remove image from pet
router.delete("/:petId/image", removeImageFromPet);


module.exports = router;
