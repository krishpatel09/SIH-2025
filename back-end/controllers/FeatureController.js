const Feature = require('../models/Feature');

class FeatureController {
  constructor() {
    this.featureModel = new Feature();
  }

  // Get all features
  async getAllFeatures(req, res) {
    try {
      const { data, error } = await this.featureModel.findAll();

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        data: data,
        count: data.length
      });
    } catch (error) {
      console.error('Error fetching features:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch features',
        message: error.message
      });
    }
  }

  // Get feature by ID
  async getFeatureById(req, res) {
    try {
      const { id } = req.params;
      
      const { data, error } = await this.featureModel.findById(id);

      if (error) {
        throw error;
      }

      if (!data) {
        return res.status(404).json({
          success: false,
          error: 'Feature not found'
        });
      }

      res.json({
        success: true,
        data: data
      });
    } catch (error) {
      console.error('Error fetching feature:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch feature',
        message: error.message
      });
    }
  }

  // Create new feature
  async createFeature(req, res) {
    try {
      const featureData = req.body;
      
      const { data, error } = await this.featureModel.create(featureData);

      if (error) {
        throw error;
      }

      res.status(201).json({
        success: true,
        data: data,
        message: 'Feature created successfully'
      });
    } catch (error) {
      console.error('Error creating feature:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create feature',
        message: error.message
      });
    }
  }

  // Update feature
  async updateFeature(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const { data, error } = await this.featureModel.update(id, updateData);

      if (error) {
        throw error;
      }

      if (!data) {
        return res.status(404).json({
          success: false,
          error: 'Feature not found'
        });
      }

      res.json({
        success: true,
        data: data,
        message: 'Feature updated successfully'
      });
    } catch (error) {
      console.error('Error updating feature:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update feature',
        message: error.message
      });
    }
  }

  // Delete feature
  async deleteFeature(req, res) {
    try {
      const { id } = req.params;
      
      const { data, error } = await this.featureModel.delete(id);

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        message: 'Feature deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting feature:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete feature',
        message: error.message
      });
    }
  }
}

module.exports = FeatureController;
