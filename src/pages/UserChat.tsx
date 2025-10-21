import React, { useState, useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';
import { Volume2, VolumeX } from 'lucide-react';
import './UserChat.css';
import '../styles/chat-animations.css';

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

interface UserChatProps {
  token: string;
  currentUser: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const UserChat: React.FC<UserChatProps> = ({ token, currentUser, isOpen, onClose }) => {
  const [socket, setSocket] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // ✅ FIX: Vite compatible environment variable
  const SERVER_URL = import.meta.env.VITE_API_URL || 'https://tour-backend-production-7311.up.railway.app';

  // Notification sound
  useEffect(() => {
    audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjWN0fPTgjMGHm7A7+OZSA0PVKno8LJZCQ1FmuDxv2wiBjGJ0fPTgjMGHm7A7+OZSA0PVKno8LJZCQ1FmuDxv2wiBjGJ0fPTgjMGHm7A7+OZSA0PVKno8LJZCQ1FmuDxv2wiBjGJ0fPTgjMGHm7A7+OZSA0PVKno8LJZCQ1FmuDxv2wiBjGJ0fPTgjMGHm7A7+OZSA0PVKno8LJZCQ1FmuDxv2wiBjGJ0fPTgjMGHm7A7+OZSA0PVKno8LJZCQ1FmuDxv2wiBjGJ0fPTgjMGHm7A7+OZSA0PVKno8LJZCQ1FmuDxv2wiBjGJ0fPTgjMGHm7A7+OZSA0PVKno8LJZCQ1FmuDxv2wiBjGJ0fPTgjMGHm7A7+OZSA0PVKno8LJZCQ1FmuDxv2wiBjGJ0fPTgjMGHm7A7+OZSA0PVKno8LJZCQ1FmuDxv2wiBjGJ0fPTgjMGHm7A7+OZSA0PVKno8LJZCQ1FmuDxv2wiBjGJ0fPTgjMGHm7A7+OZSA0PVKno8LJZCQ1FmuDxv2wiBjGJ0fPTgjMGHm7A7+OZSA0PVKno8LJZCQ1FmuDxv2wiBjGJ0fPTgjMGHm7A7+OZSA0PVKno8LJZCQ1FmuDxv2wiBjGJ0fPTgjMGHm7A7+OZSA0PVKno8LJZCQ1FmuDxv2wiBjGJ0fPTgjMGHm7A7+OZSA0PVKno8LJZCQ1FmuDxv2wiBjGJ0fPTgjMGHm7A7+OZ');
  }, []);

  // Play notification sound
  const playNotificationSound = useCallback(() => {
    if (!isMuted && audioRef.current) {
      audioRef.current.play().catch(err => console.log('Audio play failed:', err));
    }
  }, [isMuted]);

  // Reset unread count when chat is opened
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  const loadMessageHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log('📡 Loading message history from:', `${SERVER_URL}/api/chat/user/messages`);
      
      const headers: any = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      // ✅ For Google Auth users, add user data in headers
      if (token === 'google-auth-token') {
        const userDataStr = localStorage.getItem('user');
        if (userDataStr) {
          headers['x-user-data'] = encodeURIComponent(userDataStr);
          console.log('✅ Adding Google Auth user data to API headers');
        }
      }
      
      const response = await fetch(`${SERVER_URL}/api/chat/user/messages`, {
        headers: headers
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success && Array.isArray(data.messages)) {
        console.log(`✅ Loaded ${data.messages.length} messages from API`);
        
        // Remove any duplicates by ID
        const uniqueMessages = data.messages.filter((msg, index, self) =>
          index === self.findIndex((m) => m._id === msg._id)
        );
        
        if (uniqueMessages.length !== data.messages.length) {
          console.log('⚠️ Found', data.messages.length - uniqueMessages.length, 'duplicate messages in API response');
        }
        
        setMessages(uniqueMessages);
      } else {
        console.log('⚠️ No messages found or invalid response');
        setMessages([]);
      }
    } catch (error) {
      console.error('❌ Error loading message history:', error);
      setMessages([]);
    } finally {
      setIsLoading(false);
    }
  }, [SERVER_URL, token]);

  useEffect(() => {
    console.log('🔍 UserChat Debug:', { 
      isOpen, 
      hasToken: !!token, 
      currentUser: currentUser?.name,
      SERVER_URL 
    });
    
    if (!isOpen || !token) {
      console.log('❌ Chat not opening - conditions not met');
      return;
    }

    console.log('🚀 Initializing socket connection to:', SERVER_URL);

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
            userData: userData  // Send as object, not string
          };
          console.log('✅ Google Auth user - sending user data:', userData.email);
        } catch (e) {
          console.error('❌ Failed to parse user data:', e);
          socketOptions.auth = { token: token };
        }
      } else {
        console.error('❌ No user data in localStorage');
        socketOptions.auth = { token: token };
      }
    } else {
      // Regular JWT auth
      socketOptions.auth = { token: token };
    }

    const newSocket = io(SERVER_URL, socketOptions);

    newSocket.on('connect', () => {
      console.log('✅ Socket connected successfully');
      setIsConnected(true);
    });

    newSocket.on('disconnect', (reason) => {
      console.log('❌ Socket disconnected:', reason);
      setIsConnected(false);
    });

    newSocket.on('connect_error', (error) => {
      console.error('🚨 Socket connection error:', error);
      setIsConnected(false);
    });

    newSocket.on('newMessageFromAdmin', (message: Message) => {
      console.log(`📨 Received message from admin: "${message.message}"`);
      setMessages(prev => {
        // Check if message already exists by ID
        const exists = prev.some(m => m._id === message._id);
        if (exists) {
          console.log('⚠️ Duplicate message detected, skipping');
          return prev;
        }
        console.log('✅ Adding new message from admin');
        return [...prev, message];
      });
      
      // Play notification sound
      playNotificationSound();
      
      // Increment unread count if chat is closed
      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
      }
    });

    newSocket.on('messageSent', (message: Message) => {
      console.log(`📤 Message sent: "${message.message}"`);
      setMessages(prev => {
        // Check if message already exists by ID
        const exists = prev.some(m => m._id === message._id);
        if (exists) {
          console.log('⚠️ Duplicate message detected, skipping');
          return prev;
        }
        console.log('✅ Message added to chat');
        return [...prev, message];
      });
    });

    newSocket.on('adminTyping', (data: { typing: boolean }) => {
      console.log('⌨️ Admin typing:', data);
      setIsTyping(data.typing);
    });

    newSocket.on('error', (error: any) => {
      console.error('🚨 Socket error:', error);
    });

    setSocket(newSocket);

    return () => {
      console.log('🧹 Cleaning up socket connection');
      if (newSocket) {
        newSocket.close();
      }
      setSocket(null);
      setIsConnected(false);
    };
  }, [isOpen, token, SERVER_URL, loadMessageHistory]);

  // Load messages when socket connects OR when modal opens
  useEffect(() => {
    if (isConnected && token) {
      console.log('🔄 Socket connected - loading messages...');
      loadMessageHistory();
    }
  }, [isConnected, token, loadMessageHistory]);

  // Also load messages when modal opens (for cached messages)
  useEffect(() => {
    if (isOpen && token) {
      console.log('📖 Modal opened - loading message history...');
      loadMessageHistory();
    }
  }, [isOpen, token, loadMessageHistory]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket) {
      console.log('❌ Cannot send message:', { hasSocket: !!socket, message: newMessage });
      return;
    }

    const messageToSend = newMessage.trim();
    console.log('📤 Sending message to admin:', messageToSend);
    
    // Clear input immediately to prevent duplicate sends
    setNewMessage('');
    
    socket.emit('sendMessageToAdmin', {
      message: messageToSend
    });
  };

  const handleTypingStart = () => {
    if (socket && isConnected) {
      socket.emit('typingStartToAdmin');
    }
  };

  const handleTypingStop = () => {
    if (socket && isConnected) {
      socket.emit('typingStopToAdmin');
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 via-slate-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
      {/* Modern Header with Gradient */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-90"></div>
        <div className="relative flex items-center justify-between px-6 py-4 border-b border-white/20 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center text-white font-bold text-lg border-2 border-white/50 shadow-xl">
                CS
              </div>
              <span className={`absolute bottom-0 right-0 w-4 h-4 border-2 border-white rounded-full shadow-lg ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-500'}`} />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Customer Support</h3>
              <span className={`text-xs font-medium ${isConnected ? 'text-green-200' : 'text-red-200'}`}>
                {isConnected ? '● Online - We\'re here to help!' : '● Offline - Connecting...'}
              </span>
            </div>
          </div>
          
          {/* Mute/Unmute Button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-lg bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-all duration-200 border border-white/20"
            title={isMuted ? 'Unmute notifications' : 'Mute notifications'}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-white" />
            ) : (
              <Volume2 className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Messages Area - Enhanced with side-by-side layout */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 max-h-[calc(100vh-300px)] scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent" style={{minHeight: '400px'}}>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 absolute top-0 left-0"></div>
            </div>
            <p className="mt-6 text-slate-700 dark:text-slate-300 font-medium">Loading your messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6 shadow-xl">
              <svg className="w-14 h-14 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-2">Start a Conversation</h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-sm">No messages yet. Our support team is ready to assist you with any questions!</p>
          </div>
        ) : (
          <>
            {messages.map((message) => {
              const isUserMessage = message.sender._id === currentUser.id;
              return (
                <div
                  key={message._id}
                  className={`flex gap-3 ${isUserMessage ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  {/* Admin Avatar - Left Side */}
                  {!isUserMessage && (
                    <div className="flex-shrink-0">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg border-2 border-white">
                        {message.sender.avatar ? (
                          <img src={message.sender.avatar} alt={message.sender.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          message.sender.name.charAt(0).toUpperCase()
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Message Content */}
                  <div className={`max-w-[70%] ${isUserMessage ? 'items-end' : 'items-start'} flex flex-col`}>
                    <div className={`rounded-2xl px-5 py-3 shadow-md ${
                      isUserMessage
                        ? 'bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white rounded-br-md'
                        : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-md border border-slate-200 dark:border-slate-700'
                    }`}>
                      {/* Sender Name for Admin Messages */}
                      {!isUserMessage && (
                        <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
                          {message.sender.name}
                        </p>
                      )}
                      <p className="text-sm leading-relaxed break-words">{message.message}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-xs ${
                          isUserMessage
                            ? 'text-white/80'
                            : 'text-slate-500 dark:text-slate-400'
                        }`}>
                          {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {isUserMessage && (
                          <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* User Avatar - Right Side */}
                  {isUserMessage && (
                    <div className="flex-shrink-0">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg border-2 border-white">
                        {currentUser.avatar ? (
                          <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          currentUser.name.charAt(0).toUpperCase()
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            {isTyping && (
              <div className="flex justify-start gap-3 animate-fade-in">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                  🎧
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-2xl px-5 py-3 shadow-md border border-emerald-200 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                      <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                      <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                    </div>
                    <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">Agent is typing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Enhanced Input Area */}
      <form onSubmit={handleSendMessage} className="px-6 py-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onFocus={handleTypingStart}
              onBlur={handleTypingStop}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              placeholder={isConnected ? "Type your message..." : "Connecting to server..."}
              disabled={!isConnected}
              className="w-full px-5 py-3.5 pr-14 rounded-full border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 dark:text-white placeholder:text-slate-400 font-medium"
            />
            {newMessage && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium bg-white dark:bg-slate-900 px-2 py-1 rounded-full">
                {newMessage.length}/500
              </div>
            )}
          </div>
          <button 
            type="submit" 
            disabled={!isConnected || !newMessage.trim()}
            className="p-4 rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white hover:shadow-xl hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 flex items-center justify-center group"
          >
            <svg className="w-5 h-5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        {!isConnected && (
          <p className="text-xs text-center text-red-500 mt-3 font-medium animate-pulse">
            ● Connecting to server... Please wait
          </p>
        )}
      </form>
    </div>
  );
};

export default UserChat;