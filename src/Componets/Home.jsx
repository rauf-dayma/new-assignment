import React, { useState, useEffect } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { blue } from "@mui/material/colors";

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getAlllVideos();
  }, []);

  async function getAlllVideos() {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:2100/api/allVideos", {
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
