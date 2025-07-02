const express = require("express");
const router = express.Router();
const { upload } = require("../services/uploadService");
const {
  getAllPets,
  getPetById,
  searchPets,
  createPet,
  createMultiplePets,
  updatePet,
  deletePet
} = require("../controllers/petController");

router.get("/", getAllPets);

router.get("/search", searchPets);

router.get("/:id", getPetById);

router.post("/", upload.array("images", 5), createPet);

// Route to batch create multiple pets
router.post("/batch", createMultiplePets);

router.put("/:id", upload.array("images", 5), updatePet);

router.delete("/:id", deletePet);


module.exports = router;

