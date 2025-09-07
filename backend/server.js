require("dotenv").config();
const express = require("express");
const cors = require("cors");
const chatRoutes = require("./routes/chat");
const webhookRoutes = require("./routes/webhook");
const demoRoutes = require("./routes/demo");

const app = express();

app.use(
  cors({
    origin: [
      "https://super-duper-potato-4jwxq77vv99gh6v-3000.app.github.dev",
      "http://localhost:3000"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api/chat", chatRoutes);
app.use("/api/webhook", webhookRoutes);
app.use("/api/demo", demoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
});
