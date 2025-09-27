const express = require('express');
const MapController = require('../controllers/MapController');

const router = express.Router();
const mapController = new MapController();

// GET all map data
router.get('/', mapController.getAllMapData.bind(mapController));

// GET destinations by category for maps
router.get('/category/:category', mapController.getMapDataByCategory.bind(mapController));

// GET map categories
router.get('/categories', mapController.getMapCategories.bind(mapController));

module.exports = router;
