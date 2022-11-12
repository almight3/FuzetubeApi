import express  from 'express'
const app = express()
import mongoose from 'mongoose';
import errorMiddleware from "./middleware/error.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import videoRoutes from "./routes/videosRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors"

// config env
dotenv.config()
//db connection 
mongoose.connect(process.env.DB_URL).then(res=>{
    console.log("db connected succesfully");
})
.catch(err=>{
    console.log("error whilw connecting db")
    console.log(err)
})

app.use(cors({origin:"http://localhost:3000", credentials:true}))
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1",userRoutes)       
app.use("/api/v1",videoRoutes)   
app.use(errorMiddleware);

app.listen(process.env.PORT,()=>{
    console.log(`server start at port ${process.env.PORT}`)
})