import React, { useState, useEffect } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { blue } from "@mui/material/colors";

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getAlllVideos();
  }, []);

  const API_BASE_URL = "https://new-assignment-q0mf.onrender.com";  // Backend URL for Vercel

  async function getAlllVideos() {
    const token = localStorage.getItem("token");
  
    try {
      console.log(API_BASE_URL)
      const response = await fetch(`${API_BASE_URL}/api/allVideos`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("videos:", data.videos);
        setVideos(data.videos); // Set fetched videos to state
      } else {
        const error = await response.json();
        console.error("Error fetching videos:", error.message);
      }
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  }
  

  return (
    <div className="home-mainPage">
      {videos.map((video) => (
        <div className="videoThumbnail" key={video._id}>

            <Link className="VideoLink" key={video._id} to={`watch/${video._id}`}>
              <img
                src={video.thumbnail}
                alt={video.title}
                className="thubnailPic"
              />
            </Link>
            <div className="videoTitle">{video.title}</div>
          </div>
      ))}

      <div className ="videoUploadBtn">
        <Link className="uploadBtn" to={"/upload"}>upload</Link>
      </div>
    </div>
  );
};

export default Home;
