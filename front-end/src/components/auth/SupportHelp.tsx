'use client';

import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, HelpCircle, CheckCircle, AlertCircle, Search } from 'lucide-react';

export const SupportHelp: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqItems = [
    {
      id: 1,
      category: 'booking',
      question: 'How do I book a trip?',
      answer: 'You can book a trip by browsing our destinations, selecting your preferred dates, and following the booking process. Make sure you\'re logged in to complete the booking.',
      popular: true
    },
    {
      id: 2,
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, UPI, net banking, and digital wallets. All payments are processed securely through our payment partners.',
      popular: true
    },
    {
      id: 3,
      category: 'cancellation',
      question: 'Can I cancel my booking?',
      answer: 'Yes, you can cancel your booking up to 24 hours before your trip. Cancellation fees may apply depending on the timing and type of booking.',
      popular: false
    },
    {
      id: 4,
      category: 'refund',
      question: 'How long does it take to process refunds?',
      answer: 'Refunds are typically processed within 5-7 business days and will be credited to your original payment method.',
      popular: false
    },
    {
      id: 5,
      category: 'account',
      question: 'How do I update my profile information?',
      answer: 'You can update your profile information by going to the Profile section and clicking on the Settings tab. All changes are saved automatically.',
      popular: false
    },
    {
      id: 6,
      category: 'technical',
      question: 'I\'m having trouble logging in. What should I do?',
      answer: 'Try resetting your password using the "Forgot Password" link on the login page. If the issue persists, contact our support team.',
      popular: true
    }
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Call us for immediate assistance',
      contact: '+91 98765 43210',
      available: '24/7',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us an email and we\'ll respond within 24 hours',
      contact: 'support@jharkhandtourism.com',
      available: '24/7',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      contact: 'Available on website',
      available: '9 AM - 9 PM',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Topics', count: faqItems.length },
    { id: 'booking', label: 'Booking', count: faqItems.filter(item => item.category === 'booking').length },
    { id: 'payment', label: 'Payment', count: faqItems.filter(item => item.category === 'payment').length },
    { id: 'cancellation', label: 'Cancellation', count: faqItems.filter(item => item.category === 'cancellation').length },
    { id: 'account', label: 'Account', count: faqItems.filter(item => item.category === 'account').length },
    { id: 'technical', label: 'Technical', count: faqItems.filter(item => item.category === 'technical').length }
  ];

  const filteredFaqs = faqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Support & Help</h1>
        <p className="text-gray-600">Find answers to common questions or get in touch with our support team</p>
      </div>

      {/* Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {contactMethods.map((method, index) => {
          const Icon = method.icon;
          return (
            <div key={index} className={`${method.bgColor} rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300`}>
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-xl ${method.bgColor} border border-gray-200`}>
                  <Icon className={`w-6 h-6 ${method.iconColor}`} />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">{method.title}</h3>
                  <p className="text-sm text-gray-600">{method.available}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-3">{method.description}</p>
              <p className={`font-medium ${method.color}`}>{method.contact}</p>
            </div>
          );
        })}
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8 text-black">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for help topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="lg:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.label} ({category.count})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Frequently Asked Questions</h2>
          <p className="text-gray-600">Find quick answers to common questions</p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((item) => (
              <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-gray-900">{item.question}</h3>
                      {item.popular && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">Try adjusting your search terms or browse different categories</p>
            </div>
          )}
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="mt-8 bg-red-50 border border-red-200 rounded-2xl p-6">
        <div className="flex items-center mb-4">
          <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
          <h3 className="text-lg font-semibold text-red-900">Emergency Support</h3>
        </div>
        <p className="text-red-800 mb-4">
          For urgent travel-related emergencies, call our 24/7 emergency hotline:
        </p>
        <div className="flex items-center gap-4">
          <a 
            href="tel:+919876543210" 
            className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
          >
            +91 98765 43210
          </a>
          <span className="text-red-700 font-medium">Available 24/7</span>
        </div>
      </div>
    </div>
  );
};
