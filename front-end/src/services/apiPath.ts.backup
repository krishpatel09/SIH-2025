// API Base URL Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// API Paths Configuration
export const API_PATHS = {
  // Authentication Routes
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password',
    VERIFY_TOKEN: '/auth/verify',
    GET_ALL_USERS: '/auth/users', // Admin only
    LOGOUT: '/auth/logout', 
  },

  // Destinations Routes
  DESTINATIONS: {
    GET_ALL: '/destinations',
    GET_BY_ID: (id: string) => `/destinations/${id}`,
    GET_BY_CATEGORY: (category: string) => `/destinations/category/${category}`,
    CREATE: '/destinations', // Admin only
    UPDATE: (id: string) => `/destinations/${id}`, // Admin only
    DELETE: (id: string) => `/destinations/${id}`, // Admin only
  },

  // Features Routes
  FEATURES: {
    GET_ALL: '/features',
    GET_BY_ID: (id: string) => `/features/${id}`,
    CREATE: '/features', // Admin only
    UPDATE: (id: string) => `/features/${id}`, // Admin only
    DELETE: (id: string) => `/features/${id}`, // Admin only
  },

  // Cultural Elements Routes
  CULTURAL: {
    GET_ALL: '/cultural',
    GET_BY_ID: (id: string) => `/cultural/${id}`,
    GET_DETAILS: (id: string) => `/cultural/${id}/details`,
    GET_TRIBAL_COMMUNITIES: '/cultural/tribal/communities',
    GET_BY_CATEGORY: (category: string) => `/cultural/category/${category}`,
    SEARCH: '/cultural/search/query',
    CREATE: '/cultural', // Admin only
    UPDATE: (id: string) => `/cultural/${id}`, // Admin only
    DELETE: (id: string) => `/cultural/${id}`, // Admin only
  },

  // Analytics Routes
  ANALYTICS: {
    OVERVIEW: '/analytics/overview',
    DATA: '/analytics/data',
    TOP_DESTINATIONS: '/analytics/top-destinations',
    MONTHLY_VISITORS: '/analytics/monthly-visitors',
    DEMOGRAPHICS: '/analytics/demographics',
    UPDATE_DATA: '/analytics/data', // Admin only
  },

  // Maps Routes
  MAPS: {
    GET_ALL: '/maps',
    GET_BY_CATEGORY: (category: string) => `/maps/category/${category}`,
    GET_CATEGORIES: '/maps/categories',
  },
} as const;

// HTTP Methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
} as const;

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  details?: any[];
}

// Request Configuration Types
export interface RequestConfig {
  method?: keyof typeof HTTP_METHODS;
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string | number>;
}

// API Endpoint Builder
export class ApiEndpointBuilder {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // Build full URL with path and query parameters
  buildUrl(path: string, params?: Record<string, string | number>): string {
    const url = new URL(path, this.baseUrl);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }
    
    return url.toString();
  }

  // Get authentication headers
  getAuthHeaders(token?: string): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  // Build request configuration
  buildRequestConfig(
    method: keyof typeof HTTP_METHODS = 'GET',
    body?: any,
    token?: string,
    customHeaders?: Record<string, string>
  ): RequestConfig {
    return {
      method,
      headers: {
        ...this.getAuthHeaders(token),
        ...customHeaders,
      },
      body: body ? JSON.stringify(body) : undefined,
    };
  }
}

// Export singleton instance
export const apiEndpointBuilder = new ApiEndpointBuilder();

// Utility functions for common API operations
export const apiUtils = {
  // Check if response is successful
  isSuccessResponse: (response: ApiResponse): boolean => {
    return response.success === true;
  },

  // Extract data from response
  extractData: <T>(response: ApiResponse<T>): T | null => {
    return response.success ? response.data || null : null;
  },

  // Extract error message
  extractError: (response: ApiResponse): string => {
    return response.error || response.message || 'Unknown error occurred';
  },

  // Build query string from params
  buildQueryString: (params: Record<string, string | number>): string => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });
    return searchParams.toString();
  },
};

// Export all API paths for easy access
export default API_PATHS;
