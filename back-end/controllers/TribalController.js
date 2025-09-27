const TribalCommunity = require('../models/TribalCommunity');

class TribalController {
  constructor() {
    this.tribalModel = new TribalCommunity();
  }

  // Get all tribal communities
  async getAllTribalCommunities(req, res) {
    try {
      const { data, error } = await this.tribalModel.findAll();

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

  // Get tribal community by ID
  async getTribalCommunityById(req, res) {
    try {
      const { id } = req.params;
      
      const { data, error } = await this.tribalModel.getDetailedInfo(id);

      if (error) {
        throw error;
      }

      if (!data) {
        return res.status(404).json({
          success: false,
          error: 'Tribal community not found'
        });
      }

      res.json({
        success: true,
        data: data
      });
    } catch (error) {
      console.error('Error fetching tribal community:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch tribal community',
        message: error.message
      });
    }
  }

  // Get tribal community by name
  async getTribalCommunityByName(req, res) {
    try {
      const { name } = req.params;
      
      const { data, error } = await this.tribalModel.findByName(name);

      if (error) {
        throw error;
      }

      if (!data) {
        return res.status(404).json({
          success: false,
          error: 'Tribal community not found'
        });
      }

      res.json({
        success: true,
        data: data
      });
    } catch (error) {
      console.error('Error fetching tribal community by name:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch tribal community',
        message: error.message
      });
    }
  }

  // Get tribal communities by location
  async getTribalCommunitiesByLocation(req, res) {
    try {
      const { location } = req.params;
      
      const { data, error } = await this.tribalModel.findByLocation(location);

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        data: data,
        count: data.length,
        location: location
      });
    } catch (error) {
      console.error('Error fetching tribal communities by location:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch tribal communities by location',
        message: error.message
      });
    }
  }

  // Get tribal communities by district
  async getTribalCommunitiesByDistrict(req, res) {
    try {
      const { district } = req.params;
      
      const { data, error } = await this.tribalModel.findByDistrict(district);

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        data: data,
        count: data.length,
        district: district
      });
    } catch (error) {
      console.error('Error fetching tribal communities by district:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch tribal communities by district',
        message: error.message
      });
    }
  }

  // Search tribal communities
  async searchTribalCommunities(req, res) {
    try {
      const { query } = req.query;
      
      if (!query) {
        return res.status(400).json({
          success: false,
          error: 'Search query is required'
        });
      }

      const { data, error } = await this.tribalModel.search(query);

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        data: data,
        count: data.length,
        query: query
      });
    } catch (error) {
      console.error('Error searching tribal communities:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to search tribal communities',
        message: error.message
      });
    }
  }

  // Get tribal communities with homestay
  async getTribalCommunitiesWithHomestay(req, res) {
    try {
      const { data, error } = await this.tribalModel.getWithHomestay();

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        data: data,
        count: data.length
      });
    } catch (error) {
      console.error('Error fetching tribal communities with homestay:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch tribal communities with homestay',
        message: error.message
      });
    }
  }

  // Get tribal communities with cultural tours
  async getTribalCommunitiesWithCulturalTours(req, res) {
    try {
      const { data, error } = await this.tribalModel.getWithCulturalTours();

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        data: data,
        count: data.length
      });
    } catch (error) {
      console.error('Error fetching tribal communities with cultural tours:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch tribal communities with cultural tours',
        message: error.message
      });
    }
  }

  // Create new tribal community
  async createTribalCommunity(req, res) {
    try {
      const tribalData = req.body;
      
      const { data, error } = await this.tribalModel.create(tribalData);

      if (error) {
        throw error;
      }

      res.status(201).json({
        success: true,
        data: data,
        message: 'Tribal community created successfully'
      });
    } catch (error) {
      console.error('Error creating tribal community:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create tribal community',
        message: error.message
      });
    }
  }

  // Update tribal community
  async updateTribalCommunity(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const { data, error } = await this.tribalModel.update(id, updateData);

      if (error) {
        throw error;
      }

      if (!data) {
        return res.status(404).json({
          success: false,
          error: 'Tribal community not found'
        });
      }

      res.json({
        success: true,
        data: data,
        message: 'Tribal community updated successfully'
      });
    } catch (error) {
      console.error('Error updating tribal community:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update tribal community',
        message: error.message
      });
    }
  }

  // Delete tribal community
  async deleteTribalCommunity(req, res) {
    try {
      const { id } = req.params;
      
      const { data, error } = await this.tribalModel.delete(id);

      if (error) {
        throw error;
      }

      res.json({
        success: true,
        message: 'Tribal community deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting tribal community:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete tribal community',
        message: error.message
      });
    }
  }
}

module.exports = TribalController;
