import React, { useState, useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';
import { Volume2, VolumeX, Search, UserCircle, Clock } from 'lucide-react';
import './AdminChat.css';
import '../styles/chat-animations.css';

interface AdminChatProps {
  token: string;
  currentUser: {
    id: string;
    name: string;
    email: string;
  };
  onUnreadCountChange?: (count: number) => void;
}

const AdminChat: React.FC<AdminChatProps> = ({ token, currentUser, onUnreadCountChange }) => {
  const [socket, setSocket] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState({});
  const [isMuted, setIsMuted] = useState(false);
  const [totalUnread, setTotalUnread] = useState(0);
  const messagesEndRef = useRef(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isTypingRef = useRef(false);

  // Notification sound
  useEffect(() => {
    audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjWN0fPTgjMGHm7A7+OZSA0PVKno8LJZCQ1FmuDxv2wiBjGJ0fPTgjMGHm7A7+OZSA0PVKno8LJZCQ1FmuDxv2wiBjGJ0fPTgjMGHm7A7+OZSA0PVKno8LJZCQ1FmuDxv2wiBjGJ0fPTgjMGHm7A7+OZSA0PVKno8LJZCQ1FmuDxv2wiBjGJ0fPTgjMGHm7A7+OZSA0PVKno8LJZCQ1FmuDxv2wiBjGJ0fPTgjMGHm7A7+OZSA0PVKno8LJZCQ1FmuDxv2wiBjGJ0fPTgjMGHm7A7+OZSA0PVKno8LJZCQ1FmuDxv2wiBjGJ0fPTgjMGHm7A7+OZSA0PVKno8LJZCQ1FmuDxv2wiBjGJ0fPTgjMGHm7A7+OZSA0PVKno8LJZCQ1FmuDxv2wiBjGJ0fPTgjMGHm7A7+OZSA0PVKno8LJZCQ1FmuDxv2wiBjGJ0fPTgjMGHm7A7+OZSA0PVKno8LJZCQ1FmuDxv2wiBjGJ0fPTgjMGHm7A7+OZSA0PVKno8LJZCQ1FmuDxv2wiBjGJ0fPTgjMGHm7A7+OZSA0PVKno8LJZCQ1FmuDxv2wiBjGJ0fPTgjMGHm7A7+OZSA0PVKno8LJZCQ1FmuDxv2wiBjGJ0fPTgjMGHm7A7+OZSA0PVKno8LJZCQ1FmuDxv2wiBjGJ0fPTgjMGHm7A7+OZSA0PVKno8LJZCQ1FmuDxv2wiBjGJ0fPTgjMGHm7A7+OZSA0PVKno8LJZCQ1FmuDxv2wiBjGJ0fPTgjMGHm7A7+OZ');
  }, []);

  // Play notification sound
  const playNotificationSound = useCallback(() => {
    if (!isMuted && audioRef.current) {
      audioRef.current.play().catch(err => console.log('Audio play failed:', err));
    }
  }, [isMuted]);

  const loadConversations = useCallback(async () => {
    if (!token) return;
    try {
      console.log('📥 Loading conversations...');
      
      const headers: any = {
        'Authorization': `Bearer ${token}`
      };

      // ✅ For Google Auth, add user data
      if (token === 'google-auth-token') {
        const userDataStr = localStorage.getItem('user');
        if (userDataStr) {
          headers['x-user-data'] = encodeURIComponent(userDataStr);
        }
      }
      
      const response = await fetch('http://localhost:5000/api/chat/admin/conversations', {
        headers: headers
      });
      const data = await response.json();
      console.log('✅ Conversations response:', data);
      if (data.success) {
        setConversations(data.conversations);
        // Calculate total unread messages
        const total = data.conversations.reduce((sum, conv) => sum + (conv.unreadCount || 0), 0);
        setTotalUnread(total);
        onUnreadCountChange?.(total);
        console.log('📊 Total unread messages:', total);
      }
    } catch (error) {
      console.error('❌ Error loading conversations:', error);
    }
  }, [token]);

  const loadUserMessages = useCallback(async (userId: string) => {
    if (!token) return;
    try {
      console.log('📥 Loading messages for user:', userId);
      
      const headers: any = {
        'Authorization': `Bearer ${token}`
      };

      // ✅ For Google Auth, add user data
      if (token === 'google-auth-token') {
        const userDataStr = localStorage.getItem('user');
        if (userDataStr) {
          headers['x-user-data'] = encodeURIComponent(userDataStr);
        }
      }
      
      const response = await fetch(`http://localhost:5000/api/chat/admin/conversation/${userId}`, {
        headers: headers
      });
      const data = await response.json();
      console.log('✅ Messages response:', data);
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error('❌ Error loading user messages:', error);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;

    console.log('🚀 Admin connecting to socket...');

    // ✅ Prepare socket options with proper auth
    const socketOptions: any = {
      transports: ['websocket', 'polling']
    };

    // ✅ For Google Auth users, send user data in auth object
    if (token === 'google-auth-token') {
      const userDataStr = localStorage.getItem('user');
      if (userDataStr) {
        try {
          const userData = JSON.parse(userDataStr);
          socketOptions.auth = {
            token: 'google-auth-token',
            userData: userData
          };
          console.log('✅ Admin Google Auth - sending user data:', userData.email);
        } catch (e) {
          console.error('❌ Failed to parse admin user data:', e);
          socketOptions.auth = { token: token };
        }
      } else {
        socketOptions.auth = { token: token };
      }
    } else {
      // Regular JWT auth
      socketOptions.auth = { token: token };
    }

    const newSocket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000', socketOptions);

    newSocket.on('connect', () => {
      console.log('Admin connected to chat server');
    });

    newSocket.on('onlineUsers', (users) => {
      setOnlineUsers(users);
    });

    newSocket.on('newMessageFromUser', (data) => {
      console.log(`📨 Admin received message: "${data.message.message}" from ${data.user.name}`);
      const { message, user } = data;
      
      // Play notification sound
      playNotificationSound();
      
      // Update conversations list and total unread count
      setConversations(prev => {
        const filtered = prev.filter(conv => conv._id._id !== user._id);
        const existingConv = prev.find(conv => conv._id._id === user._id);
        const newUnreadCount = (existingConv?.unreadCount || 0) + 1;
        
        // Update total unread count
        setTotalUnread(prevTotal => {
          const newTotal = prevTotal + 1;
          onUnreadCountChange?.(newTotal);
          return newTotal;
        });
        
        return [{ _id: { _id: user._id, ...user }, lastMessage: message, unreadCount: newUnreadCount }, ...filtered];
      });

      // If this user is selected, add message to current chat
      if (selectedUser?._id === user._id) {
        setMessages(prev => {
          // Check if message already exists
          if (prev.some(m => m._id === message._id)) {
            return prev;
          }
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

    // Handle admin's own message confirmation
    newSocket.on('messageSentToUser', (message) => {
      console.log('✅ Admin message sent confirmation:', message);
      setMessages(prev => {
        // Check if message already exists
        if (prev.some(m => m._id === message._id)) {
          return prev;
        }
        return [...prev, message];
      });
    });

    newSocket.on('error', (error) => {
      console.error('🚨 Socket error:', error);
    });

    setSocket(newSocket);

    return () => {
      console.log('Cleaning up socket connection');
      newSocket.close();
    };
  }, [token, playNotificationSound]);

  // Load conversations on mount
  useEffect(() => {
    if (token) {
      loadConversations();
    }
  }, [token, loadConversations]);

  useEffect(() => {
    if (selectedUser && socket) {
      loadUserMessages(selectedUser._id);
      // Mark messages as read when selecting user
      socket.emit('markMessagesAsRead', { senderId: selectedUser._id });
      
      // Update unread count - reduce by the conversation's unread count
      setConversations(prev => {
        const conv = prev.find(c => c._id._id === selectedUser._id);
        if (conv && conv.unreadCount > 0) {
          // Reduce total unread count
          setTotalUnread(prevTotal => {
            const newTotal = Math.max(0, prevTotal - conv.unreadCount);
            onUnreadCountChange?.(newTotal);
            return newTotal;
          });
          // Set this conversation's unread to 0
          return prev.map(c =>
            c._id._id === selectedUser._id ? { ...c, unreadCount: 0 } : c
          );
        }
        return prev;
      });
    }
  }, [selectedUser?._id, socket, loadUserMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Cleanup typing timeout on unmount or user change
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      handleTypingStop();
    };
  }, [selectedUser]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser || !socket) return;

    // Clear typing timeout and stop typing indicator
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    handleTypingStop();

    socket.emit('sendMessageToUser', {
      userId: selectedUser._id,
      message: newMessage.trim()
    });

    setNewMessage('');
  };

  const handleTypingStart = () => {
    if (socket && selectedUser && !isTypingRef.current) {
      isTypingRef.current = true;
      socket.emit('adminTypingStart', { userId: selectedUser._id });
      console.log('⌨️ Admin started typing to user:', selectedUser._id);
    }
  };

  const handleTypingStop = () => {
    if (socket && selectedUser && isTypingRef.current) {
      isTypingRef.current = false;
      socket.emit('adminTypingStop', { userId: selectedUser._id });
      console.log('⏹️ Admin stopped typing to user:', selectedUser._id);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    
    // Start typing indicator
    handleTypingStart();
    
    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Set new timeout to stop typing after 2 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      handleTypingStop();
    }, 2000);
  };

  const isUserOnline = (userId) => {
    return onlineUsers.some(user => user.userId === userId);
  };

  return (
    <div className="flex h-full bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Conversations Sidebar - Modern Design */}
      <div className="w-96 border-r border-slate-200 bg-white flex flex-col">
        {/* Sidebar Header with Gradient */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 opacity-90"></div>
          <div className="relative px-6 py-5 border-b border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-white text-xl">Conversations</h3>
                {totalUnread > 0 && (
                  <p className="text-xs text-white/80 mt-1">
                    {totalUnread} unread message{totalUnread !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-lg rounded-full text-xs font-medium text-white border border-white/30">
                  {onlineUsers.length} online
                </span>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-lg bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-all border border-white/20"
                  title={isMuted ? 'Unmute notifications' : 'Mute notifications'}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-white" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>
            </div>
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg text-white placeholder-white/60 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all text-sm"
              />
            </div>
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <UserCircle className="w-16 h-16 text-slate-300 mb-3" />
              <p className="text-slate-500 font-medium">No conversations yet</p>
              <p className="text-slate-400 text-sm mt-1">Wait for users to message you</p>
            </div>
          ) : (
            conversations.map((conversation) => (
              <div
                key={conversation._id._id}
                className={`flex items-center gap-3 px-4 py-4 border-b border-slate-100 cursor-pointer transition-all hover:bg-slate-50 ${
                  selectedUser?._id === conversation._id._id
                    ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-l-emerald-500'
                    : ''
                }`}
                onClick={() => setSelectedUser(conversation._id)}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                    {conversation._id.avatar ? (
                      <img
                        src={conversation._id.avatar}
                        alt={conversation._id.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg">
                        {conversation._id.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <span
                    className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
                      isUserOnline(conversation._id._id) ? 'bg-green-500' : 'bg-slate-400'
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-slate-900 truncate">
                      {conversation._id.name}
                    </h4>
                    <span className="text-xs text-slate-500">
                      {conversation.lastMessage &&
                        new Date(conversation.lastMessage.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-600 truncate">
                      {conversation.lastMessage?.message?.substring(0, 35) || 'No messages'}...
                    </p>
                    {conversation.unreadCount > 0 && (
                      <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] text-center">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area - Modern Design */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500 shadow-md">
                      {selectedUser.avatar ? (
                        <img
                          src={selectedUser.avatar}
                          alt={selectedUser.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg">
                          {selectedUser.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <span
                      className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                        isUserOnline(selectedUser._id) ? 'bg-green-500 animate-pulse' : 'bg-slate-400'
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">{selectedUser.name}</h3>
                    <span className="text-sm text-slate-600">{selectedUser.email}</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg font-medium transition-colors">
                  User Info
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-gradient-to-br from-slate-50 to-slate-100">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <p className="text-slate-600 font-medium">No messages yet</p>
                  <p className="text-slate-500 text-sm">Start the conversation</p>
                </div>
              ) : (
                <>
                  {messages.map((message) => {
                    const isAdminMessage = message.sender._id === currentUser.id;
                    return (
                      <div
                        key={message._id}
                        className={`flex gap-3 ${isAdminMessage ? 'justify-end' : 'justify-start'} animate-fade-in`}
                      >
                        {/* User Avatar - Left Side */}
                        {!isAdminMessage && (
                          <div className="flex-shrink-0">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg border-2 border-white">
                              {message.sender.avatar ? (
                                <img
                                  src={message.sender.avatar}
                                  alt={message.sender.name}
                                  className="w-full h-full rounded-full object-cover"
                                />
                              ) : (
                                message.sender.name.charAt(0).toUpperCase()
                              )}
                            </div>
                          </div>
                        )}

                        {/* Message Content */}
                        <div className={`max-w-[70%] ${isAdminMessage ? 'items-end' : 'items-start'} flex flex-col`}>
                          <div
                            className={`rounded-2xl px-5 py-3 shadow-md ${
                              isAdminMessage
                                ? 'bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white rounded-br-md'
                                : 'bg-white text-slate-900 rounded-bl-md border border-slate-200'
                            }`}
                          >
                            {/* Sender Name for User Messages */}
                            {!isAdminMessage && (
                              <p className="text-xs font-semibold text-purple-600 mb-1">
                                {message.sender.name}
                              </p>
                            )}
                            <p className="text-sm leading-relaxed break-words">{message.message}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span
                                className={`text-xs ${
                                  isAdminMessage ? 'text-white/80' : 'text-slate-500'
                                }`}
                              >
                                {new Date(message.createdAt).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                              {isAdminMessage && (
                                <svg
                                  className="w-4 h-4 text-white/80"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Admin Avatar - Right Side */}
                        {isAdminMessage && (
                          <div className="flex-shrink-0">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg border-2 border-white">
                              {currentUser.name.charAt(0).toUpperCase()}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {typingUsers[selectedUser._id] && (
                    <div className="flex justify-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                        {selectedUser.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="bg-white rounded-2xl px-5 py-4 shadow-md border border-slate-200">
                        <div className="flex gap-1.5">
                          <span
                            className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce"
                            style={{ animationDelay: '0ms' }}
                          ></span>
                          <span
                            className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce"
                            style={{ animationDelay: '150ms' }}
                          ></span>
                          <span
                            className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce"
                            style={{ animationDelay: '300ms' }}
                          ></span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="px-6 py-4 bg-white border-t border-slate-200 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={handleInputChange}
                    onBlur={handleTypingStop}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(e);
                      }
                    }}
                    placeholder="Type your message..."
                    className="w-full px-5 py-3.5 pr-14 rounded-full border-2 border-slate-300 bg-slate-50 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all text-slate-900 placeholder:text-slate-400 font-medium"
                  />
                  {newMessage && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium bg-white px-2 py-1 rounded-full">
                      {newMessage.length}/500
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="p-4 rounded-full bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white hover:shadow-xl hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 flex items-center justify-center group"
                >
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mb-6 shadow-xl">
              <svg className="w-14 h-14 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Select a Conversation</h3>
            <p className="text-slate-600">Choose from the list on the left to view and respond to messages</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChat;