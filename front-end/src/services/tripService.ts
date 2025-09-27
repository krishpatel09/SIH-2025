import axiosInstance from './axiosInstance';
import API_PATHS from './apiPath';

export interface Trip {
  id: string;
  name: string;
  description?: string;
  duration: number;
  budget: number;
  travelers: number;
  trip_type: string;
  transport_mode: string;
  accommodation_type: string;
  status: string;
  itinerary?: any[];
  packing_list?: any;
  budget_breakdown?: any;
  weather_preferences?: any;
  start_date?: string;
  end_date?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  trip_destinations?: any[];
}

export interface TripPreferences {
  duration: number;
  budget: number;
  travelers: number;
  tripType: string;
  transportMode: string;
  accommodationType: string;
  destinations: string[];
  startDate?: string;
  endDate?: string;
}

export interface Destination {
  id: string;
  name: string;
  title: string;
  type: string;
  rating: number;
  cost: number;
  duration: string;
  image: string;
  description: string;
  highlights?: string[];
  bestTime?: string;
  temperature?: string;
}

export interface TripStats {
  totalTrips: number;
  totalBudget: number;
  totalDuration: number;
  averageDuration: number;
  averageBudget: number;
  statusBreakdown: Record<string, number>;
  tripTypeBreakdown: Record<string, number>;
  monthlyBreakdown: Record<string, { trips: number; budget: number }>;
  budgetRange: { min: number; max: number; median: number };
  durationRange: { min: number; max: number; median: number };
  favoriteDestinations?: { name: string; visits: number }[];
  monthlyTripCount?: Record<string, number>;
  budgetTrends?: { date: string; budget: number }[];
}

export interface SearchOptions {
  query?: string;
  status?: string;
  tripType?: string;
  minBudget?: number;
  maxBudget?: number;
  minDuration?: number;
  maxDuration?: number;
  startDate?: string;
  endDate?: string;
  limit?: number;
  offset?: number;
}

class TripService {
  // Create a new trip
  async createTrip(tripData: Partial<Trip>): Promise<{ success: boolean; data?: Trip; error?: string }> {
    try {
      const response = await axiosInstance.post(API_PATHS.TRIPS.CREATE, tripData);
      return {
        success: response.data.success,
        data: response.data.data,
        error: response.data.error
      };
    } catch (error: any) {
      console.error('Create trip error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to create trip'
      };
    }
  }

  // Get all trips for a user with filters
  async getUserTrips(
    userId: string, 
    options: { status?: string; tripType?: string; limit?: number; offset?: number } = {}
  ): Promise<{ success: boolean; data?: Trip[]; total?: number; pagination?: any; error?: string }> {
    try {
      const params = new URLSearchParams();
      if (options.status) params.append('status', options.status);
      if (options.tripType) params.append('tripType', options.tripType);
      if (options.limit) params.append('limit', options.limit.toString());
      if (options.offset) params.append('offset', options.offset.toString());

      const url = `${API_PATHS.TRIPS.GET_USER_TRIPS(userId)}?${params.toString()}`;
      const response = await axiosInstance.get(url);
      
      return {
        success: response.data.success,
        data: response.data.data,
        total: response.data.pagination?.total,
        pagination: response.data.pagination,
        error: response.data.error
      };
    } catch (error: any) {
      console.error('Get user trips error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch trips'
      };

  // Get trips by user ID (simplified version)
  async getTripsByUserId(userId: string): Promise<{ success: boolean; data?: Trip[]; error?: string }> {
    try {
      const result = await this.getUserTrips(userId);
      return {
        success: result.success,
        data: result.data,
        error: result.error
      };
    } catch (error: any) {
      console.error('Get trips by user ID error:', error);
      return {
        success: false,
        error: error.message || 'Failed to fetch trips'
      };
    }
  }

  // Get trip by ID with full details
  async getTripById(id: string): Promise<{ success: boolean; data?: Trip; error?: string }> {
    try {
      const response = await axiosInstance.get(API_PATHS.TRIPS.GET_BY_ID(id));
      return {
        success: response.data.success,
        data: response.data.data,
        error: response.data.error
      };
    } catch (error: any) {
      console.error('Get trip error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch trip'
      };
    }
  }

  // Update trip
  async updateTrip(id: string, updateData: Partial<Trip>): Promise<{ success: boolean; data?: Trip; error?: string }> {
    try {
      const response = await axiosInstance.put(API_PATHS.TRIPS.UPDATE(id), updateData);
      return {
        success: response.data.success,
        data: response.data.data,
        error: response.data.error
      };
    } catch (error: any) {
      console.error('Update trip error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to update trip'
      };
    }
  }

  // Generate comprehensive itinerary for trip
  async generateItinerary(id: string, preferences: TripPreferences): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const response = await axiosInstance.post(API_PATHS.TRIPS.GENERATE_ITINERARY(id), preferences);
      return {
        success: response.data.success,
        data: response.data.data,
        error: response.data.error
      };
    } catch (error: any) {
      console.error('Generate itinerary error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to generate itinerary'
      };
    }
  }

