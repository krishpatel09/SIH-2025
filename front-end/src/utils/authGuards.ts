'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

// Authentication guard utilities
export class AuthGuards {
  // Check if user is authenticated
  static isAuthenticated(user: any, isLoading: boolean): boolean {
    return !isLoading && !!user;
  }

  // Check if user has specific role
  static hasRole(user: any, role: string): boolean {
    return user?.role === role;
  }

  // Check if user has any of the specified roles
  static hasAnyRole(user: any, roles: string[]): boolean {
    return roles.includes(user?.role);
  }

  // Check if user is admin
  static isAdmin(user: any): boolean {
    return user?.role === 'admin';
  }

  // Check if user is moderator or admin
  static isModeratorOrAdmin(user: any): boolean {
    return ['moderator', 'admin'].includes(user?.role);
  }

  // Check if user can access admin features
  static canAccessAdmin(user: any): boolean {
    return ['admin', 'moderator'].includes(user?.role);
  }
}

// Route protection utilities
export class RouteGuards {
  // Protected route check
  static checkProtectedRoute(user: any, isLoading: boolean): {
    canAccess: boolean;
    redirectTo?: string;
    message?: string;
  } {
    if (isLoading) {
      return { canAccess: false };
    }

    if (!user) {
      return {
        canAccess: false,
        redirectTo: '/login',
        message: 'Please login to access this page'
      };
    }

    return { canAccess: true };
  }

  // Role-based route check
  static checkRoleBasedRoute(
    user: any,
    isLoading: boolean,
    allowedRoles: string[]
  ): {
    canAccess: boolean;
    redirectTo?: string;
    message?: string;
  } {
    const authCheck = RouteGuards.checkProtectedRoute(user, isLoading);
    if (!authCheck.canAccess) {
      return authCheck;
    }

    if (!RouteGuards.hasAnyRole(user, allowedRoles)) {
      return {
        canAccess: false,
        redirectTo: '/dashboard',
        message: `Access denied. Required roles: ${allowedRoles.join(', ')}`
      };
    }

    return { canAccess: true };
  }

  // Admin route check
  static checkAdminRoute(user: any, isLoading: boolean): {
    canAccess: boolean;
    redirectTo?: string;
    message?: string;
  } {
    return RouteGuards.checkRoleBasedRoute(user, isLoading, ['admin']);
  }

  // Moderator or admin route check
  static checkModeratorRoute(user: any, isLoading: boolean): {
    canAccess: boolean;
    redirectTo?: string;
    message?: string;
  } {
    return RouteGuards.checkRoleBasedRoute(user, isLoading, ['moderator', 'admin']);
  }

  // Check if user has any of the specified roles
  static hasAnyRole(user: any, roles: string[]): boolean {
    return roles.includes(user?.role);
  }
}

// Authentication middleware for API calls
export class ApiAuthMiddleware {
  private static token: string | null = null;

  // Set authentication token
  static setToken(token: string): void {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  // Get authentication token
  static getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token') || this.token;
    }
    return this.token;
  }

  // Remove authentication token
  static removeToken(): void {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  // Get authorization header
  static getAuthHeader(): { Authorization: string } | {} {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

// Permission utilities
export class Permissions {
  // Define permission constants
  static readonly PERMISSIONS = {
    // User permissions
    VIEW_DESTINATIONS: 'view_destinations',
    CREATE_TRIP: 'create_trip',
    EDIT_PROFILE: 'edit_profile',
    
    // Moderator permissions
    MANAGE_CONTENT: 'manage_content',
    VIEW_ANALYTICS: 'view_analytics',
    MODERATE_COMMENTS: 'moderate_comments',
    
    // Admin permissions
    MANAGE_USERS: 'manage_users',
    MANAGE_SYSTEM: 'manage_system',
    VIEW_ALL_ANALYTICS: 'view_all_analytics',
    MANAGE_DESTINATIONS: 'manage_destinations',
  };

  // Role to permissions mapping
  static readonly ROLE_PERMISSIONS = {
    user: [
      Permissions.PERMISSIONS.VIEW_DESTINATIONS,
      Permissions.PERMISSIONS.CREATE_TRIP,
      Permissions.PERMISSIONS.EDIT_PROFILE,
    ],
    moderator: [
      Permissions.PERMISSIONS.VIEW_DESTINATIONS,
      Permissions.PERMISSIONS.CREATE_TRIP,
      Permissions.PERMISSIONS.EDIT_PROFILE,
      Permissions.PERMISSIONS.MANAGE_CONTENT,
      Permissions.PERMISSIONS.VIEW_ANALYTICS,
      Permissions.PERMISSIONS.MODERATE_COMMENTS,
    ],
    admin: [
      // Admin has all permissions
      ...Object.values(Permissions.PERMISSIONS),
    ],
  };

  // Check if user has specific permission
  static hasPermission(user: any, permission: string): boolean {
    if (!user?.role) return false;
    
    const rolePermissions = Permissions.ROLE_PERMISSIONS[user.role] || [];
    return rolePermissions.includes(permission);
  }

  // Check if user has any of the specified permissions
  static hasAnyPermission(user: any, permissions: string[]): boolean {
    return permissions.some(permission => Permissions.hasPermission(user, permission));
  }

  // Get user's permissions
  static getUserPermissions(user: any): string[] {
    if (!user?.role) return [];
    return Permissions.ROLE_PERMISSIONS[user.role] || [];
  }
}

// Export utility functions for easy use
export const {
  isAuthenticated,
  hasRole,
  hasAnyRole,
  isAdmin,
  isModeratorOrAdmin,
  canAccessAdmin,
} = AuthGuards;

export const {
  checkProtectedRoute,
  checkRoleBasedRoute,
  checkAdminRoute,
  checkModeratorRoute,
} = RouteGuards;

export const {
  setToken,
  getToken,
  removeToken,
  getAuthHeader,
  isAuthenticated: isApiAuthenticated,
} = ApiAuthMiddleware;

export const {
  hasPermission,
  hasAnyPermission,
  getUserPermissions,
} = Permissions;
