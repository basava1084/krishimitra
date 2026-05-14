const User = require('../models/User');

const socketHandler = (io) => {
  const users = new Map(); // userId -> socketId

  io.on('connection', (socket) => {
    console.log('⚡ New socket connection:', socket.id);

    socket.on('join_chat', async (userId) => {
      if (userId) {
        socket.join(userId);
        users.set(userId, socket.id);
        
        // Update user status
        await User.findByIdAndUpdate(userId, { isOnline: true });
        io.emit('user_online', userId);
        
        console.log(`👤 User ${userId} joined their personal room`);
      }
    });

    socket.on('send_message', (data) => {
      const { receiverId, message } = data;
      // Emit to receiver's personal room
      io.to(receiverId).emit('receive_message', message);
      
      // Send notification if not in room? (handled by frontend or separate logic)
    });

    socket.on('typing', (data) => {
      const { receiverId, senderId } = data;
      io.to(receiverId).emit('typing', { senderId });
    });

    socket.on('stop_typing', (data) => {
      const { receiverId, senderId } = data;
      io.to(receiverId).emit('stop_typing', { senderId });
    });

    socket.on('message_seen', (data) => {
      const { senderId, conversationId } = data;
      io.to(senderId).emit('message_seen', { conversationId });
    });

    socket.on('disconnect', async () => {
      let disconnectedUserId;
      for (const [userId, socketId] of users.entries()) {
        if (socketId === socket.id) {
          disconnectedUserId = userId;
          users.delete(userId);
          break;
        }
      }

      if (disconnectedUserId) {
        await User.findByIdAndUpdate(disconnectedUserId, { 
          isOnline: false, 
          lastSeen: new Date() 
        });
        io.emit('user_offline', disconnectedUserId);
        console.log(`🔌 User ${disconnectedUserId} disconnected`);
      }
    });
  });
};

module.exports = { socketHandler };
