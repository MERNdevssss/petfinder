const express = require("express");
const {
  handleUserByAdmin,
  handlePetByAdmin,
  getAllUsers,
  getAllPets,
  deleteUserByAdmin
} = require("../controllers/adminController");

const router = express.Router();

// POST routes for admin updates
router.post("/user/update", handleUserByAdmin);
router.post("/pet/update", handlePetByAdmin);

// GET routes to fetch data
router.get("/users", getAllUsers);
router.get("/pets", getAllPets);

router.delete("/user/:id", deleteUserByAdmin);

module.exports = router;
