import React, { useState, useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { Volume2, VolumeX, Send, User, Clock } from 'lucide-react';
import './AdminChat.css';
import api from '@/lib/api';

interface Message {
  _id: string;
  sender: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  message: string;
  createdAt: string;
}

interface Conversation {
  _id: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  lastMessage?: Message;
  unreadCount: number;
}

interface AdminChatProps {
  token: string;
  currentUser: {
    id: string;
    name: string;
    email: string;
  };
}

const AdminChat: React.FC<AdminChatProps> = ({ token, currentUser }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const [typingUsers, setTypingUsers] = useState<{[key: string]: boolean}>({});
  const [isMuted, setIsMuted] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Derive server URL from window origin to avoid hardcoding; Nginx proxies /socket.io
  const SERVER_URL = (import.meta.env.VITE_API_URL as string) || window.location.origin;

  // Initialize notification sound
  useEffect(() => {
    const chimeUrl = 'https://assets.mixkit.co/sfx/preview/mixkit-message-pop-alert-2354.mp3';
    const audio = new Audio(chimeUrl);
    audio.preload = 'auto';
    audio.volume = 0.45;
    audioRef.current = audio;
  }, []);

  const playNotificationSound = useCallback(() => {
    if (!isMuted && audioRef.current) {
      audioRef.current.play().catch(err => console.log('Audio play failed:', err));
    }
  }, [isMuted]);

  const loadConversations = useCallback(async () => {
    if (!token) return;
    try {
     
      const { data } = await api.get('/chat/admin/conversations');
   
      if (data.success) {
        setConversations(data.conversations);
      }
    } catch (error) {
      return error;
    }
  }, [token, SERVER_URL]);

  const loadUserMessages = useCallback(async (userId: string) => {
    if (!token) return;
    try {
      const { data } = await api.get(`/chat/admin/conversation/${userId}`);
 
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
     
    }
  }, [token, SERVER_URL]);

  useEffect(() => {
    if (!token) return;


    const newSocket = io(SERVER_URL, {
      auth: { token },
      transports: ['websocket', 'polling']
    });

    newSocket.on('connect', () => {
   
      setIsConnected(true);
      loadConversations();
    });

    newSocket.on('disconnect', () => {
   
      setIsConnected(false);
    });

    newSocket.on('onlineUsers', (users) => {
     
      setOnlineUsers(users);
    });

    newSocket.on('newMessageFromUser', (data) => {
    
      const { message, user } = data;
      
      playNotificationSound();
      
      // Update conversations list
      setConversations(prev => {
        const filtered = prev.filter(conv => conv._id._id !== user._id);
        const existingConv = prev.find(conv => conv._id._id === user._id);
        return [{
          _id: { _id: user._id, name: user.name, email: user.email, avatar: user.avatar },
          lastMessage: message,
          unreadCount: (existingConv?.unreadCount || 0) + 1
        }, ...filtered];
      });

      // If this user is selected, add to messages
      if (selectedUser?._id === user._id) {
        setMessages(prev => {
          if (prev.some(m => m._id === message._id)) return prev;
          return [...prev, message];
        });
      }
    });

    newSocket.on('userTyping', (data) => {
   
      setTypingUsers(prev => ({
        ...prev,
        [data.userId]: data.typing
      }));
    });

    newSocket.on('userOnline', (data) => {
      setOnlineUsers(prev => [...prev, data]);
    });

    newSocket.on('userOffline', (data) => {
      setOnlineUsers(prev => prev.filter(user => user.userId !== data.userId));
    });

    setSocket(newSocket);

    return () => {
 newSocket.close();
    };
  }, [token, SERVER_URL, playNotificationSound, loadConversations, selectedUser]);

  useEffect(() => {
    if (selectedUser && socket) {
      loadUserMessages(selectedUser._id);
      socket.emit('markMessagesAsRead', { senderId: selectedUser._id });
      
      // Reset unread count for selected user
      setConversations(prev => prev.map(conv => 
        conv._id._id === selectedUser._id 
          ? { ...conv, unreadCount: 0 }
          : conv
      ));
    }
  }, [selectedUser?._id, socket, loadUserMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser || !socket) return;

   
    socket.emit('sendMessageToUser', {
      userId: selectedUser._id,
      message: newMessage.trim()
    });

    setNewMessage('');
  };

  const handleTypingStart = () => {
    if (socket && selectedUser) {
      socket.emit('adminTypingStart', { userId: selectedUser._id });
    }
  };

  const handleTypingStop = () => {
    if (socket && selectedUser) {
      socket.emit('adminTypingStop', { userId: selectedUser._id });
    }
  };

  const isUserOnline = (userId: string) => {
    return onlineUsers.some(user => user.userId === userId);
  };

  const getTotalUnread = () => {
    return conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);
  };

  return (
    <div className="flex h-full bg-white rounded-lg shadow-xl overflow-hidden">
      {/* Conversations Sidebar */}
      <div className="w-80 border-r border-slate-200 flex flex-col bg-slate-50">
        <div className="px-4 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-lg">Conversations</h3>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-lg hover:bg-white/20 transition-colors"
              title={isMuted ? 'Unmute notifications' : 'Mute notifications'}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              {onlineUsers.length} online
            </span>
            {getTotalUnread() > 0 && (
              <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                {getTotalUnread()} unread
              </span>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4 text-slate-500">
              <User className="w-12 h-12 mb-2" />
              <p className="text-sm">No conversations yet</p>
            </div>
          ) : (
            conversations.map((conversation) => (
              <div
                key={conversation._id._id}
                className={`p-4 border-b border-slate-200 cursor-pointer transition-all hover:bg-blue-50 ${
                  selectedUser?._id === conversation._id._id ? 'bg-blue-100' : 'bg-white'
                }`}
                onClick={() => setSelectedUser(conversation._id)}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                      {conversation._id.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${
                      isUserOnline(conversation._id._id) ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-slate-900 truncate">{conversation._id.name}</h4>
                      {conversation.unreadCount > 0 && (
                        <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 truncate">{conversation._id.email}</p>
                    {conversation.lastMessage && (
                      <p className="text-sm text-slate-600 truncate mt-1">
                        {conversation.lastMessage.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            <div className="px-6 py-4 border-b border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                    {selectedUser.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-white rounded-full ${
                    isUserOnline(selectedUser._id) ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{selectedUser.name}</h3>
                  <p className="text-sm text-slate-500">{selectedUser.email}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-slate-50">
              {messages.map((message) => (
                <div
                  key={message._id}
                  className={`flex ${message.sender._id === currentUser.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${message.sender._id === currentUser.id ? 'order-2' : 'order-1'}`}>
                    <div className={`rounded-2xl px-4 py-3 shadow-sm ${
                      message.sender._id === currentUser.id
                        ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-br-sm'
                        : 'bg-white text-slate-900 rounded-bl-sm border border-slate-200'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.message}</p>
                      <span className={`text-xs mt-1 block ${
                        message.sender._id === currentUser.id ? 'text-white/80' : 'text-slate-500'
                      }`}>
                        {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {typingUsers[selectedUser._id] && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-slate-200">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="px-6 py-4 bg-white border-t border-slate-200">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onFocus={handleTypingStart}
                  onBlur={handleTypingStop}
                  placeholder="Type your message..."
                  disabled={!isConnected}
                  maxLength={500}
                  className="flex-1 px-4 py-3 rounded-full border-2 border-slate-300 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 placeholder:text-slate-400"
                />
                <button 
                  type="submit" 
                  disabled={!isConnected || !newMessage.trim()}
                  className="p-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 flex items-center justify-center"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4 bg-slate-50">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <User className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="font-bold text-xl text-slate-900 mb-2">Select a conversation</h3>
            <p className="text-slate-600">Choose from the list on the left to view messages</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChat;
