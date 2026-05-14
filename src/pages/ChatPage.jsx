import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Smile, 
  Paperclip, 
  MoreVertical, 
  Phone, 
  Video, 
  ChevronLeft, 
  Search, 
  ShieldCheck, 
  Zap, 
  Sparkles,
  User,
  Clock,
  CheckCheck,
  MessageCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';

const ChatPage = () => {
  const { recipientId } = useParams();
  const { currentUser, farmers } = useAuth();
  const { messages, sendMessage, activeConversation, setActiveConversation, initiateChat, fetchMessages, setMessages, conversations } = useChat();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Initialize Connection
  useEffect(() => {
    if (recipientId) {
      initiateChat(recipientId);
    }
  }, [recipientId]);

  // Fetch Messages when Conversation is Active
  useEffect(() => {
    if (activeConversation?._id) {
      fetchMessages(activeConversation._id);
    } else {
      setMessages([]);
    }
  }, [activeConversation]);

  // Dynamic recipient resolution
  const recipientUser = farmers.find(f => (f.id || f._id) === recipientId);
  const recipient = {
    id: recipientId,
    name: recipientUser?.name || 'User',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${recipientUser?.name || recipientId}`,
    status: 'Online',
    role: recipientUser?.role === 'farmer' ? 'Verified Farmer' : 'Member'
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (newMessage.trim() && recipientId) {
      sendMessage({
        receiverId: recipientId,
        text: newMessage
      });
      setNewMessage('');
    }
  };

  return (
    <div className="bg-background min-h-screen pt-24 pb-12 flex flex-col relative overflow-hidden font-body selection:bg-primary/5">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-full h-[600px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 opacity-40 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto w-full px-6 flex-1 flex flex-col lg:flex-row gap-8 relative z-10">
        
        {/* Conversation Sidebar - Neural List */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-80 card-premium !p-0 overflow-hidden flex flex-col h-[700px] lg:h-auto"
        >
           <div className="p-6 border-b border-black/[0.03]">
              <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Active Conversations</h3>
           </div>
           <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
              {conversations.length > 0 ? (
                conversations.map((conv) => {
                  const otherUser = conv.participants?.find(p => (p.id || p._id) !== currentUser?.id);
                  const isActive = activeConversation?._id === conv._id;
                  
                  return (
                    <div 
                      key={conv._id}
                      onClick={() => {
                        setActiveConversation(conv);
                        if (otherUser) navigate(`/chat/${otherUser.id || otherUser._id}`);
                      }}
                      className={`p-4 rounded-2xl cursor-pointer transition-all duration-500 border ${
                        isActive 
                          ? 'bg-primary border-primary shadow-xl scale-[1.02]' 
                          : 'bg-white border-black/[0.03] hover:border-primary/20 hover:shadow-md'
                      }`}
                    >
                       <div className="flex items-center gap-4">
                          <div className="relative">
                             <img 
                               src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${otherUser?.name || conv._id}`} 
                               className="w-10 h-10 rounded-xl bg-surface border border-black/5" 
                             />
                             <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                          </div>
                          <div className="flex-1 min-w-0">
                             <h4 className={`text-[11px] font-black uppercase tracking-wider truncate ${isActive ? 'text-white' : 'text-primary'}`}>
                                {otherUser?.name || 'User'}
                             </h4>
                             <p className={`text-[8px] font-bold uppercase tracking-widest mt-1 truncate ${isActive ? 'text-white/60' : 'text-text-dim/40'}`}>
                                {conv.lastMessage?.text || 'Connected'}
                             </p>
                          </div>
                       </div>
                    </div>
                  );
                })
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                   <Sparkles className="w-8 h-8 text-primary/10" />
                   <p className="text-[9px] font-black text-text-dim/30 uppercase tracking-[0.3em]">No Active Streams</p>
                </div>
              )}
           </div>
        </motion.div>

        {/* Chat Pane */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 flex flex-col card-premium !p-0 shadow-2xl overflow-hidden border-white/60 h-[700px]"
        >
          {recipientId || activeConversation ? (
            <>
              {/* Communication Header - Standard Size */}
              <div className="p-6 md:p-8 bg-white/60 backdrop-blur-2xl border-b border-black/[0.03] flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-4">
                     <div className="relative group">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-black/5 shadow-xl transition-transform group-hover:scale-105">
                           <img src={recipient.avatar} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-lg"></div>
                     </div>
                     <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                           <h3 className="text-lg font-display font-bold text-primary uppercase tracking-tight">{recipient.name}</h3>
                           <div className="px-2 py-0.5 bg-primary/5 rounded-md text-[8px] font-black text-primary uppercase tracking-widest border border-primary/10">
                              {recipient.role}
                           </div>
                        </div>
                        <p className="text-[10px] font-bold text-text-dim/60 uppercase tracking-[0.3em] flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> {recipient.status}
                        </p>
                     </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                   <button className="w-12 h-12 rounded-xl bg-surface border border-black/[0.03] flex items-center justify-center text-primary/30 hover:text-primary hover:shadow-xl transition-all"><Phone className="w-5 h-5" /></button>
                   <button className="w-12 h-12 rounded-xl bg-surface border border-black/[0.03] flex items-center justify-center text-primary/30 hover:text-primary hover:shadow-xl transition-all"><Video className="w-5 h-5" /></button>
                   <button className="w-12 h-12 rounded-xl bg-surface border border-black/[0.03] flex items-center justify-center text-primary/30 hover:text-primary hover:shadow-xl transition-all"><MoreVertical className="w-5 h-5" /></button>
                </div>
              </div>

              {/* Message Stream - Refined Density */}
              <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar bg-surface/30">
                <div className="flex justify-center mb-12">
                   <div className="px-6 py-2 bg-white/60 backdrop-blur-md rounded-full border border-white text-[9px] font-black text-text-dim/40 uppercase tracking-[0.4em] shadow-sm">
                      Chat Started — {new Date().toLocaleDateString()}
                   </div>
                </div>

                <AnimatePresence initial={false}>
                  {messages.map((msg, i) => (
                    <motion.div
                      key={msg.id || i}
                      initial={{ opacity: 0, x: (msg.senderId || msg.sender?._id || msg.sender) === currentUser?.id ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex ${(msg.senderId || msg.sender?._id || msg.sender) === currentUser?.id ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] space-y-2 ${(msg.senderId || msg.sender?._id || msg.sender) === currentUser?.id ? 'items-end' : 'items-start'}`}>
                        <div className={`px-6 py-4 rounded-[1.8rem] text-sm font-medium leading-relaxed shadow-lg ${
                          (msg.senderId || msg.sender?._id || msg.sender) === currentUser?.id 
                            ? 'bg-primary text-white rounded-tr-none' 
                            : 'bg-white text-primary rounded-tl-none border border-black/[0.03]'
                        }`}>
                          {msg.text}
                        </div>
                        <div className="flex items-center gap-3 px-2">
                           <span className="text-[9px] font-bold text-text-dim/30 uppercase tracking-widest">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                           {(msg.senderId || msg.sender?._id || msg.sender) === currentUser.id && <CheckCheck className="w-3.5 h-3.5 text-accent" />}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              {/* Input Console - Standard Sizes */}
              <div className="p-8 bg-white/60 backdrop-blur-2xl border-t border-black/[0.03]">
                <form onSubmit={handleSend} className="relative flex items-center gap-4">
                  <button type="button" className="w-12 h-12 rounded-xl bg-surface border border-black/[0.03] flex items-center justify-center text-primary/30 hover:text-primary transition-all">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <div className="flex-1 relative group">
                    <input
                      type="text"
                      className="input-premium !py-5 !pl-8 !pr-16"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button type="button" className="absolute right-6 top-1/2 -translate-y-1/2 text-primary/20 hover:text-accent transition-colors">
                      <Smile className="w-6 h-6" />
                    </button>
                  </div>
                  <button 
                    type="submit" 
                    className="btn-premium !p-5 !rounded-xl shadow-xl flex items-center justify-center"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
                <div className="mt-6 flex items-center justify-center gap-6">
                   <p className="text-[9px] font-black text-text-dim/20 uppercase tracking-[0.4em] flex items-center gap-3">
                      <ShieldCheck className="w-3.5 h-3.5" /> Secure End-to-End Encryption
                   </p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 space-y-8">
               <div className="w-32 h-32 rounded-[3rem] bg-surface border border-black/5 flex items-center justify-center text-primary/10 shadow-inner">
                  <MessageCircle className="w-12 h-12" />
               </div>
               <div className="space-y-4">
                  <h3 className="text-3xl font-display font-bold text-primary uppercase tracking-tight italic">Select a <span className="font-normal not-italic text-accent">Conversation</span></h3>
                  <p className="text-[10px] font-black text-text-dim/40 uppercase tracking-[0.4em] max-w-sm leading-relaxed">
                    Choose a conversation from the list to start messaging within the KrishiMitra community.
                  </p>
               </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ChatPage;
