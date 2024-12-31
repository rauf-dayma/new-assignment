import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import { uploadVideoRoute } from "../routes/video.js";

const app = express();

// Use CORS to allow your frontend (both local and deployed)
app.use(cors({
  origin: ["http://localhost:5173", "https://your-app-frontend.vercel.app"], // Add your deployed frontend URL
}));

app.use(express.json());

const dbName = "neoflekeTaskDb";
const dbUri = "mongodb+srv://raufdayma123:raufdayma-123@cluster0.0jbpr.mongodb.net/neoflekeTaskDb?retryWrites=true&w=majority";
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("open", () => {
  console.log("DB connection successful");
});

db.on("error", (err) => {
  console.error("Connection error:", err);
});

// Initialize your routes
uploadVideoRoute(app);

export default app; // Vercel will use this as a serverless function handler
