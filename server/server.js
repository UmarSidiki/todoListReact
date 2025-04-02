import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import pkg from "pg";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import tasksRouter from "./routes/tasks.js";  // Fixed path

dotenv.config();
const { Pool } = pkg;

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend Vite dev server
  credentials: true
}));
app.use(express.json());

// Initialize DB connection
const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for some Neon configurations
  },
});

// Make db available to routes
app.use((req, res, next) => {
  req.db = pool;
  next();
});

// Setup routes
app.use("/api/tasks", ClerkExpressRequireAuth(), tasksRouter);

// Basic health check route
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Initialize database
async function initializeDatabase() {
  try {
    const client = await pool.connect();

    // Create tasks table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        due_date TIMESTAMP,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Database initialized");
    client.release();
  } catch (err) {
    console.error("Database initialization error:", err);
  }
}

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await initializeDatabase();
});