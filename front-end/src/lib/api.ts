const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  details?: unknown[];
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = this.getToken();
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  private setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
      this.token = token;
    }
  }

  private removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      this.token = null;
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        // If token is invalid, remove it
        if (response.status === 401) {
          this.removeToken();
        }
        return {
          success: false,
          error: data.error || 'Request failed',
          message: data.message,
          details: data.details,
        };
      }

      return data;
    } catch (error) {
      return {
        success: false,
        error: 'Network error',
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Auth methods
  async login(email: string, password: string): Promise<ApiResponse<{ user: unknown; token: string }>> {
    const response = await this.request<{ user: unknown; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.success && response.data?.token) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async register(userData: { email: string; password: string; name: string; role?: string }): Promise<ApiResponse<{ user: unknown; token: string }>> {
    const response = await this.request<{ user: unknown; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.success && response.data?.token) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async getProfile(): Promise<ApiResponse<unknown>> {
    return this.request('/auth/profile');
  }

  async updateProfile(userData: { name?: string; email?: string }): Promise<ApiResponse<unknown>> {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse<unknown>> {
    return this.request('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  async verifyToken(): Promise<ApiResponse<unknown>> {
    return this.request('/auth/verify');
  }

  async logout(): Promise<void> {
    this.removeToken();
  }

  // Data methods
  async getDestinations(): Promise<ApiResponse<unknown[]>> {
    return this.request('/destinations');
  }

  async getDestination(id: string): Promise<ApiResponse<unknown>> {
    return this.request(`/destinations/${id}`);
  }

  async getDestinationsByCategory(category: string): Promise<ApiResponse<unknown[]>> {
    return this.request(`/destinations/category/${category}`);
  }

  async getFeatures(): Promise<ApiResponse<unknown[]>> {
    return this.request('/features');
  }

  async getCulturalElements(): Promise<ApiResponse<unknown[]>> {
    return this.request('/cultural');
  }

  async getAnalyticsOverview(): Promise<ApiResponse<unknown>> {
    return this.request('/analytics/overview');
  }

  async getMapData(): Promise<ApiResponse<unknown[]>> {
    return this.request('/maps');
  }

  async getMapCategories(): Promise<ApiResponse<unknown[]>> {
    return this.request('/maps/categories');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.token;
  }

  // Get current token
  getCurrentToken(): string | null {
    return this.token;
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export type { ApiResponse };
