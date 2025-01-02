import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { uploadVideoRoute } from "./routes/video.js";

const app = express();

app.use(cors())

app.use(express.json());

// Serve static files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "dist")));

// Fallback to index.html for SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const dbUri = "mongodb+srv://raufdayma123:raufdayma-123@cluster0.0jbpr.mongodb.net/neoflekeTaskDb?retryWrites=true&w=majority";
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("open", () => console.log("db Connection successful"));
db.on("error", () => console.log("Connection is not successful"));


uploadVideoRoute(app);

export default app;
