const Analytics = require('../models/Analytics');

class AnalyticsController {
  constructor() {
    this.analyticsModel = new Analytics();
  }

  // Get analytics overview
  async getAnalyticsOverview(req, res) {
    try {
      const { data, error } = await this.analyticsModel.getOverview();

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        data: data
      });
    } catch (error) {
      console.error('Error fetching analytics overview:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch analytics overview',
        message: error.message
      });
    }
  }

  // Get analytics data only
  async getAnalyticsData(req, res) {
    try {
      const { data, error } = await this.analyticsModel.getLatest();

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        data: data
      });
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch analytics data',
        message: error.message
      });
    }
  }

  // Get top destinations
  async getTopDestinations(req, res) {
    try {
      const { data, error } = await this.analyticsModel.getTopDestinations();

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        data: data || []
      });
    } catch (error) {
      console.error('Error fetching top destinations:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch top destinations',
        message: error.message
      });
    }
  }

  // Get monthly visitors
  async getMonthlyVisitors(req, res) {
    try {
      const { data, error } = await this.analyticsModel.getMonthlyVisitors();

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        data: data || []
      });
    } catch (error) {
      console.error('Error fetching monthly visitors:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch monthly visitors',
        message: error.message
      });
    }
  }

  // Get demographics
  async getDemographics(req, res) {
    try {
      const { data, error } = await this.analyticsModel.getDemographics();

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        data: data || []
      });
    } catch (error) {
      console.error('Error fetching demographics:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch demographics',
        message: error.message
      });
    }
  }

  // Update analytics data
  async updateAnalyticsData(req, res) {
    try {
      const analyticsData = req.body;
      
      const { data, error } = await this.analyticsModel.create(analyticsData);

      if (error) {
        throw error;
      }

      res.status(201).json({
        success: true,
        data: data,
        message: 'Analytics data updated successfully'
      });
    } catch (error) {
      console.error('Error updating analytics data:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update analytics data',
        message: error.message
      });
    }
  }
}

module.exports = AnalyticsController;
