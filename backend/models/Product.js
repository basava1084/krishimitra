const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  unit: {
    type: String,
    required: [true, 'Please add a unit (kg, L, box, etc.)']
  },
  image: {
    type: String,
    default: '/images/default-product.png'
  },
  category: {
    type: String,
    enum: ['Vegetables', 'Fruits', 'Dairy', 'Grains', 'Others'],
    required: [true, 'Please add a category']
  },
  sellerName: {
    type: String,
    required: true
  },
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdByRole: {
    type: String,
    default: 'farmer'
  },
  location: {
    type: String
  },
  organic: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5
  },
  harvestDate: {
    type: Date,
    default: Date.now
  },
  stock: {
    type: Number,
    default: 0
  },
  preorder: {
    type: Boolean,
    default: false
  },
  countdown: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', ProductSchema);
