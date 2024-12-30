import express from 'express'
import connectDb from './db.ts'
import signinRouter from "./routes/signin.ts"
import loginRouter from "./routes/login.ts"  
import homeRouter from "./routes/home.ts"
import cors from  "cors"

const app = express();
const port = 4000;
app.use(express.json());
app.use(cors({origin:"*"}));



await connectDb();


app.get("/" ,(req,res)=>{
    res.send("hello world");
});

app.use("/signin",signinRouter);
app.use('/login',loginRouter );
app.use('/home',homeRouter);



app.listen(port,()=>{
    console.log(`App listening on port ${port}`);
});
