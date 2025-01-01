import { useState, useEffect, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./Componets/Home";

// Lazy load the components
const Video = lazy(() => import("./Componets/Video.jsx"));
const VideoUpload = lazy(() => import("./Componets/videoUpload"));

function App() {

  return (
     <>
      <ToastContainer />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/watch/:id" element={<Video/>} />
          <Route path="/upload" element={<VideoUpload />} />
        </Routes>
      </Suspense>
     </>
  );
}

export default App;
