import express from 'express'
import { autharizeUser } from '../controllers/login.ts'
const router =express.Router()



export default router.get('/',async(req,res)=>{
   try{ 
    const auth_token = req.headers.authorization
    const loginCredentials = await autharizeUser(auth_token)
    if(loginCredentials === false){
        res.status(400).send('invalid token')
    }else{
        res.json(loginCredentials);
    }
    }catch(error){
        res.status(400).send('server busy')
        console.log(error)
    }
});
