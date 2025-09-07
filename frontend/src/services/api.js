import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL ||"https://super-duper-potato-4jwxq77vv99gh6v-5000.app.github.dev";;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const braneAPI = {
  
  sendMessage: async (message) => {
    const response = await api.post("/api/chat", { message });
    return response.data;
  },

  
  requestDemo: async (formData) => {
    const response = await api.post("/api/demo", formData);
    return response.data;
  },

  getWebhookData: async () => {
    const response = await api.get("/api/webhook");
    return response.data;
  },
};
