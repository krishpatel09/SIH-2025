"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Globe, MapPin, Calendar } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  suggestions?: string[];
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "नमस्कार! Welcome to Jharkhand Tourism AI Assistant! 🌟 I can help you in Hindi, English, and local tribal languages. How can I assist you today?",
    isBot: true,
    timestamp: new Date(),
    suggestions: [
      "Plan a 3-day itinerary",
      "Best time to visit Netarhat",
      "Tribal culture experiences",
      "Accommodation options"
    ]
  }
];

// Dynamic quick responses will be loaded from API
const getQuickResponses = async () => {
  try {
    // This would be replaced with actual API calls to get dynamic data
    return {
      "Plan a 3-day itinerary": {
        text: "I'd love to help you plan a perfect 3-day Jharkhand adventure! 🗺️\n\nI'll create a personalized itinerary based on your preferences, current weather, and available attractions. Let me know your interests and I'll suggest the best destinations and activities!",
        suggestions: ["Tell me about popular destinations", "Accommodation options", "Local food recommendations", "Transportation details"]
      },
      "Best time to visit": {
        text: "🌤️ The best time to visit Jharkhand depends on your preferences!\n\nI can provide real-time weather information and seasonal recommendations for any destination you're interested in. What specific place would you like to know about?",
        suggestions: ["Weather for Netarhat", "Seasonal activities", "Festival calendar", "Photography timing"]
      },
      "Tribal culture experiences": {
        text: "🎭 Immerse yourself in Jharkhand's rich tribal heritage!\n\nI can connect you with authentic cultural experiences, homestays, and local communities. Let me know what aspects of tribal culture interest you most!",
        suggestions: ["Homestay options", "Festival calendar", "Handicraft workshops", "Cultural tours"]
      },
      "Accommodation options": {
        text: "🏨 Jharkhand offers diverse accommodation options!\n\nFrom luxury hotels to tribal homestays, I can help you find the perfect place to stay based on your budget, location preferences, and travel style.",
        suggestions: ["Luxury hotels", "Budget options", "Eco-resorts", "Tribal homestays"]
      }
    };
  } catch (error) {
    console.error('Error loading quick responses:', error);
    return {};
  }
};

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "sa", name: "संथाली", flag: "🏛️" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    try {
      // Try to get dynamic response from quick responses first
      const quickResponses = await getQuickResponses();
      const response = quickResponses[text as keyof typeof quickResponses] || {
        text: `Thank you for your question: "${text}". Our AI is processing your request and will provide personalized recommendations based on your preferences, current weather, and local events. 🤖\n\nIn the meantime, would you like to explore our popular destinations or cultural experiences?`,
        suggestions: ["Popular destinations", "Cultural experiences", "Plan custom trip", "Contact human agent"]
      };

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        isBot: true,
        timestamp: new Date(),
        suggestions: response.suggestions
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm having trouble processing your request right now. Please try again or contact our support team.",
        isBot: true,
        timestamp: new Date(),
        suggestions: ["Try again", "Contact support", "Browse destinations", "View cultural experiences"]
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 ${
          isOpen ? "scale-0" : "scale-100"
        }`}
      >
        <MessageCircle className="w-6 h-6" />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-xs font-bold">AI</span>
        </div>
      </button>

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold">Jharkhand AI Guide</h3>
                <p className="text-xs opacity-90">Online • Multilingual</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/* Language Selector */}
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-white/20 text-white text-xs rounded px-2 py-1 border-0 outline-none"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code} className="text-gray-800">
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    message.isBot
                      ? "bg-white shadow-md border border-gray-200"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.isBot && (
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className={`text-sm whitespace-pre-line ${message.isBot ? "text-gray-800" : "text-white"}`}>
                        {message.text}
                      </p>
                      <p className={`text-xs mt-1 ${message.isBot ? "text-gray-500" : "text-white/70"}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>

                  {/* Suggestions */}
                  {message.suggestions && (
                    <div className="mt-3 space-y-2">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="block w-full text-left text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-lg transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white shadow-md border border-gray-200 rounded-2xl p-3 flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-blue-600" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputText)}
                placeholder="Ask about destinations, culture, planning..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={() => handleSendMessage(inputText)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-full hover:shadow-lg transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-center mt-2 space-x-4 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Globe className="w-3 h-3" />
                <span>Multilingual</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>Location-aware</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>Real-time</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
