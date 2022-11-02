import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import Video from "../model/video.js";

export const newVideo = catchAsyncError(async(req,res,next)=>{
    const video = await Video.create(req.body)
    res.status(200).json({
        success:true,
        video
    });
});

export const fetchAllVideo = catchAsyncError(async(req,res,next)=>{ 
    const videos = await Video.find({})
    res.status(200).json({
        success:true,
        videos
  });
});

export const videoDetail =  catchAsyncError(async(req,res,next)=>{
    const {id} = req.params;
    const videoDetail = await Video.findById(id);
    res.status(200).json({
        success:true,
        videoDetail
    }); 
});