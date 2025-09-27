const express = require('express');
const CulturalController = require('../controllers/CulturalController');
const { validateCulturalElement } = require('../middleware/validation');

const router = express.Router();
const culturalController = new CulturalController();

// GET all cultural elements
router.get('/', culturalController.getAllCulturalElements.bind(culturalController));

// GET cultural element by ID
router.get('/:id', culturalController.getCulturalElementById.bind(culturalController));

// GET detailed cultural element information
router.get('/:id/details', culturalController.getCulturalElementDetails.bind(culturalController));

// GET tribal communities specifically
router.get('/tribal/communities', culturalController.getTribalCommunities.bind(culturalController));

// GET cultural elements by category
router.get('/category/:category', culturalController.getCulturalElementsByCategory.bind(culturalController));

// GET search cultural elements
router.get('/search/query', culturalController.searchCulturalElements.bind(culturalController));

// POST new cultural element (admin only - add auth middleware later)
router.post('/', validateCulturalElement, culturalController.createCulturalElement.bind(culturalController));

// PUT update cultural element (admin only - add auth middleware later)
router.put('/:id', validateCulturalElement, culturalController.updateCulturalElement.bind(culturalController));

// DELETE cultural element (admin only - add auth middleware later)
router.delete('/:id', culturalController.deleteCulturalElement.bind(culturalController));

module.exports = router;
