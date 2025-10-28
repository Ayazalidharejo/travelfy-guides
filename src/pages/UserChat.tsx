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
  const altAudioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<any>(null);

  // Resolve socket server URL: prefer VITE_SOCKET_URL; else derive from VITE_API_BASE_URL by stripping /api; else default to current origin
  const SERVER_URL = (
    (import.meta.env.VITE_SOCKET_URL as string) ||
    ((import.meta.env.VITE_API_BASE_URL as string)?.replace(/\/?api\/?$/, '') as string) ||
    'https://karvaantours.com'
  );

  // Notification sound - pleasant chimes (primary + alternate)
  useEffect(() => {
    const chime1 = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-message-pop-alert-2354.mp3');
    (chime1 as any).crossOrigin = 'anonymous';
    chime1.preload = 'auto';
    chime1.volume = 0.45;

    const chime2 = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-quick-win-video-game-notification-269.mp3');
    (chime2 as any).crossOrigin = 'anonymous';
    chime2.preload = 'auto';
    chime2.volume = 0.45;

    audioRef.current = chime1;
    altAudioRef.current = chime2;
  }, []);

  // Unlock audio on first user interaction (required by some browsers)
  useEffect(() => {
    const unlock = async () => {
      try {
        const AC: any = (window as any).AudioContext || (window as any).webkitAudioContext;
        if (AC && !audioContextRef.current) {
          audioContextRef.current = new AC();
          if (audioContextRef.current.state === 'suspended') {
            await audioContextRef.current.resume();
          }
        }
        const prime = async (el: HTMLAudioElement | null) => {
          if (!el) return;
          const prev = el.volume;
          el.volume = 0.001;
          await el.play().catch(() => {});
          el.pause();
          el.currentTime = 0;
          el.volume = prev;
        };
        await prime(audioRef.current);
        await prime(altAudioRef.current);
      } catch {}
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('touchstart', unlock);
    };
    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('touchstart', unlock, { once: true });
    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('touchstart', unlock);
    };
  }, []);

  // Play notification sound
  const playNotificationSound = useCallback(() => {
    if (isMuted) return;

    const fallbackBeep = async () => {
      try {
        const AC: any = (window as any).AudioContext || (window as any).webkitAudioContext;
        if (!AC) return;
        if (!audioContextRef.current) audioContextRef.current = new AC();
        if (audioContextRef.current.state === 'suspended') await audioContextRef.current.resume();
        const ctx = audioContextRef.current;
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sine';
        o.frequency.value = 880;
        g.gain.value = 0.0001;
        o.connect(g);
        g.connect(ctx.destination);
        const now = ctx.currentTime;
        g.gain.exponentialRampToValueAtTime(0.05, now + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
        o.start(now);
        o.stop(now + 0.2);
      } catch {}
    };

    const tryPlay = (el: HTMLAudioElement | null) => new Promise<void>((resolve, reject) => {
      if (!el) return reject();
      el.play().then(() => resolve()).catch(() => reject());
    });

    tryPlay(audioRef.current)
      .catch(() => tryPlay(altAudioRef.current))
      .catch(() => fallbackBeep());
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
      const headers: any = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      if (token === 'google-auth-token') {
        const userDataStr = localStorage.getItem('user');
        if (userDataStr) {
          headers['x-user-data'] = encodeURIComponent(userDataStr);
        }
      }
      const response = await fetch(`${SERVER_URL}/api/chat/user/messages`, { headers });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (data.success && Array.isArray(data.messages)) {
        const uniqueMessages = data.messages.filter((msg: any, index: number, self: any[]) => index === self.findIndex((m: any) => m._id === msg._id));
        setMessages(uniqueMessages);
      } else {
        setMessages([]);
      }
    } catch (error) {
      setMessages([]);
    } finally {
      setIsLoading(false);
    }
  }, [SERVER_URL, token]);

  // Background socket connection even when modal is closed
  useEffect(() => {
    if (!token) return;

    const socketOptions: any = { transports: ['websocket', 'polling'] };
    if (token === 'google-auth-token') {
      const userDataStr = localStorage.getItem('user');
      if (userDataStr) {
        try {
          const userData = JSON.parse(userDataStr);
          socketOptions.auth = { token: 'google-auth-token', userData };
        } catch {
          socketOptions.auth = { token };
        }
      } else {
        socketOptions.auth = { token };
      }
    } else {
      socketOptions.auth = { token };
    }

    const newSocket = io(SERVER_URL, socketOptions);

    newSocket.on('connect', () => {
      setIsConnected(true);
    });

    newSocket.on('connect_error', (err: any) => {
      console.error('Socket connect_error:', err?.message || err);
      setIsConnected(false);
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    // Receive message from admin (works even if chat modal is closed)
    newSocket.off('newMessageFromAdmin');
    newSocket.on('newMessageFromAdmin', (message: Message) => {
      setMessages(prev => (prev.some(m => m._id === message._id) ? prev : [...prev, message]));
      playNotificationSound();
      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
      }
    });

    // Sent confirmation
    newSocket.off('messageSent');
    newSocket.on('messageSent', (message: Message) => {
      setMessages(prev => (prev.some(m => m._id === message._id) ? prev : [...prev, message]));
    });

    // Typing indicator
    newSocket.off('adminTyping');
    newSocket.on('adminTyping', (data: { typing: boolean }) => {
      setIsTyping(data.typing);
    });

    setSocket(newSocket);
    return () => {
      newSocket.close();
      setSocket(null);
      setIsConnected(false);
    };
  }, [token, SERVER_URL, playNotificationSound, isOpen]);

  // Load messages when socket connects OR when modal opens
  useEffect(() => {
    if (isConnected && token && isOpen) {
      loadMessageHistory();
    }
  }, [isConnected, token, isOpen, loadMessageHistory]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Normalize IDs to handle different shapes from API/live
  const getNormalizedId = (val: any): string => {
    if (!val) return '';
    if (typeof val === 'string' || typeof val === 'number') return String(val);
    return String(val._id || val.id || val.userId || '');
  };

  const getMessageSenderId = (m: any): string => {
    if (!m) return '';
    const s = (m as any).sender;
    if (!s) return getNormalizedId((m as any).senderId || (m as any).userId);
    return getNormalizedId(s);
  };

  const getCurrentUserId = (): string => {
    return getNormalizedId((currentUser as any)?.id || (currentUser as any)?._id || (currentUser as any)?.userId);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket) {
      
      return;
    }

    const messageToSend = newMessage.trim();
    
    
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
              const senderId = getMessageSenderId(message);
              const myId = getCurrentUserId();
              const senderEmail = (typeof (message as any).sender === 'object' ? ((message as any).sender?.email || '') : '').toLowerCase();
              const myEmail = (currentUser?.email || '').toLowerCase();
              const isUserMessage = (!!senderId && !!myId && senderId === myId) || (!!senderEmail && !!myEmail && senderEmail === myEmail);

              const senderName = (typeof (message as any).sender === 'object' && (message as any).sender?.name) || 'Support';
              const senderAvatar = (typeof (message as any).sender === 'object' && (message as any).sender?.avatar) || '';
              return (
                <div
                  key={message._id}
                  className={`flex gap-3 ${isUserMessage ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  {/* Admin Avatar - Left Side */}
                  {!isUserMessage && (
                    <div className="flex-shrink-0">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg border-2 border-white">
                        {senderAvatar ? (
                          <img src={senderAvatar} alt={senderName} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          (senderName || '?').charAt(0).toUpperCase()
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
                          {senderName}
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