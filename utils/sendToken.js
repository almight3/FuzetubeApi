const sendToken = (userData,statusCode,res)=>{
    const token = userData.generateJWT()
    const options = {
        expires: new Date(
          Date.now() + 1 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };
    const user = {
      _id:userData._id,
      email:userData.email,
      username:userData.username,
    }
   res.status(statusCode).cookie("token",token,options).json({
    success:true,
    user,
    token
   })
}

export default sendToken 