import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./video.css";

const Video = () => {
  const { id } = useParams();
  const [videoData, setVideoData] = useState(null);

  console.log(videoData);

  // Function to fetch video data
  const fetchVideo = async () => {
    try {
      const API_BASE_URL = "https://new-assignment-3.onrender.com";

      const res = await fetch(`${API_BASE_URL}/api/video/${id}`);
      if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(
          `Error fetching video: ${res.status} - ${errorMessage}`
        );
      }
      const data = await res.json();
      setVideoData(data.videos);
    } catch (err) {
      console.error("Error fetching video:", err.message);
    }
  };

  // Fetch all data when the component loads or video id changes
  useEffect(() => {
    fetchVideo();
  }, []);

  if (!videoData) return <div>Loading...</div>;

  return (
    <div className="video">
      {/* Video Section */}
      <div className="videoPostSection">
        <div className="videos">
          <video key={id} controls autoPlay loop className="videoClass">
            <source src={videoData.videoLink} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="videoAboutContainer">
            <div className="videoTitle">{videoData.title}</div>
            <div className="CreateDatte">
              {new Date(videoData.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
