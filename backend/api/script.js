import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { uploadVideoRoute } from "./routes/video.js";

const app = express();

// CORS middleware for preflight requests
app.options('*', cors());

// CORS configuration
app.use(cors({
  origin: ["http://localhost:5173", "https://new-assignment-delta.vercel.app/"], // Make sure to replace with your actual frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  Credential : true
}));

app.use((req, res, next) => {
  console.log('Request headers:', req.headers);
  res.setHeader('Access-Control-Allow-Origin', '*');  // Temporary to allow any origin
  next();
});


// Express setup
app.use(express.json());

// MongoDB connection
const dbUri = "mongodb+srv://raufdayma123:raufdayma-123@cluster0.0jbpr.mongodb.net/neoflekeTaskDb?retryWrites=true&w=majority";
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("open", () => console.log("db Connection successful"));
db.on("error", () => console.log("Connection is not successful"));

// Your routes
uploadVideoRoute(app);

app.get('/test', (req, res) => {
  res.json({ message: "CORS is working!" });
});


// Export app for Vercel
export default app;
