import React, { useState, useEffect, useRef } from 'react';
import { Brain, X, Send, AlertCircle } from 'lucide-react';
import { braneAPI } from '../services/api';

const Chatbot = ({ setShowChatbot }) => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content:
        "Hi! I'm Brane, your AI-powered data intelligence assistant. I can help you discover insights, analyze patterns, and answer complex questions about your data. Try asking me something!",
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    initializeConversation();
  }, []);

  const initializeConversation = async () => {
    try {
      const userId = `user_${Date.now()}`;
      const response = await braneAPI.sendMessage({
        message: 'init',
        user_id: userId,
      });
      if (response?.session_id) {
        setConversationId(response.session_id);
      } else {
        setError('Conversation ID not returned. Please check your setup.');
      }
    } catch (err) {
      setError('Connection error. Please check your setup.');
      console.error('Conversation initialization error:', err);
    }
  };

  const sendMessage = async (messageOverride) => {
    const messageToSend = messageOverride ?? inputMessage.trim();
    if (!messageToSend || !conversationId) return;

    setInputMessage('');
    setMessages((prev) => [...prev, { type: 'user', content: messageToSend }]);
    setIsTyping(true);
    setError(null);

    try {
      const response = await braneAPI.sendMessage({
        message: messageToSend,
        user_id: `user_${Date.now()}`,
        session_id: conversationId,
      });

      const botResponse =
        response?.sensay_response?.response ||
        'I received your message but had trouble generating a response.';

      setIsTyping(false);
      setMessages((prev) => [...prev, { type: 'bot', content: botResponse }]);
    } catch (err) {
      setIsTyping(false);
      setError('Failed to get response. Please try again.');
      console.error('Send message error:', err);

      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          content:
            'Sorry, I encountered an error. Please try again or check your connection.',
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

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      <div className="bg-gradient-to-r from-purple-900 to-blue-900 p-4 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Brane AI Assistant</h3>
            <p className="text-gray-300 text-sm">
              {conversationId
                ? 'Online • Ready to help with data intelligence'
                : 'Connecting...'}
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
        <div className="bg-red-900 border-b border-red-700 p-3 flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <span className="text-red-100 text-sm">{error}</span>
          <button
            onClick={() => setError(null)}
            className="ml-auto text-red-400 hover:text-red-200"
          >
            <X className="w-4 h-4" />
          </button>
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
          {['Analyze sales data', 'Show data patterns', 'Causal analysis', 'Real-time metrics'].map(
            (suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                disabled={!conversationId || isTyping}
                className="px-3 py-1 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-300 text-xs rounded-full border border-gray-600 transition-colors"
              >
                {suggestion}
              </button>
            )
          )}
        </div>
      </div>

      <div className="p-4 bg-gray-900 border-t border-gray-700">
        <div className="flex space-x-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              conversationId
                ? 'Ask me anything about your data...'
                : 'Connecting...'
            }
            className="flex-1 bg-gray-800 border border-gray-600 rounded-full px-4 py-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none disabled:opacity-50"
            disabled={isTyping || !conversationId}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!inputMessage.trim() || isTyping || !conversationId}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white w-12 h-12 rounded-full flex items-center justify-center transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="text-center mt-2">
          <p className="text-xs text-gray-500">
            Powered by Sensay API • Press Enter to send
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
