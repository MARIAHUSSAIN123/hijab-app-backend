
const mongoose = require('mongoose');

const hijabStyleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageURL: { type: String, required: true },
  description: { type: String },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  avgRating: { type: Number, default: 0 }
});

module.exports = mongoose.model('HijabStyle', hijabStyleSchema);
