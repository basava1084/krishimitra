const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  messageType: {
    type: String,
    enum: ['text', 'image', 'voice', 'file'],
    default: 'text'
  },
  text: {
    type: String
  },
  image: {
    type: String
  },
  voice: {
    type: String
  },
  file: {
    type: String
  },
  seen: {
    type: Boolean,
    default: false
  },
  delivered: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Message', MessageSchema);
