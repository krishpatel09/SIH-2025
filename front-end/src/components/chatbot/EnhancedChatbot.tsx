'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Trash2, Loader2, Globe, History } from 'lucide-react';
import { useToast } from '@/hooks/useToast';
import { useAuth } from '@/hooks/useAuth';
import axiosInstance from '@/services/axiosInstance';
import { API_PATHS } from '@/services/apiPath';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  relevantDocs?: Array<{
    type: string;
    title: string;
    content: string;
    id: string;
  }>;
}

type Language = 'en' | 'hi' | 'sat';

interface ChatbotProps {
  className?: string;
  onClose?: () => void;
}

const translations = {
  en: {
    welcome: "Hello! I'm your AI tourism assistant for Jharkhand. I can help you with information about destinations, culture, attractions, and travel planning. How can I assist you today?",
    placeholder: "Ask me about Jharkhand tourism...",
    thinking: "Thinking...",
    error: "I apologize, but I'm having trouble processing your request right now. Please try again.",
    clearChat: "Clear chat",
    closeChat: "Close chat",
    pressEnter: "Press Enter to send, Shift+Enter for new line",
    tourismAssistant: "Tourism Assistant",
    chatHistory: "Chat History",
    status: "Status",
    relevantInfo: "Relevant Information",
    noRelevantInfo: "No additional information available",
    retry: "Retry",
    sessionId: "Session ID",
    lastUpdated: "Last Updated"
  },
  hi: {
    welcome: "नमस्ते! मैं झारखंड के लिए आपका AI पर्यटन सहायक हूं। मैं आपको गंतव्यों, संस्कृति, आकर्षणों और यात्रा योजना के बारे में जानकारी देने में मदद कर सकता हूं। आज मैं आपकी कैसे सहायता कर सकता हूं?",
    placeholder: "झारखंड पर्यटन के बारे में मुझसे पूछें...",
    thinking: "सोच रहा हूं...",
    error: "मुझे खेद है, लेकिन मुझे आपके अनुरोध को संसाधित करने में कुछ समस्या हो रही है। कृपया पुनः प्रयास करें।",
    clearChat: "चैट साफ़ करें",
    closeChat: "चैट बंद करें",
    pressEnter: "भेजने के लिए Enter दबाएं, नई लाइन के लिए Shift+Enter",
    tourismAssistant: "पर्यटन सहायक",
    chatHistory: "चैट इतिहास",
    status: "स्थिति",
    relevantInfo: "संबंधित जानकारी",
    noRelevantInfo: "कोई अतिरिक्त जानकारी उपलब्ध नहीं",
    retry: "पुनः प्रयास करें",
    sessionId: "सत्र आईडी",
    lastUpdated: "अंतिम अपडेट"
  },
  sat: {
    welcome: "नमस्कार! मैं झारखंड के लिए आपका AI पर्यटन सहायक हूं। मैं आपको गंतव्यों, संस्कृति, आकर्षणों और यात्रा योजना के बारे में जानकारी देने में मदद कर सकता हूं। आज मैं आपकी कैसे सहायता कर सकता हूं?",
    placeholder: "झारखंड पर्यटन के बारे में मुझसे पूछें...",
    thinking: "सोच रहा हूं...",
    error: "मुझे खेद है, लेकिन मुझे आपके अनुरोध को संसाधित करने में कुछ समस्या हो रही है। कृपया पुनः प्रयास करें।",
    clearChat: "चैट साफ़ करें",
    closeChat: "चैट बंद करें",
    pressEnter: "भेजने के लिए Enter दबाएं, नई लाइन के लिए Shift+Enter",
    tourismAssistant: "पर्यटन सहायक",
    chatHistory: "चैट इतिहास",
    status: "स्थिति",
    relevantInfo: "संबंधित जानकारी",
    noRelevantInfo: "कोई अतिरिक्त जानकारी उपलब्ध नहीं",
    retry: "पुनः प्रयास करें",
    sessionId: "सत्र आईडी",
    lastUpdated: "अंतिम अपडेट"
  }
};

