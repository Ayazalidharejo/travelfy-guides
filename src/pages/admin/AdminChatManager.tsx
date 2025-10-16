import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { MessageCircle, Send, User, Mail, Phone, MapPin, X, Bell } from 'lucide-react';
import './AdminChat.css';

interface Message {
  _id: string;
  sender: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    phone?: string;
  };
  message: string;
  createdAt: string;
  isRead?: boolean;
}

interface UserConversation {
  userId: string;
  userName: string;
  userEmail: string;
  userPhone?: string;
  userAvatar?: string;
  lastMessage: string;
  unreadCount: number;
  lastMessageTime: string;
}

const AdminChatManager: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [conversations, setConversations] = useState<UserConversation[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [totalUnread, setTotalUnread] = useState(0);
  const [notification, setNotification] = useState<{ show: boolean; message: string; user: string }>({
    show: false,
    message: '',
    user: ''
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const { token, user: adminUser } = useAuth();
  const SERVER_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Initialize audio notification
  useEffect(() => {
    audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIF2m98OWcTgwOUKzn8rdmIAU6kdrzy3ksB');
  }, []);

  useEffect(() => {
    if (!token) return;

    console.log('🔐 Admin connecting to socket:', SERVER_URL);

    const newSocket = io(SERVER_URL, {
      auth: { token },
      transports: ['websocket', 'polling']
    });

    newSocket.on('connect', () => {
      console.log('✅ Admin socket connected');
      setIsConnected(true);
      newSocket.emit('adminOnline'); // Notify server admin is online
      loadConversations();
    });

    newSocket.on('disconnect', () => {
      console.log('❌ Admin socket disconnected');
      setIsConnected(false);
    });

    // Listen for new messages from users
    newSocket.on('newMessageFromUser', (data: { message: Message; userId: string }) => {
      console.log('📨 New message from user:', data);
      
      // Play notification sound
      audioRef.current?.play();
      
      // Show notification
      setNotification({
        show: true,
        message: data.message.message,
        user: data.message.sender.name
      });

      // Auto-hide notification after 5 seconds
      setTimeout(() => {
        setNotification({ show: false, message: '', user: '' });
      }, 5000);

      // Update messages if this user is selected
      if (selectedUser === data.userId) {
        setMessages(prev => [...prev, data.message]);
      }

      // Update conversations
      loadConversations();
      
      // Send email notification to admin
      sendAdminNotification(data.message, 'chat');
    });

    // Listen for booking notifications
    newSocket.on('newBookingNotification', (data: any) => {
      console.log('🎫 New booking notification:', data);
      
      // Play notification sound
      audioRef.current?.play();
      
      // Show notification
      setNotification({
        show: true,
        message: `New booking from ${data.userName}!`,
        user: data.userName
      });

      setTimeout(() => {
        setNotification({ show: false, message: '', user: '' });
      }, 5000);

      // Send notification
      sendAdminNotification(data, 'booking');
    });

    newSocket.on('userTyping', (data: { userId: string }) => {
      console.log('⌨️ User typing:', data);
      // You can add typing indicator logic here
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [token, SERVER_URL]);

  const loadConversations = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/chat/admin/conversations`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setConversations(data.conversations || []);
        
        // Calculate total unread
        const unread = data.conversations?.reduce((sum: number, conv: UserConversation) => 
          sum + (conv.unreadCount || 0), 0) || 0;
        setTotalUnread(unread);
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  };

  const loadMessages = async (userId: string) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/chat/admin/messages/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
        
        // Mark messages as read
        markAsRead(userId);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const markAsRead = async (userId: string) => {
    try {
      await fetch(`${SERVER_URL}/api/chat/admin/mark-read/${userId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      loadConversations();
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const sendAdminNotification = async (data: any, type: 'chat' | 'booking') => {
    try {
      await fetch(`${SERVER_URL}/api/notifications/admin`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data, type })
      });
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUser(userId);
    loadMessages(userId);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket || !selectedUser) return;

    console.log('📤 Admin sending message to user:', selectedUser);
    socket.emit('sendMessageToUser', {
      userId: selectedUser,
      message: newMessage.trim()
    });

    setNewMessage('');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const selectedConversation = conversations.find(c => c.userId === selectedUser);

  return (
    <div className="admin-chat-manager">
      {/* Notification Toast */}
      {notification.show && (
        <div className="notification-toast">
          <div className="notification-header">
            <Bell className="h-5 w-5" />
            <span className="font-semibold">{notification.user}</span>
            <button onClick={() => setNotification({ show: false, message: '', user: '' })}>
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="notification-message">{notification.message}</p>
        </div>
      )}

      <Card className="h-[600px] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Live Chat Management
            {totalUnread > 0 && (
              <Badge variant="destructive" className="ml-2">
                {totalUnread} unread
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className={`status-dot ${isConnected ? 'connected' : 'disconnected'}`} />
            <span className="text-sm text-muted-foreground">
              {isConnected ? 'Online' : 'Offline'}
            </span>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex overflow-hidden p-0">
          {/* Conversations List */}
          <div className="w-1/3 border-r overflow-y-auto">
            {conversations.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No conversations yet</p>
              </div>
            ) : (
              conversations.map((conv) => (
                <div
                  key={conv.userId}
                  onClick={() => handleSelectUser(conv.userId)}
                  className={`conversation-item ${selectedUser === conv.userId ? 'selected' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="conversation-avatar">
                      {conv.userAvatar ? (
                        <img src={conv.userAvatar} alt={conv.userName} />
                      ) : (
                        <User className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold truncate">{conv.userName}</h4>
                        {conv.unreadCount > 0 && (
                          <Badge variant="destructive" className="ml-2">
                            {conv.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{conv.userEmail}</p>
                      <p className="text-xs text-muted-foreground truncate mt-1">
                        {conv.lastMessage}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(conv.lastMessageTime).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedUser ? (
              <>
                {/* Chat Header */}
                <div className="chat-header-admin">
                  <div className="flex items-center gap-3">
                    <div className="conversation-avatar">
                      {selectedConversation?.userAvatar ? (
                        <img src={selectedConversation.userAvatar} alt={selectedConversation.userName} />
                      ) : (
                        <User className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedConversation?.userName}</h3>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {selectedConversation?.userEmail}
                        </span>
                        {selectedConversation?.userPhone && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {selectedConversation.userPhone}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="messages-container flex-1 overflow-y-auto p-4">
                  {messages.map((message) => (
                    <div
                      key={message._id}
                      className={`message ${
                        message.sender._id === adminUser?.id ? 'sent' : 'received'
                      }`}
                    >
                      <div className="message-content">
                        {message.sender._id !== adminUser?.id && (
                          <p className="text-xs font-semibold text-gray-600 mb-1">
                            {message.sender.name}
                          </p>
                        )}
                        <p>{message.message}</p>
                        <span className="message-time">
                          {new Date(message.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="message-form-admin">
                  <Input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    disabled={!isConnected}
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    disabled={!isConnected || !newMessage.trim()}
                    className="ml-2"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Select a conversation to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminChatManager;
