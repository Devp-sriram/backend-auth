import mongoose from 'mongoose'

const verifySchema =new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        token:{
            type:String,
            required:true,
        },
    },{
        collection:'verifyUser'
    }
);

export default mongoose.model('verifyUser',verifySchema);


