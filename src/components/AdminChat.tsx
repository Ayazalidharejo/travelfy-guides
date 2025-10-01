import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import './AdminChat.css';

const AdminChat = ({ token, currentUser }) => {
  const [socket, setSocket] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState({});
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SERVER_URL, {
      auth: {
        token: token
      }
    });

    newSocket.on('connect', () => {
      console.log('Admin connected to chat server');
    });

    newSocket.on('onlineUsers', (users) => {
      setOnlineUsers(users);
    });

    newSocket.on('newMessageFromUser', (data) => {
      const { message, user } = data;
      
      // Update conversations list
      setConversations(prev => {
        const filtered = prev.filter(conv => conv._id._id !== user._id);
        return [{ _id: { _id: user._id, ...user }, lastMessage: message, unreadCount: 1 }, ...filtered];
      });

      // If this user is selected, add message to current chat
      if (selectedUser && selectedUser._id === user._id) {
        setMessages(prev => [...prev, message]);
        // Mark as read
        socket.emit('markMessagesAsRead', { senderId: user._id });
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

    // Load conversations
    loadConversations();

    return () => newSocket.close();
  }, [token]);

  useEffect(() => {
    if (selectedUser && socket) {
      loadUserMessages(selectedUser._id);
      // Mark messages as read when selecting user
      socket.emit('markMessagesAsRead', { senderId: selectedUser._id });
    }
  }, [selectedUser, socket]);

  const loadConversations = async () => {
    try {
      const response = await fetch('/api/messages/admin/conversations', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setConversations(data.conversations);
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  };

  const loadUserMessages = async (userId) => {
    try {
      const response = await fetch(`/api/messages/admin/conversation/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error('Error loading user messages:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
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

  const isUserOnline = (userId) => {
    return onlineUsers.some(user => user.userId === userId);
  };

  return (
    <div className="admin-chat-container">
      <div className="conversations-sidebar">
        <div className="sidebar-header">
          <h3>Conversations</h3>
          <span className="online-count">{onlineUsers.length} online</span>
        </div>
        <div className="conversations-list">
          {conversations.map((conversation) => (
            <div
              key={conversation._id._id}
              className={`conversation-item ${selectedUser?._id === conversation._id._id ? 'active' : ''}`}
              onClick={() => setSelectedUser(conversation._id)}
            >
              <div className="user-avatar">
                <img 
                  src={conversation._id.avatar || '/default-avatar.png'} 
                  alt={conversation._id.name}
                />
                <span className={`online-status ${isUserOnline(conversation._id._id) ? 'online' : 'offline'}`} />
              </div>
              <div className="user-info">
                <h4>{conversation._id.name}</h4>
                <p className="last-message">
                  {conversation.lastMessage?.message?.substring(0, 30)}...
                </p>
              </div>
              <div className="conversation-meta">
                <span className="message-time">
                  {conversation.lastMessage && 
                    new Date(conversation.lastMessage.createdAt).toLocaleDateString()
                  }
                </span>
                {conversation.unreadCount > 0 && (
                  <span className="unread-badge">{conversation.unreadCount}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-area">
        {selectedUser ? (
          <>
            <div className="chat-header">
              <div className="user-info">
                <div className="user-avatar">
                  <img 
                    src={selectedUser.avatar || '/default-avatar.png'} 
                    alt={selectedUser.name}
                  />
                  <span className={`online-status ${isUserOnline(selectedUser._id) ? 'online' : 'offline'}`} />
                </div>
                <div>
                  <h3>{selectedUser.name}</h3>
                  <span className="user-email">{selectedUser.email}</span>
                </div>
              </div>
              <div className="chat-actions">
                <button className="btn btn-secondary">User Info</button>
              </div>
            </div>

            <div className="messages-container">
              {messages.map((message) => (
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
              ))}
              {typingUsers[selectedUser._id] && (
                <div className="typing-indicator">
                  <span>{selectedUser.name} is typing...</span>
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
                  placeholder="Type your message..."
                />
                <button type="submit" disabled={!newMessage.trim()}>
                  Send
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="no-chat-selected">
            <h3>Select a conversation to start chatting</h3>
            <p>Choose from the list on the left to view messages</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChat;