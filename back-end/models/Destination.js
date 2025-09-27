const BaseModel = require('./BaseModel');

class Destination extends BaseModel {
  constructor() {
    super('destinations');
  }

  // Get destinations by category
  async findByCategory(category) {
    return await this.findByField('category', category, {
      orderBy: 'rating',
      orderDirection: { ascending: false }
    });
  }

  // Get destinations with coordinates for maps
  async findWithCoordinates() {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select(`
          id,
          name,
          title,
          image,
          rating,
          category,
          description,
          coordinates,
          distance
        `)
        .not('coordinates', 'is', null)
        .order('rating', { ascending: false });

      if (error) throw error;

      // Transform coordinates for frontend
      const transformedData = data.map(destination => ({
        ...destination,
        coordinates: destination.coordinates ? 
          [destination.coordinates.x, destination.coordinates.y] : 
          null
      }));

      return { data: transformedData, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  // Get destinations by category with coordinates
  async findByCategoryWithCoordinates(category) {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select(`
          id,
          name,
          title,
          image,
          rating,
          category,
          description,
          coordinates,
          distance
        `)
        .eq('category', category)
        .not('coordinates', 'is', null)
        .order('rating', { ascending: false });

      if (error) throw error;

      // Transform coordinates for frontend
      const transformedData = data.map(destination => ({
        ...destination,
        coordinates: destination.coordinates ? 
          [destination.coordinates.x, destination.coordinates.y] : 
          null
      }));

      return { data: transformedData, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  // Get map categories with counts
  async getMapCategories() {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('category')
        .not('coordinates', 'is', null);

      if (error) throw error;

      // Get unique categories with counts
      const categoryCounts = {};
      data.forEach(dest => {
        categoryCounts[dest.category] = (categoryCounts[dest.category] || 0) + 1;
      });

      const categories = Object.entries(categoryCounts).map(([name, count]) => ({
        name,
        count,
        color: this.getCategoryColor(name)
      }));

      // Add "All" category
      categories.unshift({
        name: "All",
        count: data.length,
        color: "bg-blue-500"
      });

      return { data: categories, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  // Helper function to get category colors
  getCategoryColor(category) {
    const colorMap = {
      'Hill Station': 'bg-green-500',
      'Wildlife': 'bg-orange-500',
      'Waterfall': 'bg-blue-500',
      'Religious': 'bg-purple-500',
      'Valley': 'bg-teal-500',
      'City': 'bg-gray-500'
    };
    return colorMap[category] || 'bg-gray-500';
  }
}

module.exports = Destination;

