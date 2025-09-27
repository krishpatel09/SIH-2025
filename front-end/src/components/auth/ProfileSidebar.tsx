'use client';

import React from 'react';
import { User, History, Settings, ShoppingCart, Shield, LogOut, MessageCircle, BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface ProfileSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ activeTab, onTabChange }) => {
  const { user, logout } = useAuth();

  const menuItems = [
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      description: 'Manage your account',
      onClick: () => onTabChange('profile')
    },
    {
      id: 'my-bookings',
      label: 'My Bookings',
      icon: ShoppingCart,
      description: 'View your bookings',
      onClick: () => onTabChange('my-bookings')
    },
    {
      id: 'trip-history',
      label: 'Trip History',
      icon: History,
      description: 'Past adventures',
      onClick: () => onTabChange('trip-history')
    },
    {
      id: 'support-help',
      label: 'Support & Help',
      icon: MessageCircle,
      description: 'Get help and support',
      onClick: () => onTabChange('support-help')
    },
    {
      id: 'about-legal',
      label: 'About & Legal',
      icon: BookOpen,
      description: 'About us and legal info',
      onClick: () => onTabChange('about-legal')
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      description: 'Preferences & privacy',
      onClick: () => onTabChange('settings')
    },
  ];


  const handleLogout = () => {
    logout();
  };

  return (
    <div className="w-80 bg-gradient-to-b from-slate-50 to-white border-r border-gray-200 h-screen overflow-y-auto">
      {/* User Info Header */}
      <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16  bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <User className="w-8 h-8" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold truncate">Hi, {user?.name || 'User'}</h2>
            <div className="flex items-center mt-2">
              <Shield className="w-4 h-4 mr-2" />
              <span className="text-xs font-bold bg-white bg-opacity-20 px-2 py-1 rounded-full text-black">
                {user?.role
                  ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                  : 'User'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="p-6">
        <nav className="space-y-6">
          {/* Main Menu */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Account</h3>
            <div className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={item.onClick}
                    className={`w-full group relative overflow-hidden rounded-2xl transition-all duration-300 ${isActive
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 transform scale-105'
                      : 'bg-white hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 text-gray-700 hover:text-indigo-700 hover:shadow-md'
                      }`}
                  >
                    <div className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl transition-colors ${isActive
                          ? 'bg-white bg-opacity-20'
                          : 'bg-indigo-100 group-hover:bg-indigo-200'
                          }`}>
                          <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-indigo-600'
                            }`} />
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="font-semibold text-sm">{item.label}</h3>
                          <p className={`text-xs mt-1 ${isActive ? 'text-indigo-100' : 'text-gray-500'
                            }`}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute right-0 top-0 bottom-0 w-1 bg-white rounded-l-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>




        </nav>


        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hiddenx mt-2">

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 text-red-600 hover:bg-red-50 px-4 py-3 rounded-xl transition-colors font-semibold"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
