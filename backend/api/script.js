import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { uploadVideoRoute } from "../../routes/video.js";  // Adjust import path as necessary

const app = express();

// CORS middleware for preflight requests
app.options('*', cors());

// CORS configuration
app.use(cors({
  origin: ["http://localhost:5173", "https://new-assignment-delta.vercel.app/"], // Make sure to replace with your actual frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  Credential: true
}));

app.use((req, res, next) => {
  console.log('Request headers:', req.headers);
  res.setHeader('Access-Control-Allow-Origin', '*');  // Temporary to allow any origin
  next();
});

// Express setup
app.use(express.json());

// MongoDB connection
const dbUri = process.env.MONGO_URI || "your-mongo-db-uri-here";
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("open", () => console.log("DB Connection successful"));
db.on("error", () => console.log("DB connection failed"));

// Your routes
uploadVideoRoute(app);

app.get('/test', (req, res) => {
  res.json({ message: "CORS is working!" });
});

// Export the Express app for Vercel's serverless function
export default app;
