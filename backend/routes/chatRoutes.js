const express = require('express');
const router = express.Router();
const { 
  getOrCreateConversation, 
  sendMessage, 
  getMessages, 
  getConversations 
} = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/conversation', getOrCreateConversation);
router.get('/conversations', getConversations);
router.post('/message', sendMessage);
router.get('/messages/:conversationId', getMessages);

module.exports = router;
