const express = require('express');
const TribalController = require('../controllers/TribalController');

const router = express.Router();
const tribalController = new TribalController();

// GET all tribal communities
router.get('/', tribalController.getAllTribalCommunities.bind(tribalController));

// GET tribal community by ID
router.get('/:id', tribalController.getTribalCommunityById.bind(tribalController));

// GET tribal community by name
router.get('/name/:name', tribalController.getTribalCommunityByName.bind(tribalController));

// GET tribal communities by location
router.get('/location/:location', tribalController.getTribalCommunitiesByLocation.bind(tribalController));

// GET tribal communities by district
router.get('/district/:district', tribalController.getTribalCommunitiesByDistrict.bind(tribalController));

// GET search tribal communities
router.get('/search/query', tribalController.searchTribalCommunities.bind(tribalController));

// GET tribal communities with homestay
router.get('/homestay/available', tribalController.getTribalCommunitiesWithHomestay.bind(tribalController));

// GET tribal communities with cultural tours
router.get('/tours/cultural', tribalController.getTribalCommunitiesWithCulturalTours.bind(tribalController));

// POST new tribal community (admin only - add auth middleware later)
router.post('/', tribalController.createTribalCommunity.bind(tribalController));

// PUT update tribal community (admin only - add auth middleware later)
router.put('/:id', tribalController.updateTribalCommunity.bind(tribalController));

// DELETE tribal community (admin only - add auth middleware later)
router.delete('/:id', tribalController.deleteTribalCommunity.bind(tribalController));

module.exports = router;