  // Get comprehensive trip statistics
  async getTripStats(userId: string): Promise<{ success: boolean; data?: TripStats; error?: string }> {
    try {
      const response = await axiosInstance.get(API_PATHS.TRIPS.GET_STATS(userId));
      return {
        success: response.data.success,
        data: response.data.data,
        error: response.data.error
      };
    } catch (error: any) {
      console.error('Get trip stats error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch trip statistics'
      };
    }
  }

  // Get destinations for trip planning with smart filtering
  async getDestinationsForPlanning(
    tripType?: string, 
    budget?: number, 
    duration?: number, 
    category?: string
  ): Promise<{ success: boolean; data?: Destination[]; filters?: any; error?: string }> {
    try {
      const params = new URLSearchParams();
      if (tripType) params.append('tripType', tripType);
      if (budget) params.append('budget', budget.toString());
      if (duration) params.append('duration', duration.toString());
      if (category) params.append('category', category);

      const url = `${API_PATHS.TRIPS.GET_DESTINATIONS_FOR_PLANNING}?${params.toString()}`;
      const response = await axiosInstance.get(url);
      
      return {
        success: response.data.success,
        data: response.data.data,
        filters: response.data.filters,
        error: response.data.error
      };
    } catch (error: any) {
      console.error('Get destinations error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch destinations'
      };
    }
  }

