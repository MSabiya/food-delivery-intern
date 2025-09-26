const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  category: { type: String, default: '' },
  price: { type: Number, required: true, min: 0 },
  offerPrice: { type: Number, default: 0 },
  images: [{ type: String }], // store file paths
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', itemSchema);
