import  User from "../models/User.ts"
import jwt  from "jsonwebtoken"
import bcrypt from 'bcrypt'
import client from '../redis.ts'
import dotenv from 'dotenv'
dotenv.config()
// const verifyUser =require("../models/verifyUser")
//

export interface Response{
    id:Object | string,
    name:string | null | undefined,
    email:string,
    token:string,
    status:boolean,
}

export async function CheckUser(email : string) {
    try {
        const user = await User.findOne({ email : email });
        console.log(user);
        if (user) {
            return true;
        }
        return false;
    } catch(error){
        return error.message
    }
}

export async function authenticateUser(email : string,password :string){
    try{
        const userCheck = await User.findOne({email:email})
        if(userCheck){
          const validPassword = await bcrypt.compare( password , userCheck.password)  
          if(validPassword){
          const token =await jwt.sign({email},process.env.login_secret_token)
            const response : Response = {
                id:userCheck._id,
                name:userCheck.name,
                email:userCheck.email,
                token:token,
                status:true,
            }
          
        await client.set(`key-${email}`, JSON.stringify(response)) 
           
        await User.findOneAndUpdate(
            {email:userCheck.email},
            {$set:{token:token}},
            {new:true}
        );
        return response;
          }else{return 'invalid password'}
        }else{ 
            return 'invalid username'
        }
       
    }catch(error){
        console.log(error)
        return  'error occur while auth - user'
    }
}

export async function autharizeUser(token : string){
    try{
        const decodedToken =await jwt.verify( token , process.env.login_secret_token)
        if(decodedToken){
            const email = decodedToken.email;
            const auth = await client.get(`key-${email}`);
            if(auth){
                const data = JSON.parse(auth)
                return data 
            }else{
                const data = await User.findOne({ email : email})
                return data
            }
        }else
        return false;
    }catch(e){
        console.log(e);
    }
};
    
