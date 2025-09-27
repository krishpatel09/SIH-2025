'use client';

import React from 'react';
import Chatbot from './Chatbot';

const ChatbotPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Tourism Assistant
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get instant help with your Jharkhand travel questions. Ask about destinations, 
            culture, attractions, weather, transportation, and more!
          </p>
        </div>

        {/* Chat Interface */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-96 lg:h-[600px]">
            <Chatbot className="h-full" />
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white rounded-lg shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Responses</h3>
            <p className="text-gray-600">
              Get immediate answers to your tourism questions powered by advanced AI technology.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Comprehensive Knowledge</h3>
            <p className="text-gray-600">
              Access detailed information about destinations, culture, and local attractions.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Available</h3>
            <p className="text-gray-600">
              Get help anytime, anywhere. Our AI assistant is always ready to assist you.
            </p>
          </div>
        </div>

        {/* Sample Questions */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Try asking these questions:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "What are the best places to visit in Jharkhand?",
              "Tell me about the tribal culture and festivals",
              "What's the best time to visit Ranchi?",
              "How can I reach Betla National Park?",
              "What local dishes should I try?",
              "Are there any adventure activities available?",
              "What are the accommodation options in Jamshedpur?",
              "Tell me about the waterfalls in Jharkhand"
            ].map((question, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer border-l-4 border-blue-500"
              >
                <p className="text-gray-700">{question}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
