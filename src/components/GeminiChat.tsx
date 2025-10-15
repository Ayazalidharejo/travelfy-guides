import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';

interface Message {
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

interface GeminiChatProps {
  onClose?: () => void;
}

const GeminiChat: React.FC<GeminiChatProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5200';

  // Auto scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load conversation history on mount
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/gemini/history/${sessionId}`, {
        timeout: 5000 // 5 seconds timeout
      });
      if (response.data.success && response.data.history.length > 0) {
        setMessages(response.data.history.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })));
      } else {
        // Send welcome message
        setMessages([{
          role: 'model',
          content: 'Hello! Welcome to Karvaan Tour. I\'m your AI travel assistant. How can I help you plan your perfect trip today? 🌍✨',
          timestamp: new Date()
        }]);
      }
    } catch (error: any) {
      console.error('Failed to load history:', error);
      
      // Check if it's a network/connection error
      if (error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED') {
        setMessages([{
          role: 'model',
          content: '⚠️ Backend server is not running. Please start the backend server on port 5200 first.\n\nTo start:\n1. Open terminal\n2. Navigate to: new-back folder\n3. Run: npm start',
          timestamp: new Date()
        }]);
      } else {
        // Send welcome message on other errors
        setMessages([{
          role: 'model',
          content: 'Hello! Welcome to Karvaan Tour. I\'m your AI travel assistant. How can I help you plan your perfect trip today? 🌍✨',
          timestamp: new Date()
        }]);
      }
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/gemini/chat`, {
        message: userMessage.content,
        sessionId: sessionId
      }, {
        timeout: 30000 // 30 seconds timeout for AI response
      });

      if (response.data.success) {
        const aiMessage: Message = {
          role: 'model',
          content: response.data.response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error: any) {
      console.error('Error sending message:', error);
      
      let errorContent = 'Sorry, I encountered an error. Please try again or contact our support team for assistance.';
      
      // Provide specific error messages
      if (error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED') {
        errorContent = '⚠️ Cannot connect to server. Please ensure the backend server is running on port 5200.\n\nTo start backend:\n1. Open terminal\n2. cd new-back\n3. npm start';
      } else if (error.code === 'ECONNABORTED') {
        errorContent = '⏱️ Request timeout. The AI is taking too long to respond. Please try again with a shorter message.';
      } else if (error.response?.data?.message) {
        // Use the specific error message from backend
        errorContent = error.response.data.message;
        
        // Add help link if provided
        if (error.response.data.helpUrl) {
          errorContent += `\n\n📌 Get your API key here:\n${error.response.data.helpUrl}`;
        }
      } else if (error.response?.status === 500) {
        errorContent = '🤖 AI service error. There might be an issue with the Gemini API. Please check your API key and try again.';
      } else if (error.response?.status === 401) {
        errorContent = '🔑 Invalid API Key. Please update your Gemini API key in the backend .env file.\n\nGet a new key from: https://aistudio.google.com/app/apikey';
      } else if (error.response?.status === 429) {
        errorContent = '⏱️ API quota exceeded. Please wait and try again later.';
      }
      
      const errorMessage: Message = {
        role: 'model',
        content: errorContent,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/gemini/clear-history`, {
        sessionId: sessionId
      });
      
      setMessages([{
        role: 'model',
        content: 'Conversation cleared! How can I help you today?',
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Failed to clear history:', error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-3 border-b bg-gradient-to-r from-green-50 to-green-100">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-green-700 flex items-center justify-center">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">AI Travel Assistant</h3>
            <p className="text-xs text-gray-600">Powered by Gemini AI</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearHistory}
          className="text-gray-600 hover:text-red-600"
          title="Clear conversation"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages Container */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{ maxHeight: 'calc(500px - 140px)' }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.role === 'user' 
                ? 'bg-blue-600' 
                : 'bg-gradient-to-r from-green-600 to-green-700'
            }`}>
              {message.role === 'user' ? (
                <User className="h-5 w-5 text-white" />
              ) : (
                <Bot className="h-5 w-5 text-white" />
              )}
            </div>

            {/* Message Bubble */}
            <div className={`flex-1 ${message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-sm'
                    : 'bg-gray-100 text-gray-900 rounded-tl-sm'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-600 to-green-700 flex items-center justify-center flex-shrink-0">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
              <Loader2 className="h-5 w-5 text-gray-600 animate-spin" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-3 border-t bg-gray-50">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </form>
        <p className="text-xs text-gray-500 mt-2 text-center">
          AI-powered assistance for your travel needs
        </p>
      </div>
    </div>
  );
};

export default GeminiChat;
