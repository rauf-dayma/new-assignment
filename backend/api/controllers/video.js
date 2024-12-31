import Video from "../../models/video.js"

export async function uploadVideo(req, res){
    try{
        const { title, description, videoLink, thumbnail} = req.body;
        const videoUpload = new Video ({title, description, videoLink, thumbnail })
        await videoUpload.save();
        res.status(201).json({ sucess: "true", videoUpload})
    }catch(err){
        res.status(500).json({message: "server Error", err})
    }
}

export async function getAllVideos(req, res){
     try{
        const  videos = await Video.find()    
        res.status(201).json({success: "true", "videos" : videos})

    }catch(err){
        res.status(500).json({message: "server Error", err})
    }
}

export async function getVideoById(req, res){
    try{
        let {id} = req.params;
        console.log(id)
        const video = await Video.findById(id)
        res.status(201).json({success: "true", "videos" : video})


    }catch(err){
        res.status(500).json({message: "server Error", err})
    }
}
