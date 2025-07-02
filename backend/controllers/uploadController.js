const Pet = require("../models/pet_model");
const { uploadMultipleImages } = require("../services/uploadService");

// Add images to existing pet
const uploadImagesToExistingPet = async (req, res) => {
  try {
    const { petId } = req.body;
    
    if (!petId) {
      return res.status(400).send({ error: "Pet ID is required" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).send({ error: "No images uploaded" });
    }

    // Check if pet exists
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).send({ message: "Pet not found" });
    }

    // Upload images to Cloudinary
    const imageUrls = await uploadMultipleImages(req.files);

    // Update pet with new image URLs
    const updatedPet = await Pet.findByIdAndUpdate(
      petId,
      { $push: { imgUrls: { $each: imageUrls } } },
      { new: true, runValidators: true }
    );

    res.status(200).send({
      message: "Images uploaded successfully",
      imageUrls: imageUrls,
      pet: updatedPet
    });

  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).send({ 
      error: "Error uploading images", 
      details: error.message 
    });
  }
};

// Remove image from pet
const removeImageFromPet = async (req, res) => {
  try {
    const { petId } = req.params;
    const { imageUrl } = req.body;
    
    if (!imageUrl) {
      return res.status(400).send({ error: "Image URL is required" });
    }

    // Check if pet exists
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).send({ message: "Pet not found" });
    }

    // Remove image URL from pet
    const updatedPet = await Pet.findByIdAndUpdate(
      petId,
      { $pull: { imgUrls: imageUrl } },
      { new: true, runValidators: true }
    );

    res.status(200).send({
      message: "Image removed successfully",
      pet: updatedPet
    });

  } catch (error) {
    console.error("Error removing image:", error);
    res.status(500).send({ 
      error: "Error removing image", 
      details: error.message 
    });
  }
};

module.exports = {
  uploadImagesToExistingPet,
  removeImageFromPet
};
