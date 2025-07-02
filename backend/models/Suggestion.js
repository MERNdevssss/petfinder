const  mongoose = require ('mongoose');

const suggestionSchema = new mongoose.Schema({
  personality: { type: String, required: true },
  homeSize: { type: String, required: true },
  diet: { type: String, required: true },
  petTypes: [String],
  suggestionResult: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Suggestion = mongoose.model('Suggestion', suggestionSchema);
module.exports = Suggestion;