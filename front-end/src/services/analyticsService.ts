// import { API_PATHS, API_BASE_URL, ApiResponse } from './apiPath';

// export interface AnalyticsOverview {
//   totalDestinations: number;
//   totalVisitors: number;
//   totalFeatures: number;
//   totalCulturalElements: number;
//   monthlyGrowth: number;
//   topCategories: Array<{
//     category: string;
//     count: number;
//   }>;
// }

// export interface AnalyticsData {
//   id: string;
//   metric: string;
//   value: number;
//   date: string;
//   category?: string;
// }

// export interface TopDestination {
//   id: string;
//   name: string;
//   visitors: number;
//   rating: number;
//   category: string;
// }

// export interface MonthlyVisitor {
//   month: string;
//   visitors: number;
//   year: number;
// }

// export interface Demographics {
//   ageGroups: Array<{
//     ageGroup: string;
//     percentage: number;
//   }>;
//   locations: Array<{
//     location: string;
//     visitors: number;
//   }>;
//   interests: Array<{
//     interest: string;
//     count: number;
//   }>;
// }

// class AnalyticsService {
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

//   async getAnalyticsOverview(): Promise<ApiResponse<AnalyticsOverview>> {
//     return this.makeRequest<AnalyticsOverview>(API_PATHS.ANALYTICS.OVERVIEW);
//   }

//   async getAnalyticsData(): Promise<ApiResponse<AnalyticsData[]>> {
//     return this.makeRequest<AnalyticsData[]>(API_PATHS.ANALYTICS.DATA);
//   }

//   async getTopDestinations(): Promise<ApiResponse<TopDestination[]>> {
//     return this.makeRequest<TopDestination[]>(API_PATHS.ANALYTICS.TOP_DESTINATIONS);
//   }

//   async getMonthlyVisitors(): Promise<ApiResponse<MonthlyVisitor[]>> {
//     return this.makeRequest<MonthlyVisitor[]>(API_PATHS.ANALYTICS.MONTHLY_VISITORS);
//   }

//   async getDemographics(): Promise<ApiResponse<Demographics>> {
//     return this.makeRequest<Demographics>(API_PATHS.ANALYTICS.DEMOGRAPHICS);
//   }

//   async updateAnalyticsData(analyticsData: Partial<AnalyticsData>): Promise<ApiResponse<AnalyticsData>> {
//     return this.makeRequest<AnalyticsData>(API_PATHS.ANALYTICS.UPDATE_DATA, {
//       method: 'POST',
//       body: JSON.stringify(analyticsData),
//     });
//   }
// }

// export const analyticsService = new AnalyticsService();
