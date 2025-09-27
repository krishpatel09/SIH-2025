const express = require('express');
const AnalyticsController = require('../controllers/AnalyticsController');
const { validateAnalytics } = require('../middleware/validation');

const router = express.Router();
const analyticsController = new AnalyticsController();

// GET analytics overview
router.get('/overview', analyticsController.getAnalyticsOverview.bind(analyticsController));

// GET analytics data only
router.get('/data', analyticsController.getAnalyticsData.bind(analyticsController));

// GET top destinations
router.get('/top-destinations', analyticsController.getTopDestinations.bind(analyticsController));

// GET monthly visitors
router.get('/monthly-visitors', analyticsController.getMonthlyVisitors.bind(analyticsController));

// GET demographics
router.get('/demographics', analyticsController.getDemographics.bind(analyticsController));

// POST update analytics data (admin only - add auth middleware later)
router.post('/data', validateAnalytics, analyticsController.updateAnalyticsData.bind(analyticsController));

module.exports = router;
