import React, { useState } from "react";
import "./videoUpload.css";
import { Link, useNavigate } from "react-router-dom";
import YouTubeIcon from "@mui/icons-material/YouTube";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";

const VideoUpload = () => {
  const navigate = useNavigate(); // use to navigate to different pages

  const [loader, setLoader] = useState(false);
  const [inputFields, setInputFields] = useState({
    title: "",
    description: "",
    thumbnail: "",
    video: "",
  });

  const handleOnChangeInput = (event, name) => {
    setInputFields({
      ...inputFields,
      [name]: event.target.value,
    });
  };

  const uploadImage = async (e, type) => {
    console.log("uploading...");
    setLoader(true);
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "assignment-task");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dy6dkn2m9/${type}/upload`,
        data
      );
      const url = response.data.url;
      setLoader(false);
      const fieldType = type === "image" ? "thumbnail" : "video";
      setInputFields({
        ...inputFields,
        [fieldType]: url,
      });
      console.log(url);
    } catch (err) {
      setLoader(false);
      toast.error(
        data.message || "Please check your internet, Please try again.",
        {
          position: "top-right",
        }
      );
    }
  };

  const handleUploadSubmit = async () => {
    const { title, description, thumbnail, video } = inputFields;

    if (!title || !description || !thumbnail || !video) {
      toast.error("Please fill all the reqired filed.", {
        position: "top-right",
      });
      return;
    }

    try {

      const API_BASE_URL = "https://new-assignment-ovmo.vercel.app/";

      const response = await fetch(`${API_BASE_URL}/api/video/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          videoLink: video,
          thumbnail,
        }),
      });

      const data = await response.json(); // Parse the JSON response

      if (response.ok) {
        toast.success("Video Uploaded successfully!", {
          position: "top-right",
        });

        setTimeout(() => {
          navigate("/");
        }, 1000); // Delay to allow toast to show
      } else {
        toast.error("Please Login first.", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(data.message || "Something Worng, Please try again.", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="VideoUpload">
      <div className="uploadBox">
        <div className="uploadVideoTitle">
          <YouTubeIcon sx={{ fontSize: "54px", color: "red" }} />
          Upload Video
        </div>

        <div className="uploadForm">
          <input
            type="text"
            value={inputFields.title}
            className="uploadFormInputs"
            onChange={(e) => handleOnChangeInput(e, "title")}
            placeholder="Title of Video"
          />
          <textarea
            type="text"
            value={inputFields.description}
            className="uploadFormInputs"
            onChange={(e) => handleOnChangeInput(e, "description")}
            placeholder="Description"
          ></textarea>
          <div>
            Thumbnail
            <input
              type="file"
              onChange={(e) => uploadImage(e, "image")}
              accept="image/*"
            />
          </div>
          <div>
            Video
            <input
              type="file"
              onChange={(e) => uploadImage(e, "video")}
              accept="video/mp4, video/webm, video/*"
            />
          </div>

          {loader && (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          )}
        </div>

        <div className="uploadBtns">
          <div className="uploadBtnForm" onClick={handleUploadSubmit}>
            Upload
          </div>
          {/* <Link to={"/"} className="uploadBtnForm">
            Home
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
