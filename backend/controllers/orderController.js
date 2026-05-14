const Order = require('../models/Order');

// @desc    Place a new order
// @route   POST /api/v1/orders
// @access  Private (customer)
exports.placeOrder = async (req, res) => {
  try {
    const {
      items, shippingAddress, paymentMethod,
      subtotal, deliveryCharge, discount, totalAmount, customerName, customerEmail
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items in order' });
    }

    // Estimate delivery: 3-5 days from now
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + Math.floor(Math.random() * 3) + 3);

    const order = await Order.create({
      customer: req.user?.id || req.body.customerId,
      customerName,
      customerEmail,
      items,
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      orderStatus: 'confirmed',
      subtotal,
      deliveryCharge: deliveryCharge || 0,
      discount: discount || 0,
      totalAmount,
      estimatedDelivery
    });

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get orders for logged-in customer
// @route   GET /api/v1/orders/my
// @access  Private (customer)
exports.getMyOrders = async (req, res) => {
  try {
    const customerId = req.user?.id || req.query.customerId;
    const orders = await Order.find({ customer: customerId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single order by ID
// @route   GET /api/v1/orders/:id
// @access  Private
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Cancel an order
// @route   PUT /api/v1/orders/:id/cancel
// @access  Private
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    if (['delivered', 'cancelled'].includes(order.orderStatus)) {
      return res.status(400).json({ success: false, message: 'Cannot cancel this order' });
    }

    order.orderStatus = 'cancelled';
    order.paymentStatus = order.paymentMethod !== 'cod' ? 'refunded' : 'pending';
    await order.save();

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get orders for a farmer (orders containing their products)
// @route   GET /api/v1/orders/farmer/:farmerId
// @access  Private (farmer)
exports.getFarmerOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      'items.farmerId': req.params.farmerId
    }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
