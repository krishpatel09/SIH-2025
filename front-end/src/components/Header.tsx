"use client";

import { useState } from "react";
import { Menu, X, MapPin, ChevronDown, Shield } from "lucide-react";
import { AuthButton } from "./auth/AuthButton";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCultureDropdownOpen, setIsCultureDropdownOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-400 rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Jharkhand Tourism</h1>
              <p className="text-xs text-gray-600">Discover. Explore. Experience.</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
              Home
            </a>
            <a href="#destinations" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
              Destinations
            </a>
            
            {/* Culture Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsCultureDropdownOpen(true)}
              onMouseLeave={() => setIsCultureDropdownOpen(false)}
            >
              <button className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors font-medium">
                <span>Culture</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isCultureDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  <a href="#culture" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600">
                    Overview
                  </a>
                  <Link href="/cultural" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600">
                    Browse All Elements
                  </Link>
                  <a href="#culture" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600">
                    Tribal Communities
                  </a>
                  <a href="#culture" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600">
                    Traditional Arts
                  </a>
                  <a href="#culture" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600">
                    Festivals
                  </a>
                </div>
              )}
            </div>
            
            <Link href="/maps" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
              Interactive Map
            </Link>
            
            <a href="#features" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
              Features
            </a>
            <a href="#contact" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
              Contact
            </a>
            <Link href="/plan-trip" className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors">
              Plan Trip
            </Link>
            
            {/* Admin Dashboard Link - Only visible to admin users */}
            {user?.role === 'admin' && (
              <Link 
                href="/admin" 
                className="flex items-center space-x-1 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors"
              >
                <Shield className="w-4 h-4" />
                <span>Admin</span>
              </Link>
            )}
            
            {/* Authentication Button */}
            <AuthButton />
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3 pt-4">
              <a href="#home" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
                Home
              </a>
              <a href="#destinations" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
                Destinations
              </a>
              
              {/* Mobile Culture Section */}
              <div className="space-y-2">
                <a href="#culture" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
                  Culture Overview
                </a>
                <div className="pl-4 space-y-2">
                  <Link href="/cultural" className="block text-sm text-gray-600 hover:text-green-600 transition-colors">
                    Browse All Elements
                  </Link>
                  <a href="#culture" className="block text-sm text-gray-600 hover:text-green-600 transition-colors">
                    Tribal Communities
                  </a>
                  <a href="#culture" className="block text-sm text-gray-600 hover:text-green-600 transition-colors">
                    Traditional Arts
                  </a>
                </div>
              </div>
              
              <Link href="/maps" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
                Interactive Map
              </Link>
              
              <a href="#features" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
                Features
              </a>
              <a href="#contact" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
                Contact
              </a>
              <Link href="/plan-trip" className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors w-fit">
                Plan Trip
              </Link>
              
              {/* Mobile Admin Dashboard Link - Only visible to admin users */}
              {user?.role === 'admin' && (
                <Link 
                  href="/admin" 
                  className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors w-fit"
                >
                  <Shield className="w-4 h-4" />
                  <span>Admin Dashboard</span>
                </Link>
              )}
              
              {/* Mobile Authentication */}
              <div className="pt-4 border-t border-gray-200">
                <AuthButton />  
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
