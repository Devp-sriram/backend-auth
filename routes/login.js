const express =require('express');
const { authenticateUser } = require('../controllers/login');
const client =require('../redis')
var router =express.Router();


client
.connect()
.then(()=>{
    console.log('connceted to redis');
})
.catch((error)=>{
    console.log(error)
});
router.post('/',async (req,res)=>{
   try{const {email,password} = await req.body;
    var loginCredential = await authenticateUser(email , password)
    console.log(loginCredential);
    if(loginCredential === "invalid username or password"){
        res.status(400).send("invalid username or password")
    }else if(loginCredential === 'error occur while auth - user'){
        res.status(404).send("error occur while auth - user")
    }else {
        res.status(200).json({token:loginCredential.token})
    }
    }catch(e){
        console.log(e);
        res.status(500).send('route server busy')
    };
    
})

module.exports =router