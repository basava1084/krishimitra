const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

// @desc    Get or Create Conversation
// @route   POST /api/v1/chat/conversation
exports.getOrCreateConversation = async (req, res) => {
  const { receiverId } = req.body;
  const senderId = req.user.id;

  try {
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    }).populate('participants', 'name profileImage isOnline lastSeen');

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId]
      });
      conversation = await conversation.populate('participants', 'name profileImage isOnline lastSeen');
    }

    res.status(200).json({ success: true, data: conversation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Send Message
// @route   POST /api/v1/chat/message
exports.sendMessage = async (req, res) => {
  const { conversationId, receiverId, text, messageType, mediaUrl } = req.body;
  const senderId = req.user.id;

  try {
    const message = await Message.create({
      conversationId,
      sender: senderId,
      receiver: receiverId,
      text,
      messageType: messageType || 'text',
      image: messageType === 'image' ? mediaUrl : undefined,
      voice: messageType === 'voice' ? mediaUrl : undefined,
      file: messageType === 'file' ? mediaUrl : undefined
    });

    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: message._id,
      lastMessageTime: Date.now()
    });

    res.status(201).json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get Conversation Messages
// @route   GET /api/v1/chat/messages/:conversationId
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ conversationId: req.params.conversationId })
      .sort('createdAt');
    
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get All Conversations for a user
// @route   GET /api/v1/chat/conversations
exports.getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: { $in: [req.user.id] }
    })
    .populate('participants', 'name profileImage isOnline lastSeen')
    .populate('lastMessage')
    .sort('-lastMessageTime');

    res.status(200).json({ success: true, data: conversations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
