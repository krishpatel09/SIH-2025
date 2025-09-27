const express = require('express');
const router = express.Router();
const WeatherService = require('../services/weatherService');

// Get current weather for coordinates
router.get('/current/:lat/:lon', async (req, res) => {
  try {
    const { lat, lon } = req.params;
    
    if (!lat || !lon) {
      return res.status(400).json({
        success: false,
        error: 'Latitude and longitude are required'
      });
    }

    const result = await WeatherService.getCurrentWeather(parseFloat(lat), parseFloat(lon));
    
    if (!result.success) {
      return res.status(500).json({
        success: false,
        error: result.error
      });
    }

    res.json({
      success: true,
      data: result.data
    });
  } catch (error) {
    console.error('Weather route error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get weather forecast for coordinates
router.get('/forecast/:lat/:lon', async (req, res) => {
  try {
    const { lat, lon } = req.params;
    
    if (!lat || !lon) {
      return res.status(400).json({
        success: false,
        error: 'Latitude and longitude are required'
      });
    }

    const result = await WeatherService.getForecast(parseFloat(lat), parseFloat(lon));
    
    if (!result.success) {
      return res.status(500).json({
        success: false,
        error: result.error
      });
    }

    res.json({
      success: true,
      data: result.data
    });
  } catch (error) {
    console.error('Forecast route error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get weather for Jharkhand destinations
router.get('/jharkhand', async (req, res) => {
  try {
    const result = await WeatherService.getJharkhandWeather();
    
    if (!result.success) {
      return res.status(500).json({
        success: false,
        error: result.error
      });
    }

    res.json({
      success: true,
      data: result.data
    });
  } catch (error) {
    console.error('Jharkhand weather route error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get best time to visit based on month
router.get('/best-time/:month', async (req, res) => {
  try {
    const { month } = req.params;
    const monthNum = parseInt(month);
    
    if (monthNum < 1 || monthNum > 12) {
      return res.status(400).json({
        success: false,
        error: 'Month must be between 1 and 12'
      });
    }

    const bestTime = WeatherService.getBestTimeToVisit(monthNum);
    
    res.json({
      success: true,
      data: bestTime
    });
  } catch (error) {
    console.error('Best time route error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

module.exports = router;
