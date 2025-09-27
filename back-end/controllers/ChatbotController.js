const ChatbotService = require('../services/ChatbotService');

class ChatbotController {
  constructor() {
    this.chatService = new ChatbotService();
  }

  // Main chat endpoint
  async sendMessage(req, res) {
    try {
      const { sessionId, message } = req.body;
      console.log('SessionId:', sessionId);
      console.log('Message:', message);
      
      if (!sessionId || !message) {
        return res.status(400).json({ 
          error: 'SessionId and message are required' 
        });
      }

      // Generate response using ChatbotService
      const response = await this.chatService.generateResponse(message, sessionId);

      res.json({
        success: true,
        data: {
          response: response.bot,
          sessionId: response.sessionId,
          timestamp: response.timestamp
        }
      });
    } catch (error) {
      console.error('Error in sendMessage:', error);
      res.status(500).json({ 
        success: false,
        error: 'Failed to generate response',
        data: { 
          error: error.message || "Sorry, I encountered an error. Please try again.",
          sessionId: req.body.sessionId || null,
          timestamp: new Date().toISOString()
        }
      });
    }
  }

  async getChatHistory(req, res) {
    try {
      const { sessionId } = req.params;
      if (!sessionId) return res.status(400).json({ success: false, error: 'SessionId required' });

      const history = await this.chatService.getChatHistory(sessionId);

      res.json({
        success: true,
        data: {
          sessionId,
          chatHistory: history,
          timestamp: new Date().toISOString()
        }
      });

    } catch (error) {
      console.error('Get chat history error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async clearChatHistory(req, res) {
    try {
      const { sessionId } = req.params;
      if (!sessionId) return res.status(400).json({ success: false, error: 'SessionId required' });

      // Clear the session memory
      this.chatService.clearSessionMemory(sessionId);

      res.json({
        success: true,
        data: {
          sessionId,
          message: 'Chat history cleared',
          timestamp: new Date().toISOString()
        }
      });

    } catch (error) {
      console.error('Clear chat history error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async getStatus(req, res) {
    try {
      const status = await this.chatService.getStatus();
      
      res.json({
        success: true,
        data: {
          ...status,
          timestamp: new Date().toISOString()
        }
      });

    } catch (error) {
      console.error('Get status error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

}

module.exports = ChatbotController;
