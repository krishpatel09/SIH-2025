'use client';

import React, { useState } from 'react';
import { Shield, FileText, Users, Award, Globe, Heart, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export const AboutLegal: React.FC = () => {
  const [activeSection, setActiveSection] = useState('about');

  const sections = [
    { id: 'about', label: 'About Us', icon: Users },
    { id: 'mission', label: 'Our Mission', icon: Heart },
    { id: 'team', label: 'Our Team', icon: Award },
    { id: 'terms', label: 'Terms of Service', icon: FileText },
    { id: 'privacy', label: 'Privacy Policy', icon: Shield },
    { id: 'contact', label: 'Contact Info', icon: Mail }
  ];

  const teamMembers = [
    {
      name: 'Dr. Rajesh Kumar',
      position: 'Director of Tourism',
      image: '/api/placeholder/150/150',
      description: 'Leading Jharkhand&apos;s tourism initiatives with 15+ years of experience'
    },
    {
      name: 'Priya Sharma',
      position: 'Head of Digital Innovation',
      image: '/api/placeholder/150/150',
      description: 'Driving technology adoption in tourism sector'
    },
    {
      name: 'Amit Singh',
      position: 'Cultural Heritage Specialist',
      image: '/api/placeholder/150/150',
      description: 'Expert in tribal culture and heritage preservation'
    }
  ];

  const renderAboutUs = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Jharkhand Tourism</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Jharkhand Tourism is your gateway to discovering the rich cultural heritage, 
          breathtaking landscapes, and vibrant tribal communities of India&apos;s mineral-rich state. 
          We are committed to promoting sustainable tourism while preserving the unique identity 
          and traditions of our beautiful state.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">24 Districts</h3>
            <p className="text-sm text-gray-600">Covering diverse landscapes and cultures</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">32+ Tribes</h3>
            <p className="text-sm text-gray-600">Rich tribal heritage and traditions</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">50+ Destinations</h3>
            <p className="text-sm text-gray-600">From waterfalls to wildlife sanctuaries</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Vision</h3>
          <p className="text-gray-700 leading-relaxed">
            To position Jharkhand as a premier sustainable tourism destination that celebrates 
            its natural beauty, cultural diversity, and tribal heritage while contributing to 
            the economic development of local communities.
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Values</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center">
              <Heart className="w-4 h-4 text-red-500 mr-2" />
              Respect for tribal culture and traditions
            </li>
            <li className="flex items-center">
              <Shield className="w-4 h-4 text-blue-500 mr-2" />
              Environmental sustainability
            </li>
            <li className="flex items-center">
              <Users className="w-4 h-4 text-green-500 mr-2" />
              Community empowerment
            </li>
            <li className="flex items-center">
              <Award className="w-4 h-4 text-purple-500 mr-2" />
              Excellence in service
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderMission = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Preserve & Promote</h3>
              <p className="text-gray-700">
                Preserve the rich cultural heritage and natural beauty of Jharkhand while 
                promoting it as a world-class tourism destination.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Empower Communities</h3>
              <p className="text-gray-700">
                Create sustainable livelihood opportunities for local communities through 
                responsible tourism practices.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Globe className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sustainable Growth</h3>
              <p className="text-gray-700">
                Foster environmentally sustainable tourism that benefits both visitors and 
                the local ecosystem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTeam = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
        <p className="text-gray-600">The passionate individuals behind Jharkhand Tourism</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{member.name}</h3>
            <p className="text-indigo-600 font-medium mb-3">{member.position}</p>
            <p className="text-gray-600 text-sm">{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTerms = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Terms of Service</h2>
        <div className="space-y-6 text-gray-700">
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h3>
            <p>By accessing and using Jharkhand Tourism services, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Use License</h3>
            <p>Permission is granted to temporarily download one copy of the materials on Jharkhand Tourism&apos;s website for personal, non-commercial transitory viewing only.</p>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Booking and Cancellation</h3>
            <p>All bookings are subject to availability. Cancellation policies vary by service provider and are clearly stated during the booking process.</p>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">4. User Responsibilities</h3>
            <p>Users are responsible for providing accurate information and complying with all applicable laws and regulations during their use of our services.</p>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">5. Limitation of Liability</h3>
            <p>Jharkhand Tourism shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.</p>
          </section>
        </div>
      </div>
    </div>
  );

  const renderPrivacy = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy Policy</h2>
        <div className="space-y-6 text-gray-700">
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Information We Collect</h3>
            <p>We collect information you provide directly to us, such as when you create an account, make a booking, or contact us for support.</p>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">How We Use Your Information</h3>
            <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Information Sharing</h3>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Security</h3>
            <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Rights</h3>
            <p>You have the right to access, update, or delete your personal information. You may also opt out of certain communications from us.</p>
          </section>
        </div>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-indigo-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Office Address</h3>
                <p className="text-gray-600">
                  Jharkhand Tourism Development Corporation<br />
                  Tourism Complex, Near Raj Bhavan<br />
                  Ranchi, Jharkhand - 834001
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 text-indigo-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Phone</h3>
                <p className="text-gray-600">+91 651 220 0000</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-indigo-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Email</h3>
                <p className="text-gray-600">info@jharkhandtourism.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Links</h3>
          <div className="space-y-3">
            <a href="#" className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
              <ExternalLink className="w-4 h-4 mr-2" />
              Official Website
            </a>
            <a href="#" className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
              <ExternalLink className="w-4 h-4 mr-2" />
              Social Media
            </a>
            <a href="#" className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
              <ExternalLink className="w-4 h-4 mr-2" />
              Download App
            </a>
            <a href="#" className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
              <ExternalLink className="w-4 h-4 mr-2" />
              Newsletter
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return renderAboutUs();
      case 'mission':
        return renderMission();
      case 'team':
        return renderTeam();
      case 'terms':
        return renderTerms();
      case 'privacy':
        return renderPrivacy();
      case 'contact':
        return renderContact();
      default:
        return renderAboutUs();
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">About & Legal</h1>
        <p className="text-gray-600">Learn more about Jharkhand Tourism and our policies</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8">
        <div className="p-2">
          <nav className="flex space-x-1 overflow-x-auto">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    activeSection === section.id
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{section.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
};
