// import { API_PATHS, API_BASE_URL, ApiResponse } from './apiPath';

// export interface Destination {
//   id: string;
//   name: string;
//   title: string;
//   image: string;
//   rating: number;
//   category: string;
//   temperature: string;
//   bestTime: string;
//   description: string;
//   highlights: string[];
//   distance?: string;
//   coordinates?: [number, number];
//   createdAt?: string;
//   updatedAt?: string;
// }

// export interface CreateDestinationData {
//   name: string;
//   title: string;
//   image: string;
//   rating: number;
//   category: string;
//   temperature: string;
//   bestTime: string;
//   description: string;
//   highlights: string[];
//   distance?: string;
//   coordinates?: [number, number];
// }

// class DestinationService {
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

//   private removeToken(): void {
//     if (typeof window !== 'undefined') {
//       localStorage.removeItem('auth_token');
//     }
//   }

//   async getAllDestinations(): Promise<ApiResponse<Destination[]>> {
//     return this.makeRequest<Destination[]>(API_PATHS.DESTINATIONS.GET_ALL);
//   }

//   async getDestinationById(id: string): Promise<ApiResponse<Destination>> {
//     return this.makeRequest<Destination>(API_PATHS.DESTINATIONS.GET_BY_ID(id));
//   }

//   async getDestinationsByCategory(category: string): Promise<ApiResponse<Destination[]>> {
//     return this.makeRequest<Destination[]>(API_PATHS.DESTINATIONS.GET_BY_CATEGORY(category));
//   }

//   async createDestination(destinationData: CreateDestinationData): Promise<ApiResponse<Destination>> {
//     return this.makeRequest<Destination>(API_PATHS.DESTINATIONS.CREATE, {
//       method: 'POST',
//       body: JSON.stringify(destinationData),
//     });
//   }

//   async updateDestination(id: string, destinationData: Partial<CreateDestinationData>): Promise<ApiResponse<Destination>> {
//     return this.makeRequest<Destination>(API_PATHS.DESTINATIONS.UPDATE(id), {
//       method: 'PUT',
//       body: JSON.stringify(destinationData),
//     });
//   }

//   async deleteDestination(id: string): Promise<ApiResponse<any>> {
//     return this.makeRequest(API_PATHS.DESTINATIONS.DELETE(id), {
//       method: 'DELETE',
//     });
//   }
// }

// export const destinationService = new DestinationService();

// //   // Upload destination image
// //   async uploadDestinationImage(id: string, imageFile: File): Promise<ApiResponse<{ destination: Destination; image: { path: string; url: string } }>> {
// //     const formData = new FormData();
// //     formData.append('image', imageFile);

// //     const url = `${this.baseUrl}${API_PATHS.DESTINATIONS.UPLOAD_IMAGE(id)}`;
// //     const headers: HeadersInit = {};

// //     // Add auth token if available
// //     const token = this.getToken();
// //     if (token) {
// //       headers.Authorization = `Bearer ${token}`;
// //     }

// //     try {
// //       const response = await fetch(url, {
// //         method: 'POST',
// //         headers,
// //         body: formData,
// //       });

// //       const data = await response.json();

// //       if (!response.ok) {
// //         if (response.status === 401) {
// //           this.removeToken();
// //         }
// //         return {
// //           success: false,
// //           error: data.error || 'Upload failed',
// //           message: data.message,
// //           details: data.details,
// //         };
// //       }

// //       return data;
// //     } catch (error) {
// //       return {
// //         success: false,
// //         error: 'Network error',
// //         message: error instanceof Error ? error.message : 'Unknown error',
// //       };
// //     }
// //   }

// //   // Delete destination image
// //   async deleteDestinationImage(id: string): Promise<ApiResponse<Destination>> {
// //     return this.makeRequest<Destination>(API_PATHS.DESTINATIONS.DELETE_IMAGE(id), {
// //       method: 'DELETE',
// //     });
// //   }

// //   // Get destination with full image URL
// //   async getDestinationWithImageUrl(id: string): Promise<ApiResponse<Destination>> {
// //     return this.makeRequest<Destination>(API_PATHS.DESTINATIONS.GET_WITH_IMAGE_URL(id));
// //   }

// // function uploadDestinationImage(id: any, string: any, imageFile: any, File: { new(fileBits: BlobPart[], fileName: string, options?: FilePropertyBag): File; prototype: File; }) {
// //   throw new Error('Function not implemented.');
// // }

