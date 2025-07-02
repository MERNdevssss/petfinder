const mongoose = require('mongoose');

const PetInfoSchema = new mongoose.Schema({
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet", // Reference to the Pet model
    required: true
  },
  category: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  size: {
    type: String,
    enum: ["SMALL", "MEDIUM", "LARGE", "EXTRA LARGE"],
    default: "SMALL"
  },
  foodType: {
    type: String,
    required: true
  }
});

const PetInfo = mongoose.model("PetInfo", PetInfoSchema);
module.exports = PetInfo;