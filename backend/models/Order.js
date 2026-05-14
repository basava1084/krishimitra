const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  customerName: String,
  customerEmail: String,
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      image: String,
      price: Number,
      quantity: Number,
      unit: String,
      sellerName: String,
      farmerId: mongoose.Schema.Types.ObjectId
    }
  ],
  shippingAddress: {
    name: String,
    phone: String,
    address: String,
    locality: String,
    city: String,
    state: String,
    pincode: String,
    landmark: String
  },
  paymentMethod: {
    type: String,
    enum: ['upi', 'card', 'wallet', 'cod'],
    default: 'cod'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  orderStatus: {
    type: String,
    enum: ['placed', 'confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'placed'
  },
  subtotal: Number,
  deliveryCharge: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  totalAmount: Number,
  estimatedDelivery: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Auto-generate orderId
OrderSchema.pre('save', function (next) {
  if (!this.orderId) {
    this.orderId = 'KM-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  }
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Order', OrderSchema);
