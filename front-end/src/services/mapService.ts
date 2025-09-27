// import { API_PATHS, API_BASE_URL, ApiResponse } from './apiPath';

// export interface MapData {
//   id: string;
//   name: string;
//   coordinates: [number, number];
//   category: string;
//   description: string;
//   image: string;
//   rating: number;
//   distance?: string;
// }

// export interface MapCategory {
//   id: string;
//   name: string;
//   count: number;
//   icon: string;
// }

// class MapService {
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
//       headers.Authorization = `Bearer ${token}`;
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

//   async getAllMapData(): Promise<ApiResponse<MapData[]>> {
//     return this.makeRequest<MapData[]>(API_PATHS.MAPS.GET_ALL);
//   }

//   async getMapDataByCategory(category: string): Promise<ApiResponse<MapData[]>> {
//     return this.makeRequest<MapData[]>(API_PATHS.MAPS.GET_BY_CATEGORY(category));
//   }

//   async getMapCategories(): Promise<ApiResponse<MapCategory[]>> {
//     return this.makeRequest<MapCategory[]>(API_PATHS.MAPS.GET_CATEGORIES);
//   }
// }

// export const mapService = new MapService();
