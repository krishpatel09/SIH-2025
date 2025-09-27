"use client";

import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-400 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Jharkhand Tourism</h3>
                <p className="text-sm text-gray-400">Discover. Explore. Experience.</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your gateway to Jharkhand&apos;s natural beauty, rich tribal culture, and unforgettable experiences. 
              Powered by AI and blockchain technology for secure, personalized tourism.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#destinations" className="text-gray-300 hover:text-green-400 transition-colors">Destinations</a></li>
              <li><a href="#culture" className="text-gray-300 hover:text-green-400 transition-colors">Culture & Heritage</a></li>
              <li><a href="#features" className="text-gray-300 hover:text-green-400 transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Plan Your Trip</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Homestays</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Local Marketplace</a></li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h4 className="text-lg font-bold mb-6">Popular Destinations</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Netarhat</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Betla National Park</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Hundru Falls</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Deoghar</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Patratu Valley</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Ranchi</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-green-400 mt-1" />
                <div>
                  <p className="text-gray-300 text-sm">Jharkhand Tourism Development Corporation</p>
                  <p className="text-gray-300 text-sm">Ranchi, Jharkhand 834001</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-400" />
                <p className="text-gray-300 text-sm">+91 651 2446-789</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-400" />
                <p className="text-gray-300 text-sm">info@jharkhnadtourism.gov.in</p>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h5 className="font-bold mb-3">Stay Updated</h5>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-400"
                />
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2024 Jharkhand Tourism Platform. All rights reserved. | Powered by AI & Blockchain Technology
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Accessibility</a>
            </div>
          </div>
        </div>

        {/* Government Links */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-4">An Initiative of Government of Jharkhand</p>
            <div className="flex flex-wrap justify-center space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Ministry of Tourism</a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Incredible India</a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Digital India</a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Make in India</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
