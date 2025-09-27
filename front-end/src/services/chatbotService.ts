import { API_BASE_URL, API_PATHS } from './apiPath';
import axios from 'axios';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  success: boolean;
  data: {
    response: string;
    sessionId: string;
    chatHistory: ChatMessage[];
    relevantDocs: any[];
    timestamp: string;
  };
  error?: string;
}

export interface KnowledgeSearchResponse {
  success: boolean;
  data: {
    query: string;
    results: Array<{
      content: string;
      metadata: any;
      distance: number;
    }>;
    totalResults: number;
    timestamp: string;
  };
  error?: string;
}

export interface DocumentAddResponse {
  success: boolean;
  data: {
    documentId: string;
    message: string;
    timestamp: string;
  };
  error?: string;
}

class ChatbotService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  /**
   * Send a message to the chatbot
   */
  async sendMessage(
    message: string,
    sessionId: string,
    userId?: string,
    chatHistory?: ChatMessage[]
  ): Promise<ChatResponse> {
    try {
      const response = await axios.post(
        `${this.baseUrl}${API_PATHS.CHATBOT.SEND_MESSAGE}`,
        {
          message,
          sessionId,
          userId,
          chatHistory
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Error sending message:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to send message',
        data: {
          response: 'I apologize, but I\'m having trouble processing your request right now.',
          sessionId,
          chatHistory: chatHistory || [],
          relevantDocs: [],
          timestamp: new Date().toISOString()
        }
      };
    }
  }

  /**
   * Get chat history for a session
   */
  async getChatHistory(sessionId: string, userId?: string): Promise<any> {
    try {
      const params = new URLSearchParams();
      if (userId) params.append('userId', userId);

      const response = await axios.get(
        `${this.baseUrl}${API_PATHS.CHATBOT.GET_HISTORY(sessionId)}?${params.toString()}`
      );

      return response.data;
    } catch (error: any) {
      console.error('Error getting chat history:', error);
      throw new Error(error.response?.data?.error || 'Failed to get chat history');
    }
  }

  /**
   * Clear chat history for a session
   */
  async clearChatHistory(sessionId: string, userId?: string): Promise<any> {
    try {
      const response = await axios.delete(
        `${this.baseUrl}${API_PATHS.CHATBOT.CLEAR_HISTORY(sessionId)}`,
        {
          data: { userId }
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Error clearing chat history:', error);
      throw new Error(error.response?.data?.error || 'Failed to clear chat history');
    }
  }

  /**
   * Add a document to the knowledge base
   */
  async addDocument(
    content: string,
    metadata?: any,
    token?: string
  ): Promise<DocumentAddResponse> {
    try {
      const headers: any = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await axios.post(
        `${this.baseUrl}${API_PATHS.CHATBOT.ADD_DOCUMENT}`,
        {
          content,
          metadata
        },
        { headers }
      );

      return response.data;
    } catch (error: any) {
      console.error('Error adding document:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to add document',
        data: {
          documentId: '',
          message: 'Failed to add document',
          timestamp: new Date().toISOString()
        }
      };
    }
  }

  /**
   * Search the knowledge base
   */
  async searchKnowledge(
    query: string,
    limit: number = 5
  ): Promise<KnowledgeSearchResponse> {
    try {
      const params = new URLSearchParams({
        query,
        limit: limit.toString()
      });

      const response = await axios.get(
        `${this.baseUrl}${API_PATHS.CHATBOT.SEARCH_KNOWLEDGE}?${params.toString()}`
      );

      return response.data;
    } catch (error: any) {
      console.error('Error searching knowledge base:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to search knowledge base',
        data: {
          query,
          results: [],
          totalResults: 0,
          timestamp: new Date().toISOString()
        }
      };
    }
  }

  /**
   * Initialize the chatbot service
   */
  async initializeChatbot(token?: string): Promise<any> {
    try {
      const headers: any = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await axios.post(
        `${this.baseUrl}${API_PATHS.CHATBOT.INITIALIZE}`,
        {},
        { headers }
      );

      return response.data;
    } catch (error: any) {
      console.error('Error initializing chatbot:', error);
      throw new Error(error.response?.data?.error || 'Failed to initialize chatbot');
    }
  }

  /**
   * Get chatbot status
   */
  async getStatus(): Promise<any> {
    try {
      const response = await axios.get(
        `${this.baseUrl}${API_PATHS.CHATBOT.GET_STATUS}`
      );

      return response.data;
    } catch (error: any) {
      console.error('Error getting chatbot status:', error);
      throw new Error(error.response?.data?.error || 'Failed to get chatbot status');
    }
  }
}

// Export singleton instance
export const chatbotService = new ChatbotService();
export default chatbotService;
