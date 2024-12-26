import express from "express"
import mongoose from "mongoose"
import cors from "cors"; // Import the CORS package
import { uploadVideoRoute } from "./routes/video.js";


const app = express();
app.use(express.json());
app.use(cors());

const dbName = "neoflekeTaskDb";
mongoose.connect(`mongodb://localhost:27017/${dbName}`);

const db = mongoose.connection;
db.on("open", () => {
  console.log("db Connection successful");
});

db.on("error", () => {
  console.log("Connection is not successful");
});

app.listen(2100, () => {
  console.log("Server is running on port 2100");
});



uploadVideoRoute(app)