import User from "../model/user.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";

// register user
export  const register = catchAsyncError(async(req,res,next)=>{
    const {username,email,password} = req.body;
    const userExist = await User.findOne({email:email})
    if(userExist){
        return next(new ErrorHandler("user already register with this mail",400))
    } 
    const user = await User.create({
        username:username,
        email:email,
        password:password
    }); 
    sendToken(user,201,res);
})

//login user 
export const  loginUser = catchAsyncError(async(req,res,next)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email:email})
    
    if(!user){
       return next(new ErrorHandler("Invalid email or password",401))
    };
   
    sendToken(user,201,res);
   
    
    
});

//logout user
export const logoutUser  = catchAsyncError(async(req,res,next)=>{
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(200).json({
        success:true,
        message:"user loged out succefully"
      });
})


// fetch liked videos
export const getLikedVideo = catchAsyncError(async(req,res,next)=>{
      const user = await User.findById(req.user._id);

      res.status(200).json({
        success:true,
        likes:user.like
      })
})

// liked video 
export const addToLike = catchAsyncError(async(req,res,next)=>{
      const {video} = req.body;
      console.log(req.body)
      const user = await User.findById(req.user._id);
      const isVideoExist = user.like.some((item)=>item._id === video._id)
      
      if(!isVideoExist){
        user.like.push(video)
      }
      user.save()
      res.status(201).json({
       success:true,
       likes:user.like
      });
});

// removed from like
export const removeFromLike = catchAsyncError(async(req,res,next)=>{

    const {id} = req.params   
     const user = await User.findById(req.user._id);
    const filteredLike = user.like.filter((item)=>item._id !== id);
    await User.findByIdAndUpdate(req.user._id,{like:filteredLike})
    res.status(200).json({
        success:true,
        likes:filteredLike
    })
})

// history fetch all history
export const getAllHistory = catchAsyncError(async(req,res,next)=>{
        const user = await User.findById(req.user._id);
        res.status(200).json({
        success:true,
        history:user.history
      });

});

// add to item history
export const addToHistory = catchAsyncError(async(req,res,next)=>{
     
    const {video} = req.body;
    console.log(req.user._id)
    const user = await User.findById(req.user._id);
    const isVideoExist = user.history.some((item)=>item.id === video._id)
    if(!isVideoExist ){
        user.history.push(video)
    }
    user.save()
    res.status(201).json({
     success:true,
     history:user.history
    });
});

// remove from history
export const removeFromHistory = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params
    const user = await User.findById(req.user._id);
    const filterHistory = user.history.filter((item)=>item._id !== id);
    await User.findByIdAndUpdate(req.user._id,{history:filterHistory})
    res.status(200).json({
        success:true,
        history:filterHistory
    });
});

// clear History
export const clearHistory = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.user._id);
    await User.findByIdAndUpdate(req.user._id,{history:[]})
    user.save()
    res.status(200).json({
        success:true,
        history:user.history
    });
});

// fetch all videos in watchlater
export const getAllWatchLater = catchAsyncError(async(req,res,next)=>{
        const user = await User.findById(req.user._id);
        res.status(200).json({
        success:true,
        watchLater:user.watchLater
      });

});

// add videos to watch later 
export const addToWatchLater =  catchAsyncError(async(req,res,next)=>{
    const {video} = req.body;
    const user = await User.findById(req.user._id);
    const isVideoExist = user.watchLater.some((item)=>item._id === video._id);
    
    if(!isVideoExist){
        user.watchLater.push(video)
    }
    user.save()
    res.status(201).json({
     success:true,
     watchLater:user.watchLater
    });
});


// remove from watchlater
export const removeFromWatchLater = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params;
    const user = await User.findById(req.user._id);
    const filterWatchLater = user.watchLater.filter((item)=>item._id !== id);
    await User.findByIdAndUpdate(req.user._id,{watchLater:filterWatchLater})
    res.status(200).json({
        success:true,
        watchLater:filterWatchLater
    });
});






