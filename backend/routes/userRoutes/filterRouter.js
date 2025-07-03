const express = require("express");
const router = express.Router();
const {
  getCategories,
  getSizes,
  getFoodTypes,
  getDistinctValues
} = require("../../controllers/filterController");

router.get("/filters", getDistinctValues); // GET /api/filters
router.get("/categories", getCategories);
router.get("/sizes", getSizes);
router.get("/food-types", getFoodTypes);

module.exports = router;
