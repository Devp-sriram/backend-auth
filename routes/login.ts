import express from 'express'
import { authenticateUser } from '../controllers/login.ts'
import client from '../redis'
import { Response } from '../controllers/login.ts'; 
var router =express.Router();


client
.connect()
.then(()=>{
    console.log('connceted to redis');
})
.catch((error : unknown )=>{
    console.log(error)
});
export default router.post('/',async (req,res)=>{
   try{const {email,password} = await req.body;
    const loginCredential : Response | string = await authenticateUser(email , password)
    console.log(loginCredential);
    if(loginCredential === typeof Response ){
        res.status(200).json({token:loginCredential?.token})
    }else if(loginCredential === 'error occur while auth - user'){
        res.status(404).send("error occur while auth - user")
    }else {
        res.status(400).send("invalid username")
    }
    }catch(e){
        console.log(e);
        res.status(500).send('route server busy')
    };
    
})

