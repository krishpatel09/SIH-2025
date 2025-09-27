const supabase = require('../config/supabase');

class ChatSession {
  constructor() {
    this.tableName = 'chat_sessions';
  }

  /**
   * Create a new chat session
   */
  async create(sessionData) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .insert([{
          session_id: sessionData.sessionId,
          user_id: sessionData.userId || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating chat session:', error);
      throw error;
    }
  }

  /**
   * Get chat session by ID
   */
  async getById(sessionId) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('session_id', sessionId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error('Error getting chat session:', error);
      throw error;
    }
  }

  /**
   * Update chat session
   */
  async update(sessionId, updateData) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .update({
          ...updateData,
          updated_at: new Date().toISOString()
        })
        .eq('session_id', sessionId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating chat session:', error);
      throw error;
    }
  }

  /**
   * Delete chat session
   */
  async delete(sessionId) {
    try {
      const { error } = await supabase
        .from(this.tableName)
        .delete()
        .eq('session_id', sessionId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting chat session:', error);
      throw error;
    }
  }

  /**
   * Get sessions by user ID
   */
  async getByUserId(userId) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting sessions by user ID:', error);
      throw error;
    }
  }
}

module.exports = new ChatSession();
