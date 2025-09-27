const Trip = require('../models/Trip');
const Destination = require('../models/Destination');

// Create a new trip
const createTrip = async (req, res) => {
  try {
    const {
      name,
      description,
      duration,
      budget,
      travelers,
      tripType,
      transportMode,
      accommodationType,
      destinations,
      startDate,
      endDate,
      userId
    } = req.body;

    console.log('Creating trip:', req.body);

    // Validate required fields
    if (!name || !duration || !budget || !userId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, duration, budget, userId'
      });
    }

    // Create trip data
    const tripData = {
      name,
      description: description || '',
      duration,
      budget,
      travelers: travelers || 1,
      trip_type: tripType || 'adventure',
      transport_mode: transportMode || 'car',
      accommodation_type: accommodationType || 'hotel',
      status: 'draft',
      start_date: startDate || null,
      end_date: endDate || null,
      user_id: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const tripModel = new Trip();
    const result = await tripModel.create(tripData);
    
    if (result.error) {
      return res.status(500).json({
        success: false,
        error: 'Failed to create trip'
      });
    }

    // Add destinations to trip if provided
    if (destinations && destinations.length > 0) {
      await addDestinationsToTrip(result.data.id, destinations);
    }

    res.status(201).json({
      success: true,
      data: result.data,
      message: 'Trip created successfully'
    });
  } catch (error) {
    console.error('Create trip error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// Get all trips for a user
const getUserTrips = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status, tripType, limit = 10, offset = 0 } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      });
    }

    const tripModel = new Trip();
    const result = await tripModel.findByUserId(userId, { status, tripType, limit, offset });
    
    if (result.error) {
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch trips'
      });
    }

    res.json({
      success: true,
      data: result.data,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        total: result.total || result.data.length
      }
    });
  } catch (error) {
    console.error('Get user trips error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// Get trip by ID
const getTripById = async (req, res) => {
  try {
    const { id } = req.params;

    const tripModel = new Trip();
    const result = await tripModel.findByIdWithDestinations(id);
    
    if (result.error) {
      return res.status(404).json({
        success: false,
        error: 'Trip not found'
      });
    }

    res.json({
      success: true,
      data: result.data
    });
  } catch (error) {
    console.error('Get trip error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// Update trip
const updateTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove fields that shouldn't be updated directly
    delete updateData.id;
    delete updateData.created_at;
    updateData.updated_at = new Date().toISOString();

    const tripModel = new Trip();
    const result = await tripModel.update(id, updateData);
    
    if (result.error) {
      return res.status(500).json({
        success: false,
        error: 'Failed to update trip'
      });
    }

    res.json({
      success: true,
      data: result.data,
      message: 'Trip updated successfully'
    });
  } catch (error) {
    console.error('Update trip error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// Generate itinerary
const generateItinerary = async (req, res) => {
  try {
    const { id } = req.params;
    const preferences = req.body;

    const tripModel = new Trip();
    const result = await tripModel.generateItinerary(id, preferences);
    
    if (result.error) {
      return res.status(500).json({
        success: false,
        error: 'Failed to generate itinerary'
      });
    }

    res.json({
      success: true,
      data: result.data,
      message: 'Itinerary generated successfully'
    });
  } catch (error) {
    console.error('Generate itinerary error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// Get trip statistics
const getTripStats = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      });
    }

    const result = await Trip.getTripStats(userId);
    
    if (result.error) {
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch trip statistics'
      });
    }

    res.json({
      success: true,
      data: result.data
    });
  } catch (error) {
    console.error('Get trip stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// Get destinations for trip planning
const getDestinationsForPlanning = async (req, res) => {
  try {
    const { tripType, budget, duration, category } = req.query;

    let filters = {};
    
    // Only apply category filter if it matches existing categories
    // Available categories: Religious, Hill Station, Waterfall, Wildlife, Valley, City
    const validCategories = ["Religious", "Hill Station", "Waterfall", "Wildlife", "Valley", "City"];
    
    if (category && validCategories.includes(category)) {
      filters.category = category;
    } else if (tripType) {
      // Map trip types to relevant categories
      const tripTypeMapping = {
        "adventure": ["Waterfall", "Wildlife", "Valley"],
        "cultural": ["Religious", "City"],
        "nature": ["Hill Station", "Waterfall", "Wildlife", "Valley"],
        "religious": ["Religious"],
        "family": ["City", "Hill Station", "Valley"],
        "romantic": ["Hill Station", "Valley"]
      };
      
      if (tripTypeMapping[tripType]) {
        // For now, let's return all destinations and let the frontend filter
        // This ensures users always have options to choose from
        filters = {};
      }
    }

    const destinationModel = new Destination();
    const result = await destinationModel.findAll({ filters });
    
    if (result.error) {
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch destinations'
      });
    }

    // Format destinations for trip planning
    const formattedDestinations = result.data.map(dest => ({
      id: dest.id,
      name: dest.name,
      title: dest.title,
      type: dest.category,
      rating: dest.rating,
      cost: calculateDestinationCost(dest, duration, budget),
      duration: calculateDestinationDuration(dest, duration),
      image: dest.image,
      description: dest.description,
      highlights: dest.highlights,
      bestTime: dest.best_time,
      temperature: dest.temperature
    }));

    res.json({
      success: true,
      data: formattedDestinations,
      filters: { tripType, budget, duration, category }
    });
  } catch (error) {
    console.error('Get destinations for planning error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};
const deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Trip.deleteTrip(id);
    
    if (!result.success) {
      return res.status(500).json({
        success: false,
        error: 'Failed to delete trip'
      });
    }

    res.json({
      success: true,
      message: 'Trip deleted successfully'
    });
  } catch (error) {
    console.error('Delete trip error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// Helper functions
const calculateDestinationCost = (destination, duration = 3, totalBudget = 10000) => {
  const baseCosts = {
    'Hill Station': 2000,
    'Valley': 1500,
    'Wildlife': 2500,
    'Waterfall': 800,
    'Religious': 1200,
    'City': 1800
  };

  const baseCost = baseCosts[destination.category] || 1500;
  const ratingMultiplier = (destination.rating || 4) / 5;
  
  return Math.round(baseCost * ratingMultiplier);
};

const calculateDestinationDuration = (destination, totalDuration = 3) => {
  const durationMap = {
    'Hill Station': '2 days',
    'Valley': '1 day',
    'Wildlife': '2 days',
    'Waterfall': '1 day',
    'Religious': '1 day',
    'City': '2 days'
  };

  return durationMap[destination.category] || '1 day';
};

const addDestinationsToTrip = async (tripId, destinationIds) => {
  try {
    const supabase = require('../config/supabase');
    
    const tripDestinations = destinationIds.map(destId => ({
      trip_id: tripId,
      destination_id: destId,
      created_at: new Date().toISOString()
    }));

    const { error } = await supabase
      .from('trip_destinations')
      .insert(tripDestinations);

    if (error) throw error;
  } catch (error) {
    console.error('Add destinations to trip error:', error);
    throw error;
  }
};

module.exports = {
  createTrip,
  getUserTrips,
  getTripById,
  updateTrip,
  generateItinerary,
  getTripStats,
  getDestinationsForPlanning,
  deleteTrip
};
