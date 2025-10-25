import React, { useState, useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { Volume2, VolumeX, Send } from 'lucide-react';
import './UserChat.css';

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
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  const loadMessageHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log('📡 Loading messages from:', `${SERVER_URL}/api/chat/user/messages`);
      
      const response = await fetch(`${SERVER_URL}/api/chat/user/messages`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
   
      
      if (data.success && Array.isArray(data.messages)) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error('❌ Error loading messages:', error);
    } finally {
      setIsLoading(false);
    }
  }, [SERVER_URL, token]);

  useEffect(() => {
    if (!isOpen || !token) return;

    console.log('🚀 Connecting socket to:', SERVER_URL);

    const newSocket = io(SERVER_URL, {
      auth: { token },
      transports: ['websocket', 'polling']
    });

    newSocket.on('connect', () => {
      console.log('✅ Socket connected');
      setIsConnected(true);
      loadMessageHistory();
    });

    newSocket.on('disconnect', () => {
      console.log('❌ Socket disconnected');
      setIsConnected(false);
    });

    newSocket.on('connect_error', (error) => {
      console.error('🚨 Connection error:', error);
      setIsConnected(false);
    });

    // ✅ RECEIVE ADMIN MESSAGE
    newSocket.on('newMessageFromAdmin', (message: Message) => {
      console.log('📨 NEW MESSAGE FROM ADMIN:', message);
      
      setMessages(prev => {
        if (prev.some(m => m._id === message._id)) {
          return prev;
        }
        return [...prev, message];
      });
      
      playNotificationSound();
    });

    // ✅ MESSAGE SENT CONFIRMATION
    newSocket.on('messageSent', (message: Message) => {
      console.log('✅ Message sent confirmed:', message);
      setMessages(prev => {
        if (prev.some(m => m._id === message._id)) {
          return prev;
        }
        return [...prev, message];
      });
    });

    // ✅ ADMIN TYPING
    newSocket.on('adminTyping', (data: { typing: boolean }) => {
      console.log('⌨️ Admin typing:', data.typing);
      setIsTyping(data.typing);
    });

    setSocket(newSocket);

    return () => {
      console.log('🧹 Cleaning up socket');
      newSocket.close();
    };
  }, [isOpen, token, SERVER_URL, playNotificationSound, loadMessageHistory]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket || !isConnected) return;

    console.log('📤 Sending message:', newMessage);
    socket.emit('sendMessageToAdmin', {
      message: newMessage.trim()
    });

    setNewMessage('');
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

  if (!isOpen) return null;

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white font-bold text-lg">
              CS
            </div>
            <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-white rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-500'}`} />
          </div>
          <div>
            <h3 className="font-bold text-lg">Customer Support</h3>
            <span className="text-xs text-white/90">
              {isConnected ? '● Online - We\'re here to help!' : '● Connecting...'}
            </span>
          </div>
        </div>
        
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-2 rounded-lg hover:bg-white/20 transition-colors"
          title={isMuted ? 'Unmute notifications' : 'Mute notifications'}
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6" />
          ) : (
            <Volume2 className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-slate-600">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="font-bold text-xl text-slate-900 mb-2">Start a Conversation</h3>
            <p className="text-slate-600">No messages yet. Our support team is ready to assist you!</p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message._id}
                className={`flex ${message.sender._id === currentUser.id ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[75%] ${message.sender._id === currentUser.id ? 'order-2' : 'order-1'}`}>
                  <div className={`rounded-2xl px-4 py-3 shadow-md ${
                    message.sender._id === currentUser.id
                      ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-br-sm'
                      : 'bg-white text-slate-900 rounded-bl-sm border border-slate-200'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.message}</p>
                    <span className={`text-xs mt-1 block ${
                      message.sender._id === currentUser.id
                        ? 'text-white/80'
                        : 'text-slate-500'
                    }`}>
                      {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl px-4 py-3 shadow-md border border-slate-200">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="px-4 py-4 bg-white border-t border-slate-200 shadow-lg">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onFocus={handleTypingStart}
            onBlur={handleTypingStop}
            placeholder={isConnected ? "Type your message..." : "Connecting..."}
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
        {!isConnected && (
          <p className="text-xs text-center text-red-500 mt-2">
            ● Connecting to server... Please wait
          </p>
        )}
      </form>
    </div>
  );
};

export default UserChat;
