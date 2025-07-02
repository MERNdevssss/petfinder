const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  species: {
    type: String,
    required: true,
    enum: ["Dog", "Cat", "Bird", "Rabbit", "Fish", "Hamster", "Other"],
  },
  breed: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Unknown"],
    required: true,
  },
  color: String,
  size: {
    type: String,
    enum: ["Small", "Medium", "Large", "Extra Large"],
  },
  vaccinated: {
    type: Boolean,
    default: false,
  },
  healthStatus: {
    type: String,
    default: "Healthy",
  },
  description: {
    type: String,
  },
  imgUrls: {
    type: [String],
    default: [],
  },
  availabilityStatus: {
    type: String,
    enum: ["Available", "Adopted", "Pending"],
    default: "Available",
  },
  listedBy: {
    type: mongoose.Schema.Types.ObjectId,
    // ref:User
  },

  dateListed: {
    type: Date,
    default: Date.now,
  },
  tags: {
    type: [String],
    default: [], // friendly , good with kids , trained
  },
  seller:{
        type:String,    //johndoe@example.com
        required:true
    }
});

module.exports = mongoose.model("Pet", petSchema);
