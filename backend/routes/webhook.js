const express = require('express');
const crypto = require('crypto');
const axios = require('axios');
const router = express.Router();

class SensayWebhookHandler {
  constructor(config) {
    this.config = config;
  }

  verifySignature(payload, signature, secret) {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  }

  async handleWebhook(req, res) {
    try {
      const signature = req.headers['x-sensay-signature'];
      const payload = req.body;

      if (this.config.webhookSecret && signature) {
        const isValid = this.verifySignature(
          JSON.stringify(payload),
          signature,
          this.config.webhookSecret
        );
        if (!isValid) {
          return res.status(401).json({ error: 'Invalid webhook signature' });
        }
      }

      const webhookData = typeof payload === 'string' ? JSON.parse(payload) : payload;
      const result = await this.routeWebhookEvent(webhookData);

      res.status(200).json({
        success: true,
        processed: true,
        webhook_id: webhookData.id || 'unknown',
        result
      });
    } catch (error) {
      res.status(500).json({
        error: 'Webhook processing failed',
        details: error.message
      });
    }
  }

  async routeWebhookEvent(data) {
    switch (data.event_type) {
      case 'message.received':
        return await this.handleMessageReceived(data);
      case 'intent.detected':
        return await this.handleIntentDetected(data);
      case 'conversation.started':
        return await this.handleConversationStarted(data);
      case 'analysis.requested':
        return await this.handleAnalysisRequested(data);
      case 'user.action':
        return await this.handleUserAction(data);
      default:
        return { processed: false, reason: 'Unknown event type' };
    }
  }

  async handleMessageReceived(data) {
    const messageText = data.message.text.toLowerCase();
    const triggerWords = ['why', 'what if', 'because', 'cause', 'reason', 'correlation', 'relationship'];
    const requiresAnalysis = triggerWords.some(word => messageText.includes(word));

    if (requiresAnalysis) {
      const insights = await this.analyzeQuery(messageText, data.user_id);
      await this.sendEnrichedResponse(data.session_id, insights);
      return { processed: true, analysis_triggered: true, insights_count: insights.length };
    }
    return { processed: true, analysis_triggered: false };
  }

  async handleIntentDetected(data) {
    const analysisIntents = [
      'data_analysis',
      'why_question',
      'what_if_scenario',
      'cause_effect_analysis',
      'correlation_request'
    ];
    if (analysisIntents.includes(data.intent.name)) {
      const insights = await this.analyzeIntent(data.intent, data.user_id);
      await this.sendEnrichedResponse(data.session_id, insights);
      return {
        processed: true,
        intent_name: data.intent.name,
        confidence: data.intent.confidence,
        enriched: true
      };
    }
    return { processed: true, enriched: false };
  }

  async handleConversationStarted(data) {
    return { processed: true, session_initialized: true, user_id: data.user_id };
  }

  async handleAnalysisRequested(data) {
    const insights = await this.performAnalysis(data.query, data.analysis_type, data.user_id);
    await this.sendEnrichedResponse(data.session_id, insights);
    return {
      processed: true,
      analysis_type: data.analysis_type,
      insights_generated: insights.length
    };
  }

  async handleUserAction() {
    return { processed: true, action_tracked: true };
  }

  async sendEnrichedResponse(sessionId, insights) {
    if (!insights || insights.length === 0) return;
    const enrichedMessage = this.formatInsightsForChat(insights);

    await axios.post(
      `${this.config.baseURL}/sessions/${sessionId}/messages`,
      {
        message: enrichedMessage,
        type: 'ai_analysis',
        metadata: {
          source: 'brane_ai',
          insights_count: insights.length,
          generated_at: Date.now()
        }
      },
      {
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return true;
  }

  formatInsightsForChat(insights) {
    if (insights.length === 0) return "I analyzed your question but couldn't find significant patterns.";
    const topInsight = insights[0];
    let message = `Based on analysis, I found: ${topInsight.description}`;
    if (insights.length > 1) {
      message += `\n\nI also found ${insights.length - 1} additional insights. Would you like me to elaborate?`;
    }
    message += `\n\nConfidence: ${Math.round(topInsight.confidence * 100)}%`;
    return message;
  }

  async analyzeQuery(query, userId) {
    const response = await axios.post(
      `${this.config.baseURL}/analysis/query`,
      { query, user_id: userId },
      { headers: { Authorization: `Bearer ${this.config.apiKey}` } }
    );
    return response.data.insights || [];
  }

  async analyzeIntent(intent, userId) {
    const response = await axios.post(
      `${this.config.baseURL}/analysis/intent`,
      { intent, user_id: userId },
      { headers: { Authorization: `Bearer ${this.config.apiKey}` } }
    );
    return response.data.insights || [];
  }

  async performAnalysis(query, analysisType, userId) {
    const response = await axios.post(
      `${this.config.baseURL}/analysis`,
      { query, analysis_type: analysisType, user_id: userId },
      { headers: { Authorization: `Bearer ${this.config.apiKey}` } }
    );
    return response.data.insights || [];
  }
}

const webhookHandler = new SensayWebhookHandler({
  baseURL: process.env.SENSAY_BASE_URL || 'https://api.sensay.io/v1',
  apiKey: process.env.SENSAY_API_KEY,
  webhookSecret: process.env.SENSAY_WEBHOOK_SECRET
});

router.post('/sensay', express.raw({ type: 'application/json' }), async (req, res) => {
  await webhookHandler.handleWebhook(req, res);
});

router.get('/sensay/status', (req, res) => {
  res.json({
    webhook_handler: 'active',
    supported_events: [
      'message.received',
      'intent.detected',
      'conversation.started',
      'analysis.requested',
      'user.action'
    ],
    causal_analysis: 'enabled',
    enrichment: 'active',
    timestamp: Date.now()
  });
});

module.exports = router;
