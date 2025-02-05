const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");

dotenv.config();  // Load environment variables from .env file
connectDB();  // Establish DB connection if needed

const app = express();
app.use(express.json());  // To parse JSON request bodies
app.use(cors());  // Enable Cross-Origin Resource Sharing

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/recommend", recommendationRoutes);

// Catch all other routes and respond with 404
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