  // Get weather data for trip destinations
  async getTripWeather(id: string): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const response = await axiosInstance.get(`/trips/${id}/weather`);
      return {
        success: response.data.success,
        data: response.data.data,
        error: response.data.error
      };
    } catch (error: any) {
      console.error('Get trip weather error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch weather data'
      };
    }
  }

  // Advanced search trips
  async searchTrips(
    userId: string, 
    searchOptions: SearchOptions
  ): Promise<{ success: boolean; data?: Trip[]; total?: number; pagination?: any; error?: string }> {
    try {
      const response = await axiosInstance.post(`/trips/search/${userId}`, searchOptions);
      return {
        success: response.data.success,
        data: response.data.data,
        total: response.data.total,
        pagination: response.data.pagination,
        error: response.data.error
      };
    } catch (error: any) {
      console.error('Search trips error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to search trips'
      };
    }
  }

  // Get upcoming trips
  async getUpcomingTrips(
    userId: string, 
    limit: number = 5
  ): Promise<{ success: boolean; data?: Trip[]; error?: string }> {
    try {
      const response = await axiosInstance.get(`/trips/upcoming/${userId}?limit=${limit}`);
      return {
        success: response.data.success,
        data: response.data.data,
        error: response.data.error
      };
    } catch (error: any) {
      console.error('Get upcoming trips error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch upcoming trips'
      };
    }
  }

  // Get trip recommendations
  async getTripRecommendations(
    userId: string
  ): Promise<{ success: boolean; data?: any[]; error?: string }> {
    try {
      const response = await axiosInstance.get(`/trips/recommendations/${userId}`);
      return {
        success: response.data.success,
        data: response.data.data,
        error: response.data.error
      };
    } catch (error: any) {
      console.error('Get trip recommendations error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to get recommendations'
      };
    }
  }

  // Bulk update trips
  async bulkUpdateTrips(
    tripIds: string[], 
    updateData: Partial<Trip>
  ): Promise<{ success: boolean; data?: Trip[]; error?: string }> {
    try {
      const response = await axiosInstance.put('/trips/bulk/update', { tripIds, updateData });
      return {
        success: response.data.success,
        data: response.data.data,
        error: response.data.error
      };
    } catch (error: any) {
      console.error('Bulk update trips error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to update trips'
      };
    }
  }

  // Get trip analytics
  async getTripAnalytics(
    dateRange: number = 30
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const response = await axiosInstance.get(`/trips/analytics/overview?dateRange=${dateRange}`);
      return {
        success: response.data.success,
        data: response.data.data,
        error: response.data.error
      };
    } catch (error: any) {
      console.error('Get trip analytics error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to get analytics'
      };
    }
  }

  // Export trip data
  async exportTrip(
    id: string, 
    format: string = 'json'
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const response = await axiosInstance.get(`/trips/${id}/export?format=${format}`);
      return {
        success: response.data.success || true,
        data: response.data,
        error: response.data.error
      };
    } catch (error: any) {
      console.error('Export trip error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to export trip'
      };
    }
  }

  // Duplicate trip
  async duplicateTrip(
    id: string, 
    name?: string
  ): Promise<{ success: boolean; data?: Trip; error?: string }> {
    try {
      const response = await axiosInstance.post(`/trips/${id}/duplicate`, { name });
      return {
        success: response.data.success,
        data: response.data.data,
        error: response.data.error
      };
    } catch (error: any) {
      console.error('Duplicate trip error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to duplicate trip'
      };
    }
  }

  // Delete trip
  async deleteTrip(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await axiosInstance.delete(API_PATHS.TRIPS.DELETE(id));
      return {
        success: response.data.success,
        error: response.data.error
      };
    } catch (error: any) {
      console.error('Delete trip error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to delete trip'
      };
    }
  }

  // Calculate detailed budget breakdown
  calculateBudgetBreakdown(totalBudget: number, duration: number = 3, travelers: number = 1) {
    const dailyBudget = totalBudget / duration;
    const perPersonBudget = totalBudget / travelers;
    
    return {
      total: totalBudget,
      daily: Math.round(dailyBudget),
      perPerson: Math.round(perPersonBudget),
      accommodation: Math.round(totalBudget * 0.35),
      transport: Math.round(totalBudget * 0.25),
      food: Math.round(totalBudget * 0.25),
      activities: Math.round(totalBudget * 0.10),
      miscellaneous: Math.round(totalBudget * 0.05),
      breakdown: {
        accommodationPerDay: Math.round(totalBudget * 0.35 / duration),
        transportPerDay: Math.round(totalBudget * 0.25 / duration),
        foodPerDay: Math.round(totalBudget * 0.25 / duration),
        activitiesPerDay: Math.round(totalBudget * 0.10 / duration)
      }
    };
  }

  // Validate trip data
  validateTripData(tripData: Partial<Trip>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!tripData.name || tripData.name.trim().length === 0) {
      errors.push('Trip name is required');
    }

    if (!tripData.duration || tripData.duration < 1) {
      errors.push('Duration must be at least 1 day');
    }

    if (tripData.duration && tripData.duration > 30) {
      errors.push('Duration cannot exceed 30 days');
    }

    if (!tripData.budget || tripData.budget < 1000) {
      errors.push('Budget must be at least ₹1000');
    }

    if (tripData.budget && tripData.budget > 1000000) {
      errors.push('Budget cannot exceed ₹10,00,000');
    }

    if (!tripData.travelers || tripData.travelers < 1) {
      errors.push('Number of travelers must be at least 1');
    }

    if (tripData.travelers && tripData.travelers > 20) {
      errors.push('Number of travelers cannot exceed 20');
    }

    if (!tripData.user_id) {
      errors.push('User ID is required');
    }

    // Validate dates if provided
    if (tripData.start_date && tripData.end_date) {
      const startDate = new Date(tripData.start_date);
      const endDate = new Date(tripData.end_date);
      
      if (startDate >= endDate) {
        errors.push('End date must be after start date');
      }

      if (startDate < new Date()) {
        errors.push('Start date cannot be in the past');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Format trip data for display
  formatTripForDisplay(trip: Trip) {
    return {
      ...trip,
      formattedBudget: `₹${trip.budget.toLocaleString()}`,
      formattedDuration: `${trip.duration} ${trip.duration === 1 ? 'day' : 'days'}`,
      formattedTravelers: `${trip.travelers} ${trip.travelers === 1 ? 'person' : 'people'}`,
      formattedDates: trip.start_date && trip.end_date ? 
        `${new Date(trip.start_date).toLocaleDateString()} - ${new Date(trip.end_date).toLocaleDateString()}` : 
        'Dates not set',
      statusColor: this.getStatusColor(trip.status),
      typeIcon: this.getTripTypeIcon(trip.trip_type)
    };
  }

  // Get status color for UI
  private getStatusColor(status: string): string {
    const colors = {
      draft: 'gray',
      planned: 'blue',
      booked: 'green',
      completed: 'purple',
      cancelled: 'red'
    };
    return colors[status as keyof typeof colors] || 'gray';
  }

  // Get trip type icon
  private getTripTypeIcon(tripType: string): string {
    const icons = {
      adventure: '🏔️',
      cultural: '🏛️',
      nature: '🌲',
      religious: '🙏',
      family: '👨‍👩‍👧‍👦',
      romantic: '💕'
    };
    return icons[tripType as keyof typeof icons] || '🗺️';
  }

  // Calculate trip progress
  calculateTripProgress(trip: Trip): { percentage: number; status: string; daysLeft?: number } {
    if (!trip.start_date || !trip.end_date) {
      return { percentage: 0, status: 'No dates set' };
    }

    const now = new Date();
    const startDate = new Date(trip.start_date);
    const endDate = new Date(trip.end_date);

    if (now < startDate) {
      const daysLeft = Math.ceil((startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return { percentage: 0, status: 'Upcoming', daysLeft };
    }

    if (now > endDate) {
      return { percentage: 100, status: 'Completed' };
    }

    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsed = now.getTime() - startDate.getTime();
    const percentage = Math.round((elapsed / totalDuration) * 100);

    return { percentage, status: 'In Progress' };
  }

  // Get trip summary
  getTripSummary(trip: Trip): string {
    const destinations = trip.trip_destinations?.length || 0;
    const destinationText = destinations === 1 ? '1 destination' : `${destinations} destinations`;
    
    return `${trip.duration} day ${trip.trip_type} trip to ${destinationText} for ${trip.travelers} ${trip.travelers === 1 ? 'person' : 'people'} with a budget of ₹${trip.budget.toLocaleString()}`;
  }
}

export default new TripService();
