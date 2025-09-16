import React, { useState, useEffect, useRef } from 'react';
import { Brain, X, Send, AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { braneAPI } from '../services/api';

const Chatbot = ({ setShowChatbot }) => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "Hi! I'm Brane, your AI-powered data intelligence assistant. I can help you discover insights, analyze patterns, and answer complex questions about your data. Try asking me something!",
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      setError(null);
      const response = await braneAPI.testConnection();
      setIsConnected(true);
      setSessionId(response.session_id || `session_${Date.now()}`);
      console.log('✅ Connection successful:', response);
    } catch (err) {
      setIsConnected(false);
      setError('Unable to connect to Brane AI. Using demo mode.');
      setSessionId(`demo_session_${Date.now()}`);
      console.error('❌ Connection failed:', err);
    }
  };

  const sendMessage = async (messageOverride) => {
    const messageToSend = messageOverride ?? inputMessage.trim();
    if (!messageToSend) return;

    setInputMessage('');
    setMessages((prev) => [...prev, { type: 'user', content: messageToSend }]);
    setIsTyping(true);
    setError(null);

    try {
      let response;
      
      if (isConnected) {
        
        try {
          response = await braneAPI.sendMessage({
            message: messageToSend,
          });
        } catch (apiError) {
          console.warn('Real API failed, using test endpoint:', apiError.message);
         
          response = await braneAPI.testConnection();
          response.response = `Echo: ${messageToSend} - This is a test response while we debug the connection.`;
        }
      } else {
        
        response = {
          response: `Demo Response: Thanks for asking "${messageToSend}". In a real scenario, I would analyze your data and provide insights about patterns, correlations, and causal relationships. This is currently running in demo mode.`,
          session_id: sessionId,
          timestamp: new Date().toISOString()
        };
      }

      const botResponse = response?.response || response?.content || 'I received your message but had trouble generating a response.';

      setIsTyping(false);
      setMessages((prev) => [...prev, { type: 'bot', content: botResponse }]);

      if (response?.session_id && response.session_id !== sessionId) {
        setSessionId(response.session_id);
      }

    } catch (err) {
      setIsTyping(false);
      setError('Failed to get response. Please try again.');
      console.error('Send message error:', err);

      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          content: 'Sorry, I encountered an error. Please try again or check your connection.',
          isError: true,
        },
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion);
  };

  const retryConnection = () => {
    testConnection();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-blue-900 p-4 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Brane AI Assistant</h3>
            <p className="text-gray-300 text-sm flex items-center space-x-2">
              {isConnected ? (
                <>
                  <Wifi className="w-4 h-4" />
                  <span>Online • Ready to help with data intelligence</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-4 h-4" />
                  <span>Demo Mode • Limited functionality</span>
                </>
              )}
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowChatbot(false)}
          className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {error && (
        <div className="bg-yellow-900 border-b border-yellow-700 p-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-100 text-sm">{error}</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={retryConnection}
              className="text-yellow-400 hover:text-yellow-200 text-sm underline"
            >
              Retry
            </button>
            <button
              onClick={() => setError(null)}
              className="text-yellow-400 hover:text-yellow-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.type === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                message.type === 'user'
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                  : message.isError
                  ? 'bg-red-900 text-red-100 border border-red-700'
                  : 'bg-gray-800 text-gray-100 border border-gray-700'
              }`}
            >
              {message.type === 'bot' && (
                <div className="flex items-center space-x-2 mb-2">
                  <Brain
                    className={`w-4 h-4 ${
                      message.isError ? 'text-red-400' : 'text-purple-400'
                    }`}
                  />
                  <span className="text-xs text-gray-400">Brane AI</span>
                </div>
              )}
              <p className="text-sm leading-relaxed">{message.content}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-800 border border-gray-700 px-4 py-3 rounded-2xl max-w-xs">
              <div className="flex items-center space-x-2">
                <Brain className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-gray-400">Brane AI is thinking</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="px-4 py-2">
        <div className="flex flex-wrap gap-2">
          {[
            'Analyze sales data',
            'Show data patterns', 
            'Causal analysis',
            'Real-time metrics'
          ].map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              disabled={isTyping}
              className="px-3 py-1 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-300 text-xs rounded-full border border-gray-600 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 bg-gray-900 border-t border-gray-700">
        <div className="flex space-x-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about your data..."
            className="flex-1 bg-gray-800 border border-gray-600 rounded-full px-4 py-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none disabled:opacity-50"
            disabled={isTyping}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!inputMessage.trim() || isTyping}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white w-12 h-12 rounded-full flex items-center justify-center transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="text-center mt-2">
          <p className="text-xs text-gray-500">
            {isConnected ? 'Connected to Brane AI' : 'Demo Mode'} • Press Enter to send
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
