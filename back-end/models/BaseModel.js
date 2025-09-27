const supabase = require('../config/supabase');

class BaseModel {
  constructor(tableName) {
    this.tableName = tableName;
    this.supabase = supabase;
  }

  // Get all records
  async findAll(options = {}) {
    try {
      let query = this.supabase.from(this.tableName).select('*');
      
      if (options.orderBy) {
        query = query.order(options.orderBy, options.orderDirection || { ascending: true });
      }
      
      if (options.limit) {
        query = query.limit(options.limit);
      }
      
      if (options.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }

      const { data, error } = await query;
      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  // Get record by ID
  async findById(id) {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  // Create new record
  async create(recordData) {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .insert([recordData])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  // Update record by ID
  async update(id, updateData) {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  // Delete record by ID
  async delete(id) {
    try {
      const { error } = await this.supabase
        .from(this.tableName)
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { data: { success: true }, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  // Find records by specific field
  async findByField(field, value, options = {}) {
    try {
      let query = this.supabase
        .from(this.tableName)
        .select('*')
        .eq(field, value);

      if (options.orderBy) {
        query = query.order(options.orderBy, options.orderDirection || { ascending: true });
      }

      const { data, error } = await query;
      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  // Count records
  async count(filters = {}) {
    try {
      let query = this.supabase.from(this.tableName).select('*', { count: 'exact', head: true });
      
      if (Object.keys(filters).length > 0) {
        Object.entries(filters).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }

      const { count, error } = await query;
      if (error) throw error;
      
      return { data: count, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }
}

module.exports = BaseModel;
