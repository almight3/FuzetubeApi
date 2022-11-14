import bcrypt from "bcrypt";
import validator from "validator";
import mongoose from "mongoose";
const Schema  = mongoose.Schema;
import  jwt  from "jsonwebtoken";

const userSchema = new Schema({
    username:{
        type:String,
        required:[true,"please enter name"],
        maxLenght:[30,"username can not exceed 30 character"]
    },
    email:{
        type:String,
        required:[true,"please enter email"],
        unique:true,
        validate:[validator.isEmail, "Please Enter a valid Email"],
    },
    password:{
        type:String,
        required:true,
        minLength:[8,"password must be character long"],
        selected:false  
    },
    like:[ { 
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
       thumbnail:{
          type:String
       }  
      }
    ],
    history:[
        { 
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
         thumbnail:{
            type:String
         }  
        }
    ],
    watchLater:[
        { 
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
           thumbnail:{
              type:String
           },
           addedAt:{
            type:Date,
            default:Date.now()
           }
        }
    ],
    playlist:[{
        name:{
            type:String,
            required:true
        },
        video:[{
            id:{
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
        }]
    }]
})

// hasing password
userSchema.pre("save", async function(req,res,next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
})

// genreate jwt
userSchema.methods.generateJWT = function (){
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
}

// compare password 
userSchema.methods.comparePassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword,this.password);
};

const User = mongoose.model("User",userSchema)

export default User;