const EnhancedChatbot: React.FC<ChatbotProps> = ({ className = '', onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [chatbotStatus, setChatbotStatus] = useState<{
    isOnline: boolean;
    lastSeen: string;
    responseTime: number;
  } | null>(null);
  const [, setShowRelevantDocs] = useState<boolean>(false);
  const [retryCount, setRetryCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { showError, showSuccess } = useToast();
  const { user } = useAuth();

  const t = translations[language];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize with welcome message and check status
  useEffect(() => {
    const initializeChatbot = async () => {
      try {
        // Check chatbot status
        const statusResponse = await axiosInstance.get(API_PATHS.CHATBOT.GET_STATUS);
        setChatbotStatus(statusResponse.data.data);
        
        // Initialize chatbot
        await axiosInstance.post(API_PATHS.CHATBOT.INITIALIZE);
        
        // Add welcome message
        const welcomeMessage: Message = {
          id: 'welcome',
          role: 'assistant',
          content: t.welcome,
          timestamp: new Date().toISOString()
        };
        setMessages([welcomeMessage]);
        
        showSuccess('Chatbot initialized successfully!');
      } catch (error) {
        console.error('Error initializing chatbot:', error);
        showError('Failed to initialize chatbot. Some features may not work properly.');
        
        // Still add welcome message even if initialization fails
        const welcomeMessage: Message = {
          id: 'welcome',
          role: 'assistant',
          content: t.welcome,
          timestamp: new Date().toISOString()
        };
        setMessages([welcomeMessage]);
      }
    };

    initializeChatbot();
  }, [language, t.welcome, showSuccess, showError]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setRetryCount(0);

    try {
      console.log('Sending message to chatbot', {
        message: userMessage.content,
        sessionId,
        userId: user?.id,
        chatHistoryLength: messages.length
      });

      const response = await axiosInstance.post(API_PATHS.CHATBOT.SEND_MESSAGE, {
        message: userMessage.content,
        sessionId,
        userId: user?.id || null,
        chatHistory: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      });

      console.log('Response from chatbot:', response.data);

      if (response.data.success) {
        const assistantMessage: Message = {
          id: `assistant_${Date.now()}`,
          role: 'assistant',
          content: response.data.data.response,
          timestamp: response.data.data.timestamp,
          relevantDocs: response.data.data.relevantDocs || []
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        
        // Show relevant docs if available
        if (response.data.data.relevantDocs?.length > 0) {
          setShowRelevantDocs(true);
        }
        
        showSuccess('Message sent successfully!');
      } else {
        throw new Error(response.data.error || 'Failed to get response');
      }
    } catch (error: any) {
      console.error('Error sending message:', error);
      
      // Retry logic
      if (retryCount < 2) {
        setRetryCount(prev => prev + 1);
        showError(`Failed to send message. Retrying... (${retryCount + 1}/2)`);
        
        // Retry after a short delay
        setTimeout(() => {
          sendMessage();
        }, 1000);
        return;
      }
      
      showError('Failed to send message. Please try again.');
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        role: 'assistant',
        content: t.error,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = async () => {
    try {
      // Clear chat history on server
      await axiosInstance.delete(API_PATHS.CHATBOT.CLEAR_HISTORY(sessionId));
      
      // Clear local messages
      setMessages([]);
      setShowRelevantDocs(false);
      
      // Re-add welcome message
      const welcomeMessage: Message = {
        id: 'welcome',
        role: 'assistant',
        content: t.welcome,
        timestamp: new Date().toISOString()
      };
      setMessages([welcomeMessage]);
      
      showSuccess('Chat cleared successfully!');
    } catch (error) {
      console.error('Error clearing chat:', error);
      showError('Failed to clear chat history on server');
      
      // Still clear local messages
      setMessages([]);
      setShowRelevantDocs(false);
      const welcomeMessage: Message = {
        id: 'welcome',
        role: 'assistant',
        content: t.welcome,
        timestamp: new Date().toISOString()
      };
      setMessages([welcomeMessage]);
    }
  };

  const loadChatHistory = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.CHATBOT.GET_HISTORY(sessionId));
      
      if (response.data.success && response.data.data.messages) {
        const historyMessages: Message[] = response.data.data.messages.map((msg: any) => ({
          id: msg.id || `msg_${Date.now()}_${Math.random()}`,
          role: msg.role,
          content: msg.content,
          timestamp: msg.timestamp || new Date().toISOString()
        }));
        
        setMessages(historyMessages);
        showSuccess('Chat history loaded!');
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
      showError('Failed to load chat history');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`flex flex-col h-full bg-white rounded-lg shadow-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <div className="flex items-center space-x-2">
          <Bot className="w-6 h-6" />
          <h3 className="text-lg font-semibold">{t.tourismAssistant}</h3>
          {chatbotStatus && (
            <div className="flex items-center space-x-1 text-xs bg-white/20 px-2 py-1 rounded">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Active</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {/* Language Selector */}
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-white/20 text-white border border-white/30 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <option value="en" className="text-gray-800">English</option>
              <option value="hi" className="text-gray-800">हिन्दी</option>
              <option value="sat" className="text-gray-800">संथाली</option>
            </select>
            <Globe className="w-4 h-4 absolute right-1 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
          
          {/* History Button */}
          <button
            onClick={loadChatHistory}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            title={t.chatHistory}
          >
            <History className="w-4 h-4" />
          </button>
          
          {/* Clear Button */}
          <button
            onClick={clearChat}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            title={t.clearChat}
          >
            <Trash2 className="w-4 h-4" />
          </button>
          
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              title={t.closeChat}
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Session Info */}
      {chatbotStatus && (
        <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 text-xs text-gray-600">
          <div className="flex justify-between items-center">
            <span>{t.sessionId}: {sessionId.substring(0, 20)}...</span>
            <span>{t.lastUpdated}: {formatTimestamp(chatbotStatus.lastUpdated || new Date().toISOString())}</span>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.role === 'assistant' && (
                  <Bot className="w-4 h-4 mt-1 flex-shrink-0" />
                )}
                {message.role === 'user' && (
                  <User className="w-4 h-4 mt-1 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {formatTimestamp(message.timestamp)}
                  </p>
                  
                  {/* Relevant Documents */}
                  {message.relevantDocs && message.relevantDocs.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-gray-300">
                      <p className="text-xs font-medium text-gray-600 mb-1">
                        {t.relevantInfo}:
                      </p>
                      <div className="space-y-1">
                        {message.relevantDocs.slice(0, 3).map((doc, index) => (
                          <div key={index} className="text-xs bg-blue-50 p-2 rounded">
                            <p className="font-medium text-blue-800">{doc.title}</p>
                            <p className="text-blue-600">{doc.content.substring(0, 100)}...</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4" />
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">{t.thinking}</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex space-x-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t.placeholder}
            className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {t.pressEnter}
        </p>
      </div>
    </div>
  );
};

export default EnhancedChatbot;
