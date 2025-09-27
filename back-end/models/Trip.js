const BaseModel = require('./BaseModel');

class Trip extends BaseModel {
  constructor() {
    super('trips');
  }

  // Create a new trip
  async create(tripData) {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .insert([tripData])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Trip create error:', error);
      return { data: null, error };
    }
  }

  // Update trip
  async update(id, updateData) {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Trip update error:', error);
      return { data: null, error };
    }
  }

  // Find trip by ID
  async findById(id) {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Trip findById error:', error);
      return { data: null, error };
    }
  }

  // Get trips by user ID with filters and pagination
  async findByUserId(userId, options = {}) {
    try {
      const { status, tripType, limit = 10, offset = 0 } = options;
      
      let query = this.supabase
        .from(this.tableName)
        .select('*', { count: 'exact' })
        .eq('user_id', userId);

      // Apply filters
      if (status) {
        query = query.eq('status', status);
      }
      if (tripType) {
        query = query.eq('trip_type', tripType);
      }

      // Apply pagination
      query = query
        .range(offset, offset + limit - 1)
        .order('created_at', { ascending: false });

      const { data, error, count } = await query;

      if (error) throw error;
      return { data, error: null, total: count };
    } catch (error) {
      console.error('Trip findByUserId error:', error);
      return { data: null, error, total: 0 };
    }
  }

  // Get trip with destinations and full details
  async findByIdWithDestinations(id) {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select(`
          *,
          trip_destinations (
            *,
            destinations (
              id,
              name,
              title,
              image,
              rating,
              category,
              temperature,
              best_time,
              description,
              highlights,
              coordinates
            )
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Trip findByIdWithDestinations error:', error);
      return { data: null, error };
    }
  }

  // Generate comprehensive trip statistics
  async getTripStats(userId) {
    try {
      // Get basic trip stats
      const { data: trips, error: tripsError } = await this.supabase
        .from(this.tableName)
        .select('status, budget, duration, trip_type, created_at')
        .eq('user_id', userId);

      if (tripsError) throw tripsError;

      // Calculate comprehensive statistics
      const stats = {
        totalTrips: trips.length,
        totalBudget: trips.reduce((sum, trip) => sum + (parseFloat(trip.budget) || 0), 0),
        totalDuration: trips.reduce((sum, trip) => sum + (parseInt(trip.duration) || 0), 0),
        averageDuration: trips.length > 0 ? trips.reduce((sum, trip) => sum + (parseInt(trip.duration) || 0), 0) / trips.length : 0,
        averageBudget: trips.length > 0 ? trips.reduce((sum, trip) => sum + (parseFloat(trip.budget) || 0), 0) / trips.length : 0,
        statusBreakdown: trips.reduce((acc, trip) => {
          acc[trip.status] = (acc[trip.status] || 0) + 1;
          return acc;
        }, {}),
        tripTypeBreakdown: trips.reduce((acc, trip) => {
          acc[trip.trip_type] = (acc[trip.trip_type] || 0) + 1;
          return acc;
        }, {}),
        monthlyBreakdown: this.calculateMonthlyBreakdown(trips),
        budgetRange: this.calculateBudgetRange(trips),
        durationRange: this.calculateDurationRange(trips)
      };

      return { data: stats, error: null };
    } catch (error) {
      console.error('Trip getTripStats error:', error);
      return { data: null, error };
    }
  }

  // Calculate monthly breakdown
  calculateMonthlyBreakdown(trips) {
    const monthlyData = {};
    const currentYear = new Date().getFullYear();
    
    // Initialize last 12 months
    for (let i = 11; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthlyData[monthKey] = { trips: 0, budget: 0 };
    }

    // Fill with actual data
    trips.forEach(trip => {
      const tripDate = new Date(trip.created_at);
      const monthKey = `${tripDate.getFullYear()}-${String(tripDate.getMonth() + 1).padStart(2, '0')}`;
      if (monthlyData[monthKey]) {
        monthlyData[monthKey].trips++;
        monthlyData[monthKey].budget += parseFloat(trip.budget) || 0;
      }
    });

    return monthlyData;
  }

  // Calculate budget range statistics
  calculateBudgetRange(trips) {
    if (trips.length === 0) return { min: 0, max: 0, median: 0 };

    const budgets = trips.map(trip => parseFloat(trip.budget) || 0).sort((a, b) => a - b);
    const median = budgets.length % 2 === 0 
      ? (budgets[budgets.length / 2 - 1] + budgets[budgets.length / 2]) / 2
      : budgets[Math.floor(budgets.length / 2)];

    return {
      min: Math.min(...budgets),
      max: Math.max(...budgets),
      median: median
    };
  }

  // Calculate duration range statistics
  calculateDurationRange(trips) {
    if (trips.length === 0) return { min: 0, max: 0, median: 0 };

    const durations = trips.map(trip => parseInt(trip.duration) || 0).sort((a, b) => a - b);
    const median = durations.length % 2 === 0 
      ? (durations[durations.length / 2 - 1] + durations[durations.length / 2]) / 2
      : durations[Math.floor(durations.length / 2)];

    return {
      min: Math.min(...durations),
      max: Math.max(...durations),
      median: median
    };
  }

  // Search trips with advanced filters
  async searchTrips(userId, searchOptions = {}) {
    try {
      const { 
        query, 
        status, 
        tripType, 
        minBudget, 
        maxBudget, 
        minDuration, 
        maxDuration,
        startDate,
        endDate,
        limit = 20,
        offset = 0 
      } = searchOptions;

      let supabaseQuery = this.supabase
        .from(this.tableName)
        .select(`
          *,
          trip_destinations (
            destinations (name, category)
          )
        `, { count: 'exact' })
        .eq('user_id', userId);

      // Apply text search
      if (query) {
        supabaseQuery = supabaseQuery.or(`name.ilike.%${query}%,description.ilike.%${query}%`);
      }

      // Apply filters
      if (status) supabaseQuery = supabaseQuery.eq('status', status);
      if (tripType) supabaseQuery = supabaseQuery.eq('trip_type', tripType);
      if (minBudget) supabaseQuery = supabaseQuery.gte('budget', minBudget);
      if (maxBudget) supabaseQuery = supabaseQuery.lte('budget', maxBudget);
      if (minDuration) supabaseQuery = supabaseQuery.gte('duration', minDuration);
      if (maxDuration) supabaseQuery = supabaseQuery.lte('duration', maxDuration);
      if (startDate) supabaseQuery = supabaseQuery.gte('start_date', startDate);
      if (endDate) supabaseQuery = supabaseQuery.lte('end_date', endDate);

      // Apply pagination and sorting
      supabaseQuery = supabaseQuery
        .range(offset, offset + limit - 1)
        .order('created_at', { ascending: false });

      const { data, error, count } = await supabaseQuery;

      if (error) throw error;
      return { data, error: null, total: count };
    } catch (error) {
      console.error('Trip searchTrips error:', error);
      return { data: null, error, total: 0 };
    }
  }

  // Get upcoming trips
  async getUpcomingTrips(userId, limit = 5) {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select(`
          *,
          trip_destinations (
            destinations (name, image)
          )
        `)
        .eq('user_id', userId)
        .gte('start_date', new Date().toISOString().split('T')[0])
        .eq('status', 'planned')
        .order('start_date', { ascending: true })
        .limit(limit);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Trip getUpcomingTrips error:', error);
      return { data: null, error };
    }
  }

  // Get trip recommendations based on user history
  async getTripRecommendations(userId) {
    try {
      // Get user's trip history
      const { data: userTrips, error: userTripsError } = await this.supabase
        .from(this.tableName)
        .select('trip_type, budget, duration')
        .eq('user_id', userId)
        .eq('status', 'completed');

      if (userTripsError) throw userTripsError;

      if (userTrips.length === 0) {
        return { data: this.getDefaultRecommendations(), error: null };
      }

      // Analyze user preferences
      const preferences = this.analyzeUserPreferences(userTrips);
      
      // Get destinations that match preferences
      const { data: destinations, error: destError } = await this.supabase
        .from('destinations')
        .select('*')
        .eq('category', preferences.favoriteType)
        .order('rating', { ascending: false })
        .limit(6);

      if (destError) throw destError;

      const recommendations = destinations.map(dest => ({
        destination: dest,
        recommendationScore: this.calculateRecommendationScore(dest, preferences),
        reason: this.getRecommendationReason(dest, preferences)
      }));

      return { data: recommendations, error: null };
    } catch (error) {
      console.error('Trip getTripRecommendations error:', error);
      return { data: this.getDefaultRecommendations(), error };
    }
  }

  // Analyze user preferences from trip history
  analyzeUserPreferences(trips) {
    const tripTypes = {};
    let totalBudget = 0;
    let totalDuration = 0;

    trips.forEach(trip => {
      tripTypes[trip.trip_type] = (tripTypes[trip.trip_type] || 0) + 1;
      totalBudget += parseFloat(trip.budget) || 0;
      totalDuration += parseInt(trip.duration) || 0;
    });

    const favoriteType = Object.keys(tripTypes).reduce((a, b) => 
      tripTypes[a] > tripTypes[b] ? a : b
    );

    return {
      favoriteType,
      averageBudget: totalBudget / trips.length,
      averageDuration: totalDuration / trips.length,
      tripCount: trips.length
    };
  }

  // Calculate recommendation score
  calculateRecommendationScore(destination, preferences) {
    let score = destination.rating * 20; // Base score from rating
    
    // Adjust for category match
    if (destination.category.toLowerCase() === preferences.favoriteType) {
      score += 30;
    }

    // Adjust for budget compatibility (assuming destination cost is reasonable)
    const estimatedCost = this.estimateDestinationCost(destination);
    if (estimatedCost <= preferences.averageBudget * 1.2) {
      score += 20;
    }

    return Math.min(100, Math.round(score));
  }

  // Get recommendation reason
  getRecommendationReason(destination, preferences) {
    const reasons = [];
    
    if (destination.category.toLowerCase() === preferences.favoriteType) {
      reasons.push(`Matches your favorite trip type: ${preferences.favoriteType}`);
    }
    
    if (destination.rating >= 4.5) {
      reasons.push('Highly rated destination');
    }
    
    const estimatedCost = this.estimateDestinationCost(destination);
    if (estimatedCost <= preferences.averageBudget) {
      reasons.push('Within your typical budget range');
    }

    return reasons.join(', ') || 'Popular destination in Jharkhand';
  }

  // Estimate destination cost
  estimateDestinationCost(destination) {
    const baseCosts = {
      'Hill Station': 3000,
      'Valley': 2500,
      'Wildlife': 4000,
      'Waterfall': 1500,
      'Religious': 2000,
      'City': 3500
    };

    return baseCosts[destination.category] || 2500;
  }

  // Get default recommendations for new users
  getDefaultRecommendations() {
    return [
      {
        destination: { name: 'Netarhat', category: 'Hill Station', rating: 4.8 },
        recommendationScore: 95,
        reason: 'Popular hill station perfect for first-time visitors'
      },
      {
        destination: { name: 'Hundru Falls', category: 'Waterfall', rating: 4.7 },
        recommendationScore: 90,
        reason: 'Beautiful waterfall, great for nature lovers'
      },
      {
        destination: { name: 'Deoghar', category: 'Religious', rating: 4.9 },
        recommendationScore: 88,
        reason: 'Sacred destination with rich cultural heritage'
      }
    ];
  }

  // Bulk operations for trip management
  async bulkUpdateTrips(tripIds, updateData) {
    try {
      updateData.updated_at = new Date().toISOString();
      
      const { data, error } = await this.supabase
        .from(this.tableName)
        .update(updateData)
        .in('id', tripIds)
        .select();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Trip bulkUpdateTrips error:', error);
      return { data: null, error };
    }
  }

  // Delete trip with related data cleanup
  async deleteTrip(id) {
    try {
      // Delete trip (cascade will handle related records due to foreign key constraints)
      const { error } = await this.supabase
        .from(this.tableName)
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true, error: null };
    } catch (error) {
      console.error('Trip deleteTrip error:', error);
      return { success: false, error };
    }
  }

  // Get trip analytics for admin/insights
  async getTripAnalytics(dateRange = 30) {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - dateRange);

      const { data, error } = await this.supabase
        .from(this.tableName)
        .select(`
          *,
          trip_destinations (
            destinations (category)
          )
        `)
        .gte('created_at', startDate.toISOString());

      if (error) throw error;

      const analytics = {
        totalTrips: data.length,
        totalBudget: data.reduce((sum, trip) => sum + (parseFloat(trip.budget) || 0), 0),
        averageBudget: data.length > 0 ? data.reduce((sum, trip) => sum + (parseFloat(trip.budget) || 0), 0) / data.length : 0,
        statusDistribution: this.calculateDistribution(data, 'status'),
        typeDistribution: this.calculateDistribution(data, 'trip_type'),
        transportDistribution: this.calculateDistribution(data, 'transport_mode'),
        accommodationDistribution: this.calculateDistribution(data, 'accommodation_type'),
        popularDestinations: this.calculateDestinationPopularity(data),
        budgetRanges: this.calculateBudgetRanges(data)
      };

      return { data: analytics, error: null };
    } catch (error) {
      console.error('Trip getTripAnalytics error:', error);
      return { data: null, error };
    }
  }

  // Helper method to calculate distribution
  calculateDistribution(data, field) {
    const distribution = {};
    data.forEach(item => {
      const value = item[field] || 'Unknown';
      distribution[value] = (distribution[value] || 0) + 1;
    });
    return distribution;
  }

  // Calculate destination popularity
  calculateDestinationPopularity(trips) {
    const destinations = {};
    trips.forEach(trip => {
      if (trip.trip_destinations) {
        trip.trip_destinations.forEach(td => {
          if (td.destinations) {
            const category = td.destinations.category;
            destinations[category] = (destinations[category] || 0) + 1;
          }
        });
      }
    });
    return destinations;
  }

  // Calculate budget ranges
  calculateBudgetRanges(trips) {
    const ranges = {
      'Under ₹5000': 0,
      '₹5000-₹10000': 0,
      '₹10000-₹20000': 0,
      '₹20000-₹50000': 0,
      'Above ₹50000': 0
    };

    trips.forEach(trip => {
      const budget = parseFloat(trip.budget) || 0;
      if (budget < 5000) ranges['Under ₹5000']++;
      else if (budget < 10000) ranges['₹5000-₹10000']++;
      else if (budget < 20000) ranges['₹10000-₹20000']++;
      else if (budget < 50000) ranges['₹20000-₹50000']++;
      else ranges['Above ₹50000']++;
    });

    return ranges;
  }

  // Generate itinerary for a trip
  async generateItinerary(tripId, preferences) {
    try {
      const { duration, budget, travelers, tripType, transportMode, accommodationType, destinations } = preferences;

      // Get trip details
      const { data: trip, error: tripError } = await this.supabase
        .from(this.tableName)
        .select('*')
        .eq('id', tripId)
        .single();

      if (tripError) throw tripError;

      // Get destination details
      const destinationModel = new (require('./Destination'))();
      const destinationPromises = destinations.map(destId => destinationModel.findById(destId));
      const destinationResults = await Promise.all(destinationPromises);
      const destinationData = destinationResults
        .filter(result => result.data)
        .map(result => result.data);

      // Generate itinerary based on preferences
      const itinerary = [];
      const packingList = {
        clothing: [],
        accessories: [],
        electronics: [],
        documents: [],
        toiletries: [],
        other: []
      };

      // Basic itinerary generation logic
      for (let day = 1; day <= duration; day++) {
        const dayDestinations = destinationData.slice((day - 1) * Math.ceil(destinationData.length / duration), day * Math.ceil(destinationData.length / duration));
        
        const dayPlan = {
          day: day,
          destinations: dayDestinations.map(dest => ({
            id: dest.id,
            name: dest.name,
            title: dest.title,
            arrivalTime: '09:00',
            departureTime: '17:00',
            activities: dest.highlights || [],
            estimatedCost: dest.cost || 0
          })),
          totalCost: dayDestinations.reduce((sum, dest) => sum + (dest.cost || 0), 0),
          transportCost: Math.round(budget * 0.3 / duration),
          accommodationCost: Math.round(budget * 0.4 / duration)
        };
        
        itinerary.push(dayPlan);
      }

      // Generate packing list based on trip type and duration
      if (tripType === 'adventure') {
        packingList.clothing = ['Hiking boots', 'Quick-dry clothes', 'Rain jacket', 'Warm layers'];
        packingList.accessories = ['Backpack', 'Water bottle', 'Sunscreen', 'Hat'];
      } else if (tripType === 'cultural') {
        packingList.clothing = ['Comfortable walking shoes', 'Modest clothing', 'Light jacket'];
        packingList.accessories = ['Camera', 'Guidebook', 'Comfortable bag'];
      } else {
        packingList.clothing = ['Casual clothes', 'Comfortable shoes', 'Light jacket'];
        packingList.accessories = ['Camera', 'Sunscreen', 'Water bottle'];
      }

      packingList.electronics = ['Phone', 'Charger', 'Power bank'];
      packingList.documents = ['ID', 'Travel insurance', 'Booking confirmations'];
      packingList.toiletries = ['Toothbrush', 'Toothpaste', 'Shampoo', 'Soap'];
      packingList.other = ['First aid kit', 'Snacks', 'Cash'];

      // Update trip with generated itinerary
      const { data: updatedTrip, error: updateError } = await this.supabase
        .from(this.tableName)
        .update({
          itinerary: itinerary,
          packing_list: Object.values(packingList).flat(),
          status: 'planned'
        })
        .eq('id', tripId)
        .select()
        .single();

      if (updateError) throw updateError;

      return {
        data: {
          itinerary: itinerary,
          packingList: packingList,
          trip: updatedTrip
        },
        error: null
      };
    } catch (error) {
      console.error('Generate itinerary error:', error);
      return {
        data: null,
        error: error.message || 'Failed to generate itinerary'
      };
    }
  }
}

module.exports = Trip;
