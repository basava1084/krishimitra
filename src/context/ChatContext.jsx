import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';
import axios from 'axios';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export const ChatProvider = ({ children }) => {
  const { currentUser, isAuthenticated } = useAuth();
  const [socket, setSocket] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState({}); // userId -> boolean

  // Initialize Socket
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      const newSocket = io(SOCKET_URL, {
        withCredentials: true,
        transports: ['websocket']
      });

      newSocket.on('connect', () => {
        console.log('⚡ Socket connected to Bio-Nexus');
        newSocket.emit('join_chat', currentUser.id);
      });

      newSocket.on('typing', ({ senderId }) => {
        setTypingUsers(prev => ({ ...prev, [senderId]: true }));
      });

      newSocket.on('stop_typing', ({ senderId }) => {
        setTypingUsers(prev => ({ ...prev, [senderId]: false }));
      });

      newSocket.on('user_online', (userId) => {
        setOnlineUsers(prev => new Set([...prev, userId]));
      });

      newSocket.on('user_offline', (userId) => {
        setOnlineUsers(prev => {
          const next = new Set(prev);
          next.delete(userId);
          return next;
        });
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
        setSocket(null);
      };
    }
  }, [isAuthenticated, currentUser]);

  // Handle incoming messages and conversation list updates
  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (message) => {
      // Update the active message stream if it matches the current conversation
      if (activeConversation && (message.conversationId === activeConversation._id)) {
        setMessages(prev => {
          if (prev.some(m => (m.id || m._id) === (message.id || message._id))) return prev;
          return [...prev, message];
        });
      }
      // Always update the conversation list to show the latest message/badges
      updateConversationList(message);
    };

    socket.on('receive_message', handleReceiveMessage);
    
    return () => {
      socket.off('receive_message', handleReceiveMessage);
    };
  }, [socket, activeConversation]);

  // Initial Data Synchronization
  useEffect(() => {
    if (isAuthenticated) {
      fetchConversations();
    }
  }, [isAuthenticated]);

  const updateConversationList = (message) => {
    setConversations(prev => {
      const index = prev.findIndex(c => c._id === message.conversationId);
      if (index !== -1) {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          lastMessage: message,
          lastMessageTime: message.createdAt
        };
        return updated.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));
      }
      return prev;
    });
  };

  const fetchConversations = async () => {
    try {
      const res = await axios.get(`${SOCKET_URL}/api/v1/chat/conversations`, { withCredentials: true });
      if (res.data.success) {
        setConversations(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const fetchMessages = async (conversationId) => {
    try {
      const res = await axios.get(`${SOCKET_URL}/api/v1/chat/messages/${conversationId}`, { withCredentials: true });
      if (res.data.success) {
        setMessages(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (data) => {
    const { receiverId, text, messageType, mediaUrl } = data;
    if (!socket || !activeConversation) return;

    try {
      const res = await axios.post(`${SOCKET_URL}/api/v1/chat/message`, {
        conversationId: activeConversation._id,
        receiverId,
        text,
        messageType,
        mediaUrl
      }, { withCredentials: true });

      if (res.data.success) {
        const newMessage = res.data.data;
        setMessages(prev => [...prev, newMessage]);
        socket.emit('send_message', { receiverId, message: newMessage });
        updateConversationList(newMessage);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const startTyping = (receiverId) => {
    if (socket) socket.emit('typing', { receiverId, senderId: currentUser.id });
  };

  const stopTyping = (receiverId) => {
    if (socket) socket.emit('stop_typing', { receiverId, senderId: currentUser.id });
  };

  const initiateChat = async (receiverId) => {
    try {
      const res = await axios.post(`${SOCKET_URL}/api/v1/chat/conversation`, { receiverId }, { withCredentials: true });
      if (res.data.success) {
        setActiveConversation(res.data.data);
        return res.data.data;
      }
    } catch (error) {
      console.error('Error initiating chat:', error);
    }
  };

  return (
    <ChatContext.Provider value={{
      socket,
      conversations,
      activeConversation,
      setActiveConversation,
      messages,
      setMessages,
      onlineUsers,
      typingUsers,
      fetchConversations,
      fetchMessages,
      sendMessage,
      startTyping,
      stopTyping,
      initiateChat
    }}>
      {children}
    </ChatContext.Provider>
  );
};
