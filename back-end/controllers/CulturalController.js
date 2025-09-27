const CulturalElement = require('../models/CulturalElement');

class CulturalController {
  constructor() {
    this.culturalModel = new CulturalElement();
  }

  // Get all cultural elements
  async getAllCulturalElements(req, res) {
    try {
      const { data, error } = await this.culturalModel.findAll();

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        data: data,
        count: data.length
      });
    } catch (error) {
      console.error('Error fetching cultural elements:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch cultural elements',
        message: error.message
      });
    }
  }

  // Get cultural element by ID
  async getCulturalElementById(req, res) {
    try {
      const { id } = req.params;
      console.log("Fetching cultural element with ID:", id);
      
      const { data, error } = await this.culturalModel.findById(id);

      if (error) {
        throw error;
      }

      if (!data) {
        return res.status(404).json({
          success: false,
          error: 'Cultural element not found'
        });
      }

      res.json({
        success: true,
        data: data
      });
    } catch (error) {
      console.error('Error fetching cultural element:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch cultural element',
        message: error.message
      });
    }
  }

  // Get detailed cultural element information
  async getCulturalElementDetails(req, res) {
    try {
      const { category } = req.params;
      
      const { data, error } = await this.culturalModel.findWithDetails(category);

      if (error) {
        throw error;
      }

      if (!data) {
        return res.status(404).json({
          success: false,
          error: 'Cultural element not found'
        });
      }

      res.json({
        success: true,
        data: data
      });
    } catch (error) {
      console.error('Error fetching cultural element details:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch cultural element details',
        message: error.message
      });
    }
  }

  // Get tribal communities
  async getTribalCommunities(req, res) {
    try {
      const { data, error } = await this.culturalModel.getTribalCommunities();

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        data: data,
        count: data.length
      });
    } catch (error) {
      console.error('Error fetching tribal communities:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch tribal communities',
        message: error.message
      });
    }
  }

  // Get cultural elements by category
  async getCulturalElementsByCategory(req, res) {
    try {
      const { category } = req.params;
      
      const { data, error } = await this.culturalModel.findByCategory(category);

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        data: data,
        count: data.length,
        category: category
      });
    } catch (error) {
      console.error('Error fetching cultural elements by category:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch cultural elements by category',
        message: error.message
      });
    }
  }

  // Search cultural elements
  async searchCulturalElements(req, res) {
    try {
      const { q } = req.query;
      
      if (!q) {
        return res.status(400).json({
          success: false,
          error: 'Search query is required'
        });
      }

      const { data, error } = await this.culturalModel.search(q);

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        data: data,
        count: data.length,
        query: q
      });
    } catch (error) {
      console.error('Error searching cultural elements:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to search cultural elements',
        message: error.message
      });
    }
  }

  // Create new cultural element
  async createCulturalElement(req, res) {
    try {
      const culturalData = req.body;
      
      const { data, error } = await this.culturalModel.create(culturalData);

      if (error) {
        throw error;
      }

      res.status(201).json({
        success: true,
        data: data,
        message: 'Cultural element created successfully'
      });
    } catch (error) {
      console.error('Error creating cultural element:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create cultural element',
        message: error.message
      });
    }
  }

  // Update cultural element
  async updateCulturalElement(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const { data, error } = await this.culturalModel.update(id, updateData);

      if (error) {
        throw error;
      }

      if (!data) {
        return res.status(404).json({
          success: false,
          error: 'Cultural element not found'
        });
      }

      res.json({
        success: true,
        data: data,
        message: 'Cultural element updated successfully'
      });
    } catch (error) {
      console.error('Error updating cultural element:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update cultural element',
        message: error.message
      });
    }
  }

  // Delete cultural element
  async deleteCulturalElement(req, res) {
    try {
      const { id } = req.params;
      
      const { data, error } = await this.culturalModel.delete(id);

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        message: 'Cultural element deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting cultural element:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete cultural element',
        message: error.message
      });
    }
  }
}

module.exports = CulturalController;
