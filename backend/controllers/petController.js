const Pet = require("../models/pet_model");
const { uploadMultipleImages } = require("../services/uploadService");
const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    if (!pets || pets.length === 0) {
      return res.status(404).send({ message: "No pets found" });
    }
    return res.status(200).json(pets);
  } catch (error) {
    console.error("Error fetching pets:", error);
    return res.status(500).send({ error: "Error fetching pets", details: error.message });
  }
};
const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).send({ message: "Pet not found" });
    }
    res.status(200).send(pet);
  } catch (error) {
    console.error("Error fetching pet:", error);
    res.status(500).send({ error: "Error fetching pet", details: error.message });
  }
};
const searchPets = async (req, res) => {
  try {
    const { searchquery } = req.query;
    
    if (!searchquery) {
      return res.status(400).send({ error: "Search query is required" });
    }
    
    // Search across multiple fields (species, breed, name) with OR condition
    const query = {
      $or: [
        { species: new RegExp(searchquery, 'i') },
        { breed: new RegExp(searchquery, 'i') },
        { name: new RegExp(searchquery, 'i') }
      ]
    };
    
    const pets = await Pet.find(query);
    res.status(200).send(pets);
  } catch (error) {
    console.error("Error searching pets:", error);
    res.status(500).send({ error: "Error searching pets", details: error.message });
  }
};
const createMultiplePets = async (req, res) => {
  try {
    if (!req.body || !Array.isArray(req.body)) {
      return res.status(400).send({ 
        error: "Invalid input", 
        details: "Request body must be an array of pet objects" 
      });
    }
    const pets = req.body;
    const results = {
      success: [],
      failed: []
    };
    for (const petData of pets) {
      try {
        const newPet = new Pet(petData);
        await newPet.save();
        results.success.push({
          id: newPet._id,
          name: newPet.name,
          species: newPet.species
        });
      } catch (petError) {
        results.failed.push({
          pet: petData,
          error: petError.message
        });
      }
    }
    res.status(201).json({
      message: `Successfully created ${results.success.length} pets. Failed to create ${results.failed.length} pets.`,
      results
    });
  } catch (error) {
    console.error("Error creating multiple pets:", error);
    res.status(500).send({ 
      error: "Error creating multiple pets", 
      details: error.message 
    });
  }
};
const createPet = async (req, res) => {
  try {
    const petData = { ...req.body };
    petData.imgUrls = [];
    if (req.files && req.files.length > 0) {
      try {
        const imageUrls = await uploadMultipleImages(req.files);
        petData.imgUrls = imageUrls;
      } catch (uploadError) {
        console.error("Image upload error:", uploadError);
        console.log("Continuing pet creation without images due to upload error");
      }
    }
    const newPet = new Pet(petData);
    await newPet.save();
    res.status(201).send({
      message: "Pet created successfully",
      pet: newPet,
      imagesUploaded: petData.imgUrls.length
    });
  } catch (error) {
    console.error("Error creating pet:", error);
    res.status(400).send({ error: "Error creating pet", details: error.message });
  }
};
const updatePet = async (req, res) => {
  try {
    let updateData = { ...req.body };
    if (typeof updateData.tags === "string") {
      try {
        updateData.tags = JSON.parse(updateData.tags);
      } catch {
        updateData.tags = [];
      }
    }
    if (typeof updateData.vaccinated === "string") {
      updateData.vaccinated = updateData.vaccinated === "true";
    }
    if (typeof updateData.age === "string") {
      updateData.age = parseFloat(updateData.age);
    }
    let existingImgUrls = [];
    if (updateData.existingImgUrls) {
      try {
        existingImgUrls = JSON.parse(updateData.existingImgUrls);
      } catch {
        existingImgUrls = [];
      }
    }
    delete updateData.existingImgUrls;
    let newImgUrls = [];
    if (req.files && req.files.length > 0) {
      try {
        newImgUrls = await uploadMultipleImages(req.files);
      } catch (uploadError) {
        console.error("Image upload error:", uploadError);
      }
    }
    updateData.imgUrls = [...existingImgUrls, ...newImgUrls];
    const updatedPet = await Pet.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!updatedPet) {
      return res.status(404).send({ message: "Pet not found" });
    }
    res.status(200).send({
      message: "Pet updated successfully",
      pet: updatedPet
    });
  } catch (error) {
    console.error("Error updating pet:", error);
    res.status(400).send({ error: "Error updating pet", details: error.message });
  }
};
const deletePet = async (req, res) => {
  try {
    const deletedPet = await Pet.findByIdAndDelete(req.params.id);
    if (!deletedPet) {
      return res.status(404).send({ message: "Pet not found" });
    }
    res.status(200).send({ 
      message: "Pet deleted successfully",
      deletedPet: deletedPet
    });
  } catch (error) {
    console.error("Error deleting pet:", error);
    res.status(500).send({ error: "Error deleting pet", details: error.message });
  }
};
module.exports = {
  getAllPets,
  getPetById,
  searchPets,
  createMultiplePets,
  createPet,
  updatePet,
  deletePet
};
