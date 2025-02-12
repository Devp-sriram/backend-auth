import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config();
const transporter = nodemailer.createTransport({
  service:"gmail",
  auth: {
    user: process.env.NODE_MAILER_USER,
    pass: process.env.NODE_MAILER_PASS,
  },
});

export default  function sendMail(toEmail : string,subject:string ,content: string){

    const mailOptions={
        form:"sriramraman100@gmail.com",
        to: toEmail,
        subject:subject,
        html:content,
    };

     transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            return error
        }else{
            return `Email sent${info.response}`;
        }
    });
}
