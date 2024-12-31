// File: api/script.js

import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import { uploadVideoRoute } from "../routes/video.js";

const app = express();
app.use(express.json());
app.use(cors());

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
