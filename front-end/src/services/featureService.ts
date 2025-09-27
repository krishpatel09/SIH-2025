// import { API_PATHS, API_BASE_URL, ApiResponse } from './apiPath';

// export interface Feature {
//   id: string;
//   name: string;
//   description: string;
//   icon: string;
//   category: string;
//   isActive: boolean;
//   createdAt?: string;
//   updatedAt?: string;
// }

// export interface CreateFeatureData {
//   name: string;
//   description: string;
//   icon: string;
//   category: string;
//   isActive?: boolean;
// }

// class FeatureService {
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

//   private removeToken(): void {
//     if (typeof window !== 'undefined') {
//       localStorage.removeItem('auth_token');
//     }
//   }

//   async getAllFeatures(): Promise<ApiResponse<Feature[]>> {
//     return this.makeRequest<Feature[]>(API_PATHS.FEATURES.GET_ALL);
//   }

//   async getFeatureById(id: string): Promise<ApiResponse<Feature>> {
//     return this.makeRequest<Feature>(API_PATHS.FEATURES.GET_BY_ID(id));
//   }

//   async createFeature(featureData: CreateFeatureData): Promise<ApiResponse<Feature>> {
//     return this.makeRequest<Feature>(API_PATHS.FEATURES.CREATE, {
//       method: 'POST',
//       body: JSON.stringify(featureData),
//     });
//   }

//   async updateFeature(id: string, featureData: Partial<CreateFeatureData>): Promise<ApiResponse<Feature>> {
//     return this.makeRequest<Feature>(API_PATHS.FEATURES.UPDATE(id), {
//       method: 'PUT',
//       body: JSON.stringify(featureData),
//     });
//   }

//   async deleteFeature(id: string): Promise<ApiResponse<any>> {
//     return this.makeRequest(API_PATHS.FEATURES.DELETE(id), {
//       method: 'DELETE',
//     });
//   }
// }

// export const featureService = new FeatureService();
