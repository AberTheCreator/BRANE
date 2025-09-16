require("dotenv").config();
const express = require("express");
const cors = require("cors");
const chatRoutes = require("./routes/chat");
const webhookRoutes = require("./routes/webhook");
const demoRoutes = require("./routes/demo");

const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      "http://localhost:3000",
      "https://super-duper-potato-4jwxq77vv99gh6v-3000.app.github.dev",
      process.env.FRONTEND_URL
    ].filter(Boolean);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    services: {
      chat: "active",
      webhooks: "active",
      demo: "active",
    }
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "Brane AI Backend Server",
    version: "1.0.0",
    status: "running",
    endpoints: {
      health: "/health",
      chat: "/api/chat/*",
      webhooks: "/api/webhook/*",
      demo: "/api/demo/*"
    }
  });
});

app.use("/api/chat", chatRoutes);
app.use("/api/webhook", webhookRoutes);
app.use("/api/demo", demoRoutes);

app.use("*", (req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    path: req.originalUrl,
    method: req.method,
    available_endpoints: [
      "GET /health",
      "GET /",
      "POST /api/chat/chat",
      "POST /api/chat/working",
      "POST /api/demo/request",
      "GET /api/webhook/sensay/status"
    ]
  });
});

app.use((error, req, res, next) => {
  console.error("Global error handler:", error);
  
  if (error.message === "Not allowed by CORS") {
    return res.status(403).json({
      error: "CORS error",
      message: "Origin not allowed"
    });
  }

  res.status(500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? error.message : "Something went wrong",
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(` Brane AI Backend Server`);
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(` Chat API: http://localhost:${PORT}/api/chat/working`);
  
  if (!process.env.SENSAY_API_KEY) {
    console.warn("⚠️  SENSAY_API_KEY not set - chat features will be limited");
  }
  if (!process.env.RESEND_API_KEY) {
    console.warn("⚠️  RESEND_API_KEY not set - demo requests will fail");
  }
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});
