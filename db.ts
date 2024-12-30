import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();

const connectDb = async () =>{
    try{
        if(process.env.MongoDb_Url){
          await mongoose.connect(process.env.MongoDb_Url);
          console.log("connect to the mongoDb");
        }else{
          console.log('.env file or value not found')
        }
    }catch(error){
        console.log(error)
    };
    
};

export default connectDb;
