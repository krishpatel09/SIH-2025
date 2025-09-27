const Destination = require('../models/Destination');

class DestinationController {
  constructor() {
    this.destinationModel = new Destination();
  }

  // Get all destinations
  async getAllDestinations(req, res) {
    try {
      const { data, error } = await this.destinationModel.findAll({
        orderBy: 'rating',
        orderDirection: { ascending: false }
      });

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        data: data,
        count: data.length
      });
    } catch (error) {
      console.error('Error fetching destinations:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch destinations',
        message: error.message
      });
    }
  }

  // Get destination by ID
  async getDestinationById(req, res) {
    try {
      const { id } = req.params;
      
      const { data, error } = await this.destinationModel.findById(id);

      if (error) {
        throw error;
      }

      if (!data) {
        return res.status(404).json({
          success: false,
          error: 'Destination not found'
        });
      }

      res.json({
        success: true,
        data: data
      });
    } catch (error) {
      console.error('Error fetching destination:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch destination',
        message: error.message
      });
    }
  }

  // Get destinations by category
  async getDestinationsByCategory(req, res) {
    try {
      const { category } = req.params;
      
      const { data, error } = await this.destinationModel.findByCategory(category);

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        data: data,
        count: data.length
      });
    } catch (error) {
      console.error('Error fetching destinations by category:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch destinations',
        message: error.message
      });
    }
  }

  // Create new destination
  async createDestination(req, res) {
    try {
      const destinationData = req.body;
      
      const { data, error } = await this.destinationModel.create(destinationData);

      if (error) {
        throw error;
      }

      res.status(201).json({
        success: true,
        data: data,
        message: 'Destination created successfully'
      });
    } catch (error) {
      console.error('Error creating destination:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create destination',
        message: error.message
      });
    }
  }

  // Update destination
  async updateDestination(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const { data, error } = await this.destinationModel.update(id, updateData);

      if (error) {
        throw error;
      }

      if (!data) {
        return res.status(404).json({
          success: false,
          error: 'Destination not found'
        });
      }

      res.json({
        success: true,
        data: data,
        message: 'Destination updated successfully'
      });
    } catch (error) {
      console.error('Error updating destination:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update destination',
        message: error.message
      });
    }
  }

  // Delete destination
  async deleteDestination(req, res) {
    try {
      const { id } = req.params;
      
      const { data, error } = await this.destinationModel.delete(id);

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        message: 'Destination deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting destination:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete destination',
        message: error.message
      });
    }
  }
}   

module.exports = DestinationController;


