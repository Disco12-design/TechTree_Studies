import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";

import profileRoutes from "./Routes/ProfilePageRoute.js";
import authRoutes from "./Routes/AuthRoute.js";
import attemptsRoutes from "./Routes/AttemptsRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [process.env.FRONTEND_URL, process.env.FRONTEND_URL_ALT]
  .filter(Boolean);
const clerkOptions = {
  ...(process.env.CLERK_PUBLISHABLE_KEY
    ? { publishableKey: process.env.CLERK_PUBLISHABLE_KEY }
    : process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
      ? { publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY }
      : {}),
  ...(process.env.CLERK_SECRET_KEY
    ? { secretKey: process.env.CLERK_SECRET_KEY }
    : {}),
};

// Middleware setup
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`Origin not allowed: ${origin}`));
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use(clerkMiddleware(clerkOptions));

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Backend server is running" });
});

// Health check (handy for deployment and quick testing)
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/attempts", attemptsRoutes);

// 404 handler for undefined routes (must come after all routes)
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal server error" });
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`\nBackend server running on http://localhost:${PORT}\n`);
});

server.on("error", (error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});