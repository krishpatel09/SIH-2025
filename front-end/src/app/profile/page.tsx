'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { UserProfile } from '@/components/auth/UserProfile';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { TripHistory } from '@/components/auth/TripHistory';
import { ProfileSettings } from '@/components/auth/ProfileSettings';
import { ProfileSidebar } from '@/components/auth/ProfileSidebar';
import { SupportHelp } from '@/components/auth/SupportHelp';
import { AboutLegal } from '@/components/auth/AboutLegal';
import MyBooking from '@/components/auth/MyBooking';

function ProfilePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'profile');
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const tab = searchParams.get('tab') || 'profile';
    setActiveTab(tab);
  }, [searchParams]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUserId(parsedUser.id || null);
        } catch (error) {
          console.error('Failed to parse user from localStorage', error);
        }
      }
      console.log("userid", storedUser)
    }
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('tab', tab);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <UserProfile />;
      case 'my-bookings':
        return <MyBooking />;
      case 'trip-history':
        return <TripHistory userId={userId ?? ''} />; 
      case 'support-help':
        return <SupportHelp />;
      case 'about-legal':
        return <AboutLegal />;
      case 'settings':
        return <ProfileSettings />;
      default:
        return <UserProfile />;
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="w-full h-screen">
          <div className="flex h-full w-full">
            <ProfileSidebar activeTab={activeTab} onTabChange={handleTabChange} />
            <div className="flex-1 overflow-y-auto w-full">
              <div className="p-8 w-full">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    }>
      <ProfilePageContent />
    </Suspense>
  );
}
