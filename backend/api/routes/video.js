
import {  getAllVideos, getVideoById, uploadVideo} from "../controllers/video.js";

export function uploadVideoRoute(app) {
    app.post("/api/video/upload", uploadVideo);
  
    app.get("/api/Allvideos", getAllVideos);
  
    app.get("/api/video/:id", getVideoById);  
  }