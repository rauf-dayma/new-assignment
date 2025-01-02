import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { uploadVideoRoute } from "./routes/video.js";
import path from 'path';  

const app = express();

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.use(cors())

app.use(express.json());

const dbUri = "mongodb+srv://raufdayma123:raufdayma-123@cluster0.0jbpr.mongodb.net/neoflekeTaskDb?retryWrites=true&w=majority";
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("open", () => console.log("db Connection successful"));
db.on("error", () => console.log("Connection is not successful"));


app.listen(2100, () => {
  console.log(`Server is running on port 2100}`);
});

uploadVideoRoute(app);

export default app;
