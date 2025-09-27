const Destination = require('../models/Destination');

class MapController {
  constructor() {
    this.destinationModel = new Destination();
  }

  // Get all map data
  async getAllMapData(req, res) {
    try {
      const { data, error } = await this.destinationModel.findWithCoordinates();

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        data: data,
        count: data.length
      });
    } catch (error) {
      console.error('Error fetching map data:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch map data',
        message: error.message
      });
    }
  }

  // Get destinations by category for maps
  async getMapDataByCategory(req, res) {
    try {
      const { category } = req.params;
      
      const { data, error } = await this.destinationModel.findByCategoryWithCoordinates(category);

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        data: data,
        count: data.length
      });
    } catch (error) {
      console.error('Error fetching map data by category:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch map data',
        message: error.message
      });
    }
  }

  // Get map categories
  async getMapCategories(req, res) {
    try {
      const { data, error } = await this.destinationModel.getMapCategories();

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        data: data
      });
    } catch (error) {
      console.error('Error fetching map categories:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch map categories',
        message: error.message
      });
    }
  }
}

module.exports = MapController;
