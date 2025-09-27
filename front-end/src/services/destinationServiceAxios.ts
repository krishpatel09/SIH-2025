// import axiosInstance, { handleApiResponse, handleApiError } from './axiosInstance';
// import { API_PATHS, ApiResponse } from './apiPath';

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

// class DestinationServiceAxios {
//   async getAllDestinations(): Promise<ApiResponse<Destination[]>> {
//     try {
//       const response = await axiosInstance.get(API_PATHS.DESTINATIONS.GET_ALL);
//       return handleApiResponse<Destination[]>(response);
//     } catch (error: any) {
//       return handleApiError(error);
//     }
//   }

//   async getDestinationById(id: string): Promise<ApiResponse<Destination>> {
//     try {
//       const response = await axiosInstance.get(API_PATHS.DESTINATIONS.GET_BY_ID(id));
//       return handleApiResponse<Destination>(response);
//     } catch (error: any) {
//       return handleApiError(error);
//     }
//   }

//   async getDestinationsByCategory(category: string): Promise<ApiResponse<Destination[]>> {
//     try {
//       const response = await axiosInstance.get(API_PATHS.DESTINATIONS.GET_BY_CATEGORY(category));
//       return handleApiResponse<Destination[]>(response);
//     } catch (error: any) {
//       return handleApiError(error);
//     }
//   }

//   async createDestination(destinationData: CreateDestinationData): Promise<ApiResponse<Destination>> {
//     try {
//       const response = await axiosInstance.post(API_PATHS.DESTINATIONS.CREATE, destinationData);
//       return handleApiResponse<Destination>(response);
//     } catch (error: any) {
//       return handleApiError(error);
//     }
//   }

//   async updateDestination(id: string, destinationData: Partial<CreateDestinationData>): Promise<ApiResponse<Destination>> {
//     try {
//       const response = await axiosInstance.put(API_PATHS.DESTINATIONS.UPDATE(id), destinationData);
//       return handleApiResponse<Destination>(response);
//     } catch (error: any) {
//       return handleApiError(error);
//     }
//   }

//   async deleteDestination(id: string): Promise<ApiResponse<any>> {
//     try {
//       const response = await axiosInstance.delete(API_PATHS.DESTINATIONS.DELETE(id));
//       return handleApiResponse<any>(response);
//     } catch (error: any) {
//       return handleApiError(error);
//     }
//   }
// }

// export const destinationServiceAxios = new DestinationServiceAxios();
