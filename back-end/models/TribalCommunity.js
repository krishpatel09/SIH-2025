const BaseModel = require('../models/BaseModel');

class TribalCommunity extends BaseModel {
  constructor() {
    super('tribal_communities');
  }

  // Get all tribal communities
  async findAll() {
    return await super.findAll({
      orderBy: 'name',
      orderDirection: { ascending: true }
    });
  }

  // Get tribal community by name
  async findByName(name) {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .ilike('name', `%${name}%`)
      .single();

    return { data, error };
  }

  // Get tribal communities by location
  async findByLocation(location) {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .contains('location', [location])
      .order('name', { ascending: true });

    return { data, error };
  }

  // Get tribal communities by district
  async findByDistrict(district) {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .contains('districts', [district])
      .order('name', { ascending: true });

    return { data, error };
  }

  // Search tribal communities
  async search(query) {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,language.ilike.%${query}%`)
      .order('name', { ascending: true });

    return { data, error };
  }

  // Get tribal communities with homestay
  async getWithHomestay() {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('homestay_available', true)
      .order('name', { ascending: true });

    return { data, error };
  }

  // Get tribal communities with cultural tours
  async getWithCulturalTours() {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('cultural_tours', true)
      .order('name', { ascending: true });

    return { data, error };
  }

  // Get detailed tribal community information
  async getDetailedInfo(id) {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single();

    return { data, error };
  }
}

module.exports = TribalCommunity;
