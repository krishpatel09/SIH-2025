"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axiosInstance from "@/services/axiosInstance";
import API_PATHS from "@/services/apiPath";
import { useToast } from "@/hooks/useToast";

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin" | "moderator";
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  details?: unknown;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<ApiResponse<{ user: User; token: string }>>;
  register: (userData: RegisterData) => Promise<ApiResponse<{ user: User; token: string }>>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<ApiResponse<User>>;
  changePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<ApiResponse<unknown>>;
  refreshUser: () => Promise<void>;
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
  isAdmin: boolean;
  isModeratorOrAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showSuccess, showError } = useToast();

  const isAuthenticated = !!user && !!token;
  const isAdmin = user?.role === "admin";
  const isModeratorOrAdmin =
    user?.role === "admin" || user?.role === "moderator";

  

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log("🔄 AUTH INITIALIZATION STARTED", {
          timestamp: new Date().toISOString(),
          action: "auth_init_start"
        });
        
        setIsLoading(true);

        // Check localStorage for existing auth data
        if (typeof window !== "undefined") {
          const storedUser = localStorage.getItem("user");
          const storedToken = localStorage.getItem("auth_token");

         

          if (storedUser && storedToken) {
            try {
              const parsedUser = JSON.parse(storedUser);  
              setUser(parsedUser);
              setToken(storedToken);
              
                
            } catch {
             
              localStorage.removeItem("user");
              localStorage.removeItem("auth_token");
            }
          } else {
           
          }
        }
      } catch {
       
        setUser(null);
        setToken(null);
      } finally {
        setIsLoading(false);
       
      }
    };

    initializeAuth();
  }, []);

  const login = async (
    credentials: LoginCredentials
  ): Promise<ApiResponse<{ user: User; token: string }>> => {
    try {
     
      
      setIsLoading(true);
      const response = await axiosInstance.post(
        API_PATHS.AUTH.LOGIN,
        credentials
      );

      if (response.data.success && response.data.data) {
        const { user: userData, token: authToken } = response.data.data;

       

        setUser(userData);
        setToken(authToken);

        // Store in localStorage for persistence
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(userData));
          localStorage.setItem("auth_token", authToken);
          
          console.log("💾 SESSION STORED IN LOCALSTORAGE", {
            timestamp: new Date().toISOString(),
            userId: userData.id,
            hasUser: !!localStorage.getItem("user"),
            hasToken: !!localStorage.getItem("auth_token"),
            action: "session_stored"
          });
        }

        showSuccess(`Welcome back, ${userData?.name || "User"}!`);
      }

      return response.data;
    } catch (error: unknown) {
      const errorMessage =
        (error as any).response?.data?.message || (error as Error).message || "Login failed";
      
     
      
      showError(errorMessage);
      return {
        success: false,
        error: errorMessage,
        message: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    userData: RegisterData
  ): Promise<ApiResponse<{ user: User; token: string }>> => {
    try {
     
      
      setIsLoading(true);
      const response = await axiosInstance.post(
        API_PATHS.AUTH.REGISTER,
        userData
      );

      if (response.data.success && response.data.data) {
        const { user: newUser, token: authToken } = response.data.data;
        
        console.log("✅ REGISTRATION SESSION SUCCESS", {
          timestamp: new Date().toISOString(),
          userId: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
          tokenLength: authToken?.length,
          action: "registration_success"
        });
        
        setUser(newUser);
        setToken(authToken);

        // Store in localStorage for persistence
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(newUser));
          localStorage.setItem("auth_token", authToken);
          
          console.log("💾 NEW USER SESSION STORED IN LOCALSTORAGE", {
            timestamp: new Date().toISOString(),
            userId: newUser.id,
            hasUser: !!localStorage.getItem("user"),
            hasToken: !!localStorage.getItem("auth_token"),
            action: "new_session_stored"
          });
        }

        showSuccess(
          `Welcome to Jharkhand Tourism, ${newUser?.name || "User"}!`
        );
      }

      return response.data;
    } catch (error: unknown) {
      const errorMessage =
        (error as any).response?.data?.message || (error as Error).message || "Registration failed";
      
      console.log("❌ REGISTRATION SESSION FAILED", {
        timestamp: new Date().toISOString(),
        email: userData.email,
        name: userData.name,
        error: errorMessage,
        statusCode: (error as any).response?.status,
        action: "registration_failed"
      });
      
      showError(errorMessage);
      return {
        success: false,
        error: errorMessage,
        message: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      console.log("🚪 LOGOUT SESSION STARTED", {
        timestamp: new Date().toISOString(),
        userId: user?.id,
        email: user?.email,
        action: "logout_attempt"
      });
      
      // Call logout endpoint if user is authenticated
      if (token) {
        await axiosInstance.post(API_PATHS.AUTH.LOGOUT);
        console.log("✅ LOGOUT API CALL SUCCESS", {
          timestamp: new Date().toISOString(),
          userId: user?.id,
          action: "logout_api_success"
        });
      }
    } catch (error) {
      console.error("❌ LOGOUT API CALL FAILED", {
        timestamp: new Date().toISOString(),
        userId: user?.id,
        error: error,
        action: "logout_api_failed"
      });
    } finally {
      // Clear local state regardless of API call result
      setUser(null);
      setToken(null);

      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("auth_token");
        
        console.log("🧹 SESSION CLEARED FROM LOCALSTORAGE", {
          timestamp: new Date().toISOString(),
          hasUser: !!localStorage.getItem("user"),
          hasToken: !!localStorage.getItem("auth_token"),
          action: "session_cleared"
        });
      }

      console.log("✅ LOGOUT SESSION COMPLETED", {
        timestamp: new Date().toISOString(),
        action: "logout_completed"
      });

      showSuccess("You have been logged out successfully");
    }
  };

  const updateProfile = async (
    userData: Partial<User>
  ): Promise<ApiResponse<User>> => {
    try {
      const response = await axiosInstance.put(
        API_PATHS.AUTH.PROFILE,
        userData
      );

      if (response.data.success && response.data.data) {
        const updatedUser = response.data.data;
        setUser(updatedUser);

        // Update localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }

        showSuccess("Profile updated successfully!");
      }

      return response.data;
    } catch (error: unknown) {
      const errorMessage =
        (error as any).response?.data?.message ||
        (error as Error).message ||
        "Profile update failed";
      showError(errorMessage);
      return {
        success: false,
        error: errorMessage,
        message: errorMessage,
      };
    }
  };

  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ): Promise<ApiResponse<unknown>> => {
    try {
      const response = await axiosInstance.put(API_PATHS.AUTH.CHANGE_PASSWORD, {
        currentPassword,
        newPassword,
      });

      if (response.data.success) {
        showSuccess("Password changed successfully!");
      }

      return response.data;
    } catch (error: unknown) {
      const errorMessage =
        (error as any).response?.data?.message ||
        (error as Error).message ||
        "Password change failed";
      showError(errorMessage);
      return {
        success: false,
        error: errorMessage,
        message: errorMessage,
      };
    }
  };

  const refreshUser = async (): Promise<void> => {
    try {
      const response = await axiosInstance.get(API_PATHS.AUTH.PROFILE);

      if (response.data.success && response.data.data) {
        const userData = response.data.data;
        setUser(userData);

        // Update localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(userData));
        }
      }
    } catch (error) {
      console.error("Error refreshing user:", error);
      // If refresh fails, logout user
      await logout();
    }
  };

  const hasRole = (role: string): boolean => {
    return user?.role === role;
  };

  const hasAnyRole = (roles: string[]): boolean => {
    return user ? roles.includes(user.role) : false;
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    refreshUser,
    hasRole,
    hasAnyRole,
    isAdmin,
    isModeratorOrAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
