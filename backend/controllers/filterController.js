const PetInfoModel = require("../models/PetInfoModel");

const getCategories = async (req, res) => {
    try {
        const categories = await PetInfoModel.distinct("category");
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch categories" });
    }
};

const getSizes = async (req, res) => {
    try {
        const sizes = await PetInfoModel.distinct("size");
        res.json(sizes);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch sizes" });
    }
};

const getFoodTypes = async (req, res) => {
    try {
        const foodTypes = await PetInfoModel.distinct("foodType");
        res.json(foodTypes);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch food types" });
    }
};

const getDistinctValues = async (req, res) => {
  try {
    const categories = await PetInfoModel.distinct("category");
    const sizes = await PetInfoModel.distinct("size");
    const foodTypes = await PetInfoModel.distinct("foodType");

    res.json({ categories, sizes, foodTypes });
  } catch (error) {
    console.error("Error fetching filter values:", error);
    res.status(500).json({ error: "Failed to fetch filters" });
  }
};


module.exports = {
    getDistinctValues,
    getCategories,
    getSizes,
    getFoodTypes
};
