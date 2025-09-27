const BaseModel = require('./BaseModel');

class Analytics extends BaseModel {
  constructor() {
    super('analytics_data');
  }

  // Get latest analytics data
  async getLatest() {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return { 
        data: data || {
          total_visitors: 0,
          monthly_growth: 0,
          average_rating: 0,
          total_reviews: 0,
          positive_sentiment: 0,
          neutral_sentiment: 0,
          negative_sentiment: 0
        }, 
        error: null 
      };
    } catch (error) {
      return { data: null, error };
    }
  }

  // Get complete analytics overview
  async getOverview() {
    try {
      const analyticsData = await this.getLatest();
      const topDestinations = await this.getTopDestinations();
      const monthlyVisitors = await this.getMonthlyVisitors();
      const demographics = await this.getDemographics();

      return {
        data: {
          analytics: analyticsData.data,
          topDestinations: topDestinations.data || [],
          monthlyVisitors: monthlyVisitors.data || [],
          demographics: demographics.data || []
        },
        error: null
      };
    } catch (error) {
      return { data: null, error };
    }
  }

  // Get top destinations
  async getTopDestinations() {
    try {
      const { data, error } = await this.supabase
        .from('top_destinations')
        .select('*')
        .order('visitors', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  // Get monthly visitors
  async getMonthlyVisitors() {
    try {
      const { data, error } = await this.supabase
        .from('monthly_visitors')
        .select('*')
        .order('month');

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  // Get demographics
  async getDemographics() {
    try {
      const { data, error } = await this.supabase
        .from('demographics')
        .select('*')
        .order('percentage', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }
}

module.exports = Analytics;
