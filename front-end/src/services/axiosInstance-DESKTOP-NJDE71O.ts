import axios, { AxiosResponse, AxiosError } from "axios";
import { API_BASE_URL } from "./apiPath";

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000, // 10 second timeout
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage (consistent with services)
    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
      }
    }

    if (!error.response) {
      console.error("Network error:", error.message);
    }

    return Promise.reject(error);
  }
);

// Helper function to handle API responses consistently
// export const handleApiResponse = <T>(response: AxiosResponse): { success: boolean; data?: T; error?: string } => {
//   try {
//     const responseData = response.data;

//     // Check if the response has the expected structure
//     if (responseData && typeof responseData === 'object') {
//       return {
//         success: responseData.success !== false,
//         data: responseData.data || responseData,
//         error: responseData.error || responseData.message
//       };
//     }

//     return {
//       success: true,
//       data: responseData
//     };
//   } catch (error) {
//     return {
//       success: false,
//       error: 'Failed to parse response'
//     };
//   }
// };

// // Helper function to handle API errors consistently
// export const handleApiError = (error: AxiosError): { success: false; error: string; message?: string } => {
//   if (error.response) {
//     // Server responded with error status
//     const errorData = error.response.data as any;
//     return {
//       success: false,
//       error: errorData?.error || errorData?.message || `HTTP ${error.response.status}`,
//       message: errorData?.message
//     };
//   } else if (error.request) {
//     // Request was made but no response received
//     return {
//       success: false,
//       error: 'Network error - no response from server'
//     };
//   } else {
//     // Something else happened
//     return {
//       success: false,
//       error: error.message || 'Unknown error occurred'
//     };
//   }
// };

export default axiosInstance;
export { axios };
