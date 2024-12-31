import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
  title:{
    type: String,
    required: true,
  },
  description:{
    type: String,
  },
  videoLink:{
    type: String,
    required: true,
  },
  thumbnail:{
    type: String,
    required: true,
  },

},{timestamps:true})

const Video = mongoose.model("video", videoSchema)

export default Video;