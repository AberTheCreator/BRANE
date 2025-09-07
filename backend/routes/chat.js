const express = require("express");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

class SensayChatService {
  constructor(config) {
    this.config = config;
    this.activeChats = new Map();
  }

  async sendMessage(botId, message, userId, sessionId = null) {
    const sessionUuid = sessionId || uuidv4();

    try {
      const response = await axios.post(
        `${this.config.baseURL}/replicas/${botId}/chat/completions`,
        {
          content: message.trim()
        },
        {
          headers: {
            "X-ORGANIZATION-SECRET": this.config.apiKey,
            "X-API-Version": "2025-03-25",
            "X-USER-ID": userId,
            "Content-Type": "application/json"
          }
        }
      );

      const session = this.activeChats.get(sessionUuid) || {
        user_id: userId,
        bot_id: botId,
        messages: [],
        started_at: Date.now(),
        last_activity: Date.now()
      };

      session.messages.push({
        user: "user",
        text: message,
        timestamp: Date.now()
      });

      session.messages.push({
        user: "bot",
        text: response.data.content,
        timestamp: Date.now()
      });

      session.last_activity = Date.now();
      this.activeChats.set(sessionUuid, session);

      return {
        success: true,
        sensay_response: response.data,
        session_id: sessionUuid
      };
    } catch (error) {
      throw new Error(
        error.response?.data?.error || error.message
      );
    }
  }

  async getChatHistory(sessionId, limit = 50) {
    try {
      const response = await axios.get(
        `${this.config.baseURL}/replicas/${this.config.botId}/chat/history`,
        {
          headers: { 
            "X-ORGANIZATION-SECRET": this.config.apiKey,
            "X-API-Version": "2025-03-25",
            "X-USER-ID": sessionId
          },
          params: { limit }
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || error.message
      );
    }
  }

  async updateBotConfig(botId, config) {
    try {
      const response = await axios.put(
        `${this.config.baseURL}/replicas/${botId}/config`,
        config,
        {
          headers: { 
            "X-ORGANIZATION-SECRET": this.config.apiKey,
            "X-API-Version": "2025-03-25"
          }
        }
      );
      return {
        success: true,
        config: response.data
      };
    } catch (error) {
      throw new Error(
        error.response?.data?.error || error.message
      );
    }
  }

  getActiveSessions() {
    return Array.from(this.activeChats.entries()).map(
      ([sessionId, session]) => ({
        session_id: sessionId,
        user_id: session.user_id,
        bot_id: session.bot_id,
        message_count: session.messages.length,
        started_at: session.started_at,
        last_activity: session.last_activity,
        duration_minutes: Math.floor(
          (Date.now() - session.started_at) / 1000 / 60
        )
      })
    );
  }
}

const chatService = new SensayChatService({
  baseURL: process.env.SENSAY_API_BASE_URL || "https://api.sensay.io/v1",
  apiKey: process.env.SENSAY_API_KEY,
  botId: process.env.SENSAY_BOT_ID
});

router.post("/send", async (req, res) => {
  try {
    const { message, user_id, bot_id, session_id } = req.body;
    if (!message || !user_id) {
      return res.status(400).json({ error: "Message and user_id are required" });
    }
    const result = await chatService.sendMessage(
      bot_id || chatService.config.botId,
      message,
      user_id,
      session_id
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to send message", details: error.message });
  }
});

router.get("/history/:session_id", async (req, res) => {
  try {
    const { session_id } = req.params;
    const { limit } = req.query;
    const history = await chatService.getChatHistory(
      session_id,
      parseInt(limit) || 50
    );
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: "Failed to get chat history", details: error.message });
  }
});

router.get("/sessions", (req, res) => {
  try {
    const { user_id } = req.query;
    let sessions = chatService.getActiveSessions();
    if (user_id) {
      sessions = sessions.filter(session => session.user_id === user_id);
    }
    res.json({
      sessions,
      total: sessions.length,
      active_users: new Set(sessions.map(s => s.user_id)).size
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to get sessions", details: error.message });
  }
});

router.put("/bot/:bot_id/config", async (req, res) => {
  try {
    const { bot_id } = req.params;
    const config = req.body;
    const result = await chatService.updateBotConfig(bot_id, config);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to update bot config", details: error.message });
  }
});

router.post("/test", async (req, res) => {
  try {
    const testMessage = req.body.message || "Why are my conversion rates dropping?";
    const testUserId = req.body.user_id || "test_user_" + Date.now();
    const result = await chatService.sendMessage(
      chatService.config.botId,
      testMessage,
      testUserId
    );
    res.json({ test_scenario: "Causal analysis query", input_message: testMessage, user_id: testUserId, result });
  } catch (error) {
    res.status(500).json({ error: "Test chat failed", details: error.message });
  }
});

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const user_id = "frontend_user_" + Date.now();
    
    const result = await chatService.sendMessage(
      chatService.config.botId,
      message,
      user_id
    );
    
    res.json({
      response: result.sensay_response?.content || "I received your message!",
      session_id: result.session_id,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Chat error:", error.message);
    res.status(500).json({ 
      error: "Failed to process message", 
      details: error.message 
    });
  }
});

router.post("/working", async (req, res) => {
  const { message } = req.body;
  res.json({
    response: `Echo: ${message} - This is a test response while we debug Sensay.`,
    session_id: "test_session",
    timestamp: new Date().toISOString()
  });
});

module.exports = router;

