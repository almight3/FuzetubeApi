import User from "../model/user.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";
import jwt from "jsonwebtoken";

export const authenticateUser = catchAsyncError(async (req,res,next)=>{
    const {token} = req.cookies;
    if (!token) {
      return next(new ErrorHandler("Please Login to access this resource", 401));
    }
  
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  
    req.user = await User.findById(decodedData.id);
  
    next();
    
});

