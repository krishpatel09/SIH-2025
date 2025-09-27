const express = require('express');
const FeatureController = require('../controllers/FeatureController');
const { validateFeature } = require('../middleware/validation');

const router = express.Router();
const featureController = new FeatureController();

// GET all features
router.get('/', featureController.getAllFeatures.bind(featureController));

// GET feature by ID
router.get('/:id', featureController.getFeatureById.bind(featureController));

// POST new feature (admin only - add auth middleware later)
router.post('/', validateFeature, featureController.createFeature.bind(featureController));

// PUT update feature (admin only - add auth middleware later)
router.put('/:id', validateFeature, featureController.updateFeature.bind(featureController));

// DELETE feature (admin only - add auth middleware later)
router.delete('/:id', featureController.deleteFeature.bind(featureController));

module.exports = router;
