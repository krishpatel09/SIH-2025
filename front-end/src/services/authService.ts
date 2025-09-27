// import { API_PATHS, API_BASE_URL, ApiResponse } from './apiPath';

// export interface LoginData {
//   email: string;
//   password: string;
// }

// export interface RegisterData {
//   email: string;
//   password: string;
//   name: string;
//   role?: string;
// }

// export interface UserProfile {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface AuthResponse {
//   user: UserProfile;
//   token: string;
// }

// class AuthService {
//   private baseUrl = API_BASE_URL;

//   private async makeRequest<T>(
//     endpoint: string,
//     options: RequestInit = {}
//   ): Promise<ApiResponse<T>> {
//     const url = `${this.baseUrl}${endpoint}`;
//     const headers: HeadersInit = {
//       'Content-Type': 'application/json',
//       ...options.headers,
//     };

//     // Add auth token if available
//     const token = this.getToken();
//     if (token) {
//       (headers as any).Authorization = `Bearer ${token}`;
//     }

//     try {
//       const response = await fetch(url, {
//         ...options,
//         headers,
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         if (response.status === 401) {
//           this.removeToken();
//         }
//         return {
//           success: false,
//           error: data.error || 'Request failed',
//           message: data.message,
//           details: data.details,
//         };
//       }

//       return data;
//     } catch (error) {
//       return {
//         success: false,
//         error: 'Network error',
//         message: error instanceof Error ? error.message : 'Unknown error',
//       };
//     }
//   }

//   private getToken(): string | null {
//     if (typeof window !== 'undefined') {
//       return localStorage.getItem('auth_token');
//     }
//     return null;
//   }

//   private setToken(token: string): void {
//     if (typeof window !== 'undefined') {
//       localStorage.setItem('auth_token', token);
//     }
//   }

//   private removeToken(): void { 
//     if (typeof window !== 'undefined') {
//       localStorage.removeItem('auth_token');
//     }
//   }

//   async login(loginData: LoginData): Promise<ApiResponse<AuthResponse>> {
//     const response = await this.makeRequest<AuthResponse>(API_PATHS.AUTH.LOGIN, {
//       method: 'POST',
//       body: JSON.stringify(loginData),
//     });

//     if (response.success && response.data?.token) {
//       this.setToken(response.data.token);
//     }

//     return response;
//   }

//   async register(registerData: RegisterData): Promise<ApiResponse<AuthResponse>> {
//     const response = await this.makeRequest<AuthResponse>(API_PATHS.AUTH.REGISTER, {
//       method: 'POST',
//       body: JSON.stringify(registerData),
//     });

//     if (response.success && response.data?.token) {
//       this.setToken(response.data.token);
//     }

//     return response;
//   }

//   async getProfile(): Promise<ApiResponse<UserProfile>> {
//     return this.makeRequest<UserProfile>(API_PATHS.AUTH.PROFILE);
//   }

//   async updateProfile(userData: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> {
//     return this.makeRequest<UserProfile>(API_PATHS.AUTH.PROFILE, {
//       method: 'PUT',
//       body: JSON.stringify(userData),
//     });
//   }

//   async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse<any>> {
//     return this.makeRequest(API_PATHS.AUTH.CHANGE_PASSWORD, {
//       method: 'PUT',
//       body: JSON.stringify({ currentPassword, newPassword }),
//     });
//   }

//   async verifyToken(): Promise<ApiResponse<any>> {
//     return this.makeRequest(API_PATHS.AUTH.VERIFY_TOKEN);
//   }

//   async getAllUsers(): Promise<ApiResponse<UserProfile[]>> {
//     return this.makeRequest<UserProfile[]>(API_PATHS.AUTH.GET_ALL_USERS);
//   }

//   logout(): void {
//     this.removeToken();
//   }

//   isAuthenticated(): boolean {
//     return !!this.getToken();
//   }

//   getCurrentToken(): string | null {
//     return this.getToken();
//   }
// }

// export const authService = new AuthService();
