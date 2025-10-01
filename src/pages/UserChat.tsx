import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
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
  const [socket, setSocket] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ✅ FIX: Vite compatible environment variable
  const SERVER_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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

    const newSocket = io(SERVER_URL, {
      auth: {
        token: token
      },
      transports: ['websocket', 'polling']
    });

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
      console.log('📨 Received message from admin:', message);
      setMessages(prev => [...prev, message]);
    });

    newSocket.on('messageSent', (message: Message) => {
      console.log('📤 Message sent confirmation:', message);
      setMessages(prev => [...prev, message]);
    });

    newSocket.on('adminTyping', (data: { typing: boolean }) => {
      console.log('⌨️ Admin typing:', data);
      setIsTyping(data.typing);
    });

    newSocket.on('error', (error: any) => {
      console.error('🚨 Socket error:', error);
    });

    setSocket(newSocket);

    // Load message history
    loadMessageHistory();

    return () => {
      console.log('🧹 Cleaning up socket connection');
      if (newSocket) {
        newSocket.close();
      }
      setSocket(null);
      setIsConnected(false);
    };
  }, [isOpen, token, SERVER_URL]);

  const loadMessageHistory = async () => {
    try {
      setIsLoading(true);
      console.log('📡 Loading message history from:', `${SERVER_URL}/api/chat/user/messages`);
      
      const response = await fetch(`${SERVER_URL}/api/chat/user/messages`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📨 Loaded messages response:', data);
      
      if (data.success) {
        setMessages(data.messages || []);
      } else {
        console.error('❌ Failed to load messages:', data);
      }
    } catch (error) {
      console.error('🚨 Error loading messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

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

    console.log('📤 Sending message to admin:', newMessage);
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

  if (!isOpen) {
    return null;
  }

  return (
    <div className="user-chat-container">
      <div className="chat-header">
        <h3>Customer Support</h3>
        <div className="header-actions">
          <div className="connection-status">
            <span className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
              {isConnected ? '🟢 Online' : '🔴 Offline'}
            </span>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
      </div>

      <div className="messages-container">
        {isLoading ? (
          <div className="loading-messages">
            <p>Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="no-messages">
            <p>No messages yet. Start a conversation with our support team!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message._id}
              className={`message ${message.sender._id === currentUser.id ? 'sent' : 'received'}`}
            >
              <div className="message-content">
                <p>{message.message}</p>
                <span className="message-time">
                  {new Date(message.createdAt).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))
        )}
        {isTyping && (
          <div className="typing-indicator">
            <span>Support is typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="message-form">
        <div className="input-group">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onFocus={handleTypingStart}
            onBlur={handleTypingStop}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage(e);
              }
            }}
            placeholder={isConnected ? "Type your message..." : "Connecting to server..."}
            disabled={!isConnected}
          />
          <button 
            type="submit" 
            disabled={!isConnected || !newMessage.trim()}
            className={!isConnected ? 'disabled' : ''}
          >
            {isConnected ? 'Send' : 'Offline'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserChat;