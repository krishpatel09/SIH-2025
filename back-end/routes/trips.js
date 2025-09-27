const express = require('express');
const router = express.Router();
const TripController = require('../controllers/TripController');
const auth = require('../middleware/auth');

// Create a new trip
router.post('/', auth.protect, TripController.createTrip);

// Get all trips for a user
router.get('/user/:userId', auth.protect, TripController.getUserTrips);

// Get trip by ID
router.get('/:id', auth.protect, TripController.getTripById);

// Update trip
router.put('/:id', auth.protect, TripController.updateTrip);

// Generate itinerary for trip
router.post('/:id/generate-itinerary', auth.protect, TripController.generateItinerary);

// Get trip statistics
router.get('/stats/:userId', auth.protect, TripController.getTripStats);

// Get destinations for trip planning
router.get('/destinations/planning', TripController.getDestinationsForPlanning);

// Delete trip
router.delete('/:id', auth.protect, TripController.deleteTrip);

module.exports = router;
