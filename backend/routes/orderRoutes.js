const express = require('express');
const router = express.Router();
const {
  placeOrder,
  getMyOrders,
  getOrder,
  cancelOrder,
  getFarmerOrders
} = require('../controllers/orderController');

// Public/semi-protected (pass customerId in body for now)
router.post('/', placeOrder);
router.get('/my', getMyOrders);
router.get('/farmer/:farmerId', getFarmerOrders);
router.get('/:id', getOrder);
router.put('/:id/cancel', cancelOrder);

module.exports = router;
