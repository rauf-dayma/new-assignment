import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { uploadVideoRoute } from "../../routes/video.js";  // Adjust import path if necessary
import Video from "../../models/video.js";  // Assuming you have a model for videos

const app = express();

// CORS middleware and setup
app.use(cors({
  origin: ["http://localhost:5173", "https://your-frontend-url.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// MongoDB connection
const dbUri = process.env.MONGO_URI || "your-mongo-db-uri-here";
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("open", () => console.log("DB Connection successful"));
db.on("error", () => console.log("DB connection failed"));

// Video routes
app.get('/api/allVideos', async (req, res) => {
  try {
    const videos = await Video.find();  // Fetch videos from your MongoDB
    res.json(videos);  // Send the videos as JSON
  } catch (error) {
    res.status(500).json({ message: "Error fetching videos", error });
  }
});

// Export the app for Vercel
export default app;
