const catchAsyncError = (passedFunction)=>(req,res,next)=>{
    return Promise.resolve(passedFunction(req,res,next)).catch(next)
}

export default catchAsyncError