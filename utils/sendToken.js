const sendToken = (userData,statusCode,res)=>{
    const token = userData.generateJWT()
    // const options = {
    //     expires: new Date(
    //       Date.now() + 1 * 24 * 60 * 60 * 1000
    //     ),
    //     httpOnly: true,
    // };
    const user = {
      _id:userData._id,
      email:userData.email,
      username:userData.username,
      token:token
    }
    res.status(statusCode).json({
    success:true,
    user,
   })
}

export default sendToken 