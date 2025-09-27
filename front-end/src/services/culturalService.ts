import { API_BASE_URL, ApiResponse } from './apiPath';

// Define API paths directly to avoid import issues
const CULTURAL_API_PATHS = {
  GET_ALL: '/cultural',
  GET_BY_ID: (id: string) => `/cultural/${id}`,
  GET_DETAILS: (id: string) => `/cultural/${id}/details`,
  GET_TRIBAL_COMMUNITIES: '/cultural/tribal/communities',
  GET_BY_CATEGORY: (category: string) => `/cultural/category/${category}`,
  SEARCH: '/cultural/search/query',
  CREATE: '/cultural',
  UPDATE: (id: string) => `/cultural/${id}`,
  DELETE: (id: string) => `/cultural/${id}`,
};

export interface CulturalElement {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  location?: string;
  significance?: string;
  traditions?: string[];
  items?: string[];
  icon?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCulturalElementData {
  title: string;
  description: string;
  image: string;
  category: string;
  location?: string;
  significance?: string;
  traditions?: string[];
  items?: string[];
  icon?: string;
}

class CulturalService {
  private baseUrl = API_BASE_URL;

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const token = this.getToken();
    if (token) {
      (headers as any).Authorization = `Bearer ${token}`;
    }

    console.log('Making request to:', url);
    console.log('Request options:', { method: options.method || 'GET', headers });

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
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
      console.error('Request error:', error);
      return {
        success: false,
        error: 'Network error',
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  private removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  async getAllCulturalElements(): Promise<ApiResponse<CulturalElement[]>> {
    console.log('Getting all cultural elements...');
    return this.makeRequest<CulturalElement[]>(CULTURAL_API_PATHS.GET_ALL);
  }

  async getCulturalElementById(id: string): Promise<ApiResponse<CulturalElement>> {
    console.log('Getting cultural element by ID:', id);
    return this.makeRequest<CulturalElement>(CULTURAL_API_PATHS.GET_BY_ID(id));
  }

  async getCulturalElementDetails(id: string): Promise<ApiResponse<CulturalElement>> {
    console.log('Getting cultural element details for ID:', id);
    return this.makeRequest<CulturalElement>(CULTURAL_API_PATHS.GET_DETAILS(id));
  }

  async getTribalCommunities(): Promise<ApiResponse<CulturalElement[]>> {
    console.log('Getting tribal communities...');
    return this.makeRequest<CulturalElement[]>(CULTURAL_API_PATHS.GET_TRIBAL_COMMUNITIES);
  }

  async getCulturalElementsByCategory(category: string): Promise<ApiResponse<CulturalElement[]>> {
    console.log('Getting cultural elements by category:', category);
    return this.makeRequest<CulturalElement[]>(CULTURAL_API_PATHS.GET_BY_CATEGORY(category));
  }

  async searchCulturalElements(query: string): Promise<ApiResponse<CulturalElement[]>> {
    console.log('Searching cultural elements with query:', query);
    return this.makeRequest<CulturalElement[]>(`${CULTURAL_API_PATHS.SEARCH}?q=${encodeURIComponent(query)}`);
  }

  async createCulturalElement(culturalData: CreateCulturalElementData): Promise<ApiResponse<CulturalElement>> {
    console.log('Creating cultural element:', culturalData);
    return this.makeRequest<CulturalElement>(CULTURAL_API_PATHS.CREATE, {
      method: 'POST',
      body: JSON.stringify(culturalData),
    });
  }

  async updateCulturalElement(id: string, culturalData: Partial<CreateCulturalElementData>): Promise<ApiResponse<CulturalElement>> {
    console.log('Updating cultural element:', id, culturalData);
    return this.makeRequest<CulturalElement>(CULTURAL_API_PATHS.UPDATE(id), {
      method: 'PUT',
      body: JSON.stringify(culturalData),
    });
  }

  async deleteCulturalElement(id: string): Promise<ApiResponse<any>> {
    console.log('Deleting cultural element:', id);
    return this.makeRequest(CULTURAL_API_PATHS.DELETE(id), {
      method: 'DELETE',
    });
  }
}

export const culturalService = new CulturalService();
