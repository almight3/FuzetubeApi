import mongoose from "mongoose";
const Schema  = mongoose.Schema;

const videoSchema = new Schema({
    _id:{
        type:String,
        required:[true,"video id is required"]
    },
    title:{
        type:String,
        required:[true,"video title is required"]
    },
    description:{
        type:String,
        required:[true,"video discription is required"]
    },
    category:{
        type:String,
        required:[true,"video category is required"]
    },
    profile:{
        type:String,
        required:[true,"video category is required"]
    },
    channel:{
        type:String,
        required:[true,"channel is required"]
    },
    createdAt:{
        type:Date,
        default:Date.now()
    } 
})

const Video = mongoose.model("Video",videoSchema);

export default Video;