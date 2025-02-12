import express from 'express'
import { authenticateUser } from '../controllers/login.ts'
import client from '../redis.ts'
// import { Response } from '../controllers/login.ts'; 
var router =express.Router();

export interface Response {
    id:Object | string,
    name:string | null | undefined,
    email:string,
    token:string,
    status:boolean,
}

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
    if(loginCredential){
         res.status(200).send(`succesfully signined as ${loginCredential.name}`)
    }else if(loginCredential === 'error occur while auth - user'){
        res.status(404).send("error occur while auth - user")
    }
    }catch(e){
        console.log(e);
        res.status(500).send('route server busy')
    };
    
})

