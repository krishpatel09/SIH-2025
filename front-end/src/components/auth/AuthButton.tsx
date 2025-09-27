"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { User, LogIn, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const AuthButton: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    setShowDropdown(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center space-x-4">
        <Link
          href="/login"
          className="flex items-center space-x-2 text-black hover:text-green-600 transition-colors"
        >
          <LogIn className="w-5 h-5" />
          <span>Sign In</span>
        </Link>
        <Link
          href="/sign"
          className="bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-2 text-black hover:text-green-600 transition-colors"
      >
        <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <User className="w-5 h-5" />
        </div>
        <span>{user?.name || "User"}</span>
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-800">
              Hi, {user?.name}
            </p>
            {/* <p className="text-xs text-gray-500">{user?.email}</p> */}
          </div>

          <button
            onClick={() => {
              router.push("/profile");
              setShowDropdown(false);
            }}
            className="w-full flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>Profile Settings</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
};
