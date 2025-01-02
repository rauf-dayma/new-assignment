import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { uploadVideoRoute } from "./routes/video.js";

const app = express();

app.use(cors())

app.use(express.json());

const dbUri = "mongodb+srv://raufdayma123:raufdayma-123@cluster0.0jbpr.mongodb.net/neoflekeTaskDb?retryWrites=true&w=majority";
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("open", () => console.log("db Connection successful"));
db.on("error", () => console.log("Connection is not successful"));


uploadVideoRoute(app);

export default app;
