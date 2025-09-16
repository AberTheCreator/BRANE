import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, 
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const braneAPI = {
  sendMessage: async (messageData) => {
    try {
      const response = await api.post("/api/chat/chat", messageData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.details || error.message);
    }
  },

 
  testConnection: async () => {
    try {
      const response = await api.post("/api/chat/working", { 
        message: "Test connection" 
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.details || error.message);
    }
  },

  requestDemo: async (formData) => {
    try {
      const response = await api.post("/api/demo/request", formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  },

  getWebhookStatus: async () => {
    try {
      const response = await api.get("/api/webhook/sensay/status");
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.details || error.message);
    }
  },
};
