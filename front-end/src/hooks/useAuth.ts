'use client';

import { useAuth as useAuthContext, User } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  token: string | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<unknown>;
  register: (userData: { email: string; password: string; name: string; role?: string }) => Promise<unknown>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
  isAdmin: boolean;
  isModerator: boolean;
  isUser: boolean;
}

export const useAuth = (): AuthState & AuthActions => {
  const authContext = useAuthContext();
  const [, setIsOnline] = useState(true);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Helper functions
  const hasRole = (role: string): boolean => {
    return authContext.user?.role === role;
  };

  const hasAnyRole = (roles: string[]): boolean => {
    return authContext.user?.role !== undefined && roles.includes(authContext.user.role);
  };

  const isAdmin = hasRole('admin');
  const isModerator = hasRole('moderator');
  const isUser = hasRole('user');

  return {
    ...authContext,
    hasRole,
    hasAnyRole,
    isAdmin,
    isModerator,
    isUser,
  };
};

// Hook for checking authentication status
export const useAuthStatus = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  
  return {
    isAuthenticated,
    isLoading,
    user,
    isGuest: !isAuthenticated && !isLoading,
    isLoggedIn: isAuthenticated && !isLoading,
  };
};

// Hook for role-based access control
export const useRoleAccess = (requiredRoles: string[]) => {
  const { user, isLoading } = useAuth();
  
  const hasAccess = !isLoading && user && requiredRoles.includes(user.role);
  const canAccess = (roles: string[]) => !isLoading && user && roles.includes(user.role);
  
  return {
    hasAccess,
    canAccess,
    userRole: user?.role,
    isLoading,
  };
};

// Hook for authentication guards
export const useAuthGuard = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  
  const requireAuth = (callback?: () => void) => {
    if (!isLoading && !isAuthenticated) {
      // Redirect to login or show auth modal
      if (callback) callback();
      return false;
    }
    return isAuthenticated;
  };

  const requireRole = (roles: string[], callback?: () => void) => {
    if (!isLoading && (!isAuthenticated || !roles.includes(user?.role))) {
      if (callback) callback();
      return false;
    }
    return isAuthenticated && roles.includes(user?.role);
  };

  return {
    requireAuth,
    requireRole,
    isAuthenticated,
    isLoading,
    user,
  };
};
