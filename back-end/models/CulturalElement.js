const BaseModel = require('./BaseModel');

class CulturalElement extends BaseModel {
  constructor() {
    super('cultural_elements');
  }

  // Get all cultural elements ordered by creation date
  async findAll() {
    return await super.findAll({
      orderBy: 'created_at',
      orderDirection: { ascending: true }
    });
  }

  // Get cultural elements by category (e.g., 'Tribal Communities')
  async findByCategory(category) {
    return await super.findAll({
      where: { category: category },
      orderBy: 'created_at',
      orderDirection: { ascending: true }
    });
  }

  // Get detailed tribal community information
  async getTribalCommunities() {
    return await super.findAll({
      where: { category: 'Tribal Communities' },
      orderBy: 'created_at',
      orderDirection: { ascending: true }
    });
  }

  // Search cultural elements by title or description
  async search(query) {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .order('created_at', { ascending: true });

    return { data, error };
  }

  // Get cultural elements with detailed information
  async findWithDetails(id) {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single();

    return { data, error };
  }
}

module.exports = CulturalElement;
