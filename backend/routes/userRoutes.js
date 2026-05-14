const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

router.get('/farmers', async (req, res) => {
  try {
    const farmers = await User.find({ role: 'farmer' })
      .select('name profileImage role isOnline lastSeen farmDetails location rating experience');
    res.status(200).json({ success: true, data: farmers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/search', protect, async (req, res) => {
  const { query } = req.query;
  try {
    const users = await User.find({
      $and: [
        { _id: { $ne: req.user.id } },
        { 
          $or: [
            { name: { $regex: query, $options: 'i' } },
            { email: { $regex: query, $options: 'i' } }
          ]
        }
      ]
    }).select('name profileImage role isOnline lastSeen');
    
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
