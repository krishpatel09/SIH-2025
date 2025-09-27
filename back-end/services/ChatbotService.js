const { ConversationChain } = require('langchain/chains');
const { BufferMemory } = require('langchain/memory');
const { PromptTemplate } = require('@langchain/core/prompts');
const { Ollama } = require('@langchain/ollama');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

class ChatbotService {
  constructor() {
    this.conversationChains = new Map();
    this.llm = null;
    this.supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    this.initializeOllama();
  }

  

  async initializeOllama() {
    try {
      this.llm = new Ollama({
        model: process.env.OLLAMA_MODEL,
        baseUrl: process.env.OLLAMA_BASE_URL,
        temperature: 0.7,
        maxTokens: 512
      });
      console.log('✅ Ollama LLM initialized');
      console.log('OLLAMA_BASE_URL:', process.env.OLLAMA_BASE_URL);
console.log('OLLAMA_MODEL:', process.env.OLLAMA_MODEL);

    } catch (err) {
      console.error('❌ Ollama init error:', err.message);
      this.llm = null;
    }
  }
  

  async generateResponse(message, sessionId) {
    if (!this.llm) {
      return {
        bot: "AI model unavailable, try again later.",
        sessionId,
        timestamp: new Date().toISOString()
      };
    }

    let chain = this.conversationChains.get(sessionId);
    if (!chain) {
      chain = await this.createConversationChain(sessionId);
      this.conversationChains.set(sessionId, chain);
    }

    let botResponse = '';
    try {
      const result = await chain.call({ input: message });
      botResponse = result.response || result.text || "Sorry, I couldn't generate a response.";
    } catch (err) {
      console.error('❌ LLM error:', err);
      botResponse = "I apologize, but I'm having trouble processing your request right now.";
    }

    // Store messages in Supabase
    await this.storeMessages(sessionId, message, botResponse);

    return {
      bot: botResponse,
      sessionId,
      timestamp: new Date().toISOString()
    };
  }

  async createConversationChain(sessionId) {
    const memory = new BufferMemory({ returnMessages: true, memoryKey: 'chat_history' });

    // Load previous chat from Supabase
    try {
      const { data } = await this.supabase
        .from('chat_messages')
        .select('role, content')
        .eq('session_id', sessionId)
        .order('id', { ascending: true });

      if (data?.length) {
        memory.chatHistory = data.map(msg => ({
          role: msg.role === 'user' ? 'human' : 'ai',
          content: msg.content
        }));
      }
    } catch (err) {
      console.warn('⚠️ Could not load chat history:', err.message);
    }

    const prompt = PromptTemplate.fromTemplate(`
You are a helpful AI assistant for Jharkhand Tourism.
Keep the context of previous conversation.

Previous conversation:
{chat_history}

User: {input}
AI:
    `);

    return new ConversationChain({ llm: this.llm, memory, prompt });
  }

  async storeMessages(sessionId, userMessage, botMessage) {
    try {
      const messages = [
        { 
          session_id: sessionId, 
          role: 'user', 
          content: userMessage,
          timestamp: new Date().toISOString(),
          metadata: {}
        },
        { 
          session_id: sessionId, 
          role: 'assistant', 
          content: botMessage,
          timestamp: new Date().toISOString(),
          metadata: {}
        }
      ];
      const { error } = await this.supabase.from('chat_messages').insert(messages);
      if (error) console.warn('⚠️ DB insert error:', error.message);
    } catch (err) {
      console.warn('⚠️ Could not store messages:', err.message);
    }
  }

  async getChatHistory(sessionId) {
    try {
      const { data } = await this.supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('id', { ascending: true });
      return data || [];
    } catch (err) {
      console.error('❌ Fetch history error:', err.message);
      return [];
    }
  }

  clearSessionMemory(sessionId) {
    this.conversationChains.delete(sessionId);
  }

  async getStatus() {
    return {
      activeSessions: this.conversationChains.size,
      ollamaStatus: this.llm ? 'connected' : 'disconnected',
      modelName: process.env.OLLAMA_MODEL || 'llama2',
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = ChatbotService;
