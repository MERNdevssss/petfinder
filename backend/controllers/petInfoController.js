const PetInfoModel = require('../models/PetInfoModel');

async function getPetInfo(req, res) {
  try {
    const { category } = req.params;
    const { size, foodType, search } = req.query;

    // Base filter
    const filter = { category };

    // Optional filters
    if (size) filter.size = size.toUpperCase();  // Ensure consistent casing
    if (foodType) filter.foodType = foodType;

    // Fetch from DB with filters
    let pets = await PetInfoModel.find(filter).populate({
      path: 'pet',
      select: 'name seller'
    });

    // Apply search (case-insensitive) if provided
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      pets = pets.filter(p => searchRegex.test(p.name));
    }

    return res.status(200).json(pets);
  } catch (error) {
    console.error("Error fetching pet info:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getPetInfo
};