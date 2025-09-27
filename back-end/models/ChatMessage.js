const supabase = require('../config/supabase');

class ChatMessage {
  constructor() {
    this.tableName = 'chat_messages';
  }

  /**
   * Create a new chat message
   */
  async create(messageData) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .insert([{
          session_id: messageData.sessionId,
          role: messageData.role,
          content: messageData.content,
          timestamp: messageData.timestamp || new Date().toISOString(),
          metadata: messageData.metadata || {}
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating chat message:', error);
      throw error;
    }
  }

  /**
   * Get messages by session ID
   */
  async getBySessionId(sessionId, limit = 50) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('session_id', sessionId)
        .order('timestamp', { ascending: true })
        .limit(limit);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting messages by session ID:', error);
      throw error;
    }
  }

  /**
   * Get recent messages by session ID
   */
  async getRecentBySessionId(sessionId, limit = 10) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('session_id', sessionId)
        .order('timestamp', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data.reverse(); // Reverse to get chronological order
    } catch (error) {
      console.error('Error getting recent messages:', error);
      throw error;
    }
  }

  /**
   * Delete messages by session ID
   */
  async deleteBySessionId(sessionId) {
    try {
      const { error } = await supabase
        .from(this.tableName)
        .delete()
        .eq('session_id', sessionId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting messages by session ID:', error);
      throw error;
    }
  }

  /**
   * Get message count by session ID
   */
  async getCountBySessionId(sessionId) {
    try {
      const { count, error } = await supabase
        .from(this.tableName)
        .select('*', { count: 'exact', head: true })
        .eq('session_id', sessionId);

      if (error) throw error;
      return count;
    } catch (error) {
      console.error('Error getting message count:', error);
      throw error;
    }
  }

  /**
   * Update message metadata
   */
  async updateMetadata(messageId, metadata) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .update({ metadata })
        .eq('id', messageId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating message metadata:', error);
      throw error;
    }
  }
}

module.exports = new ChatMessage();
