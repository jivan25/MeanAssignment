const { genSaltSync, hashSync,compareSync, compare} = require("bcrypt");
const {create,getvalideUser}= require("./user.service");
const {sign} =require("jsonwebtoken")
const nodemailer = require("nodemailer");

module.exports={
    creatUser:(req,res)=>{
        const body= req.body
        // const salt= genSaltSync(10);
        // body.password=hashSync(body.password,salt);
        create(body,(err,result)=>{
            if(err){
                if(err.code==='ER_DUP_ENTRY'){
                    return res.status(400).json({
                        success:0,
                        message:"Email Id already resistered"
                    })
                }
                return res.status(500).json({
                    success:0,
                    message:"Database connection error"
                })
            }
            sendMail(body, info => {
                console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
                res.send(info);
              });
            return res.status(200).json({
                success:1,
                data:result
            })
        })
    },

    login:(req,res)=>{
        const body=req.body;
        getvalideUser(body,(err,result)=>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    success:0,
                    message:"Database connection error"
                })
            }

            if(!result){
                return res.status(400).json({
                    success:0,
                    message:"Invalid email or password"
                })
            }
          
            if(body.password===result.Password){
                result.password=undefined;
                const jsonWebtoken= sign({result:result},'qwe1234',{
                    expiresIn:"1h"
                });
                return res.json({
                    success:1,
                    message:"login successfully",
                    token:jsonWebtoken
                })
            }else{
                return res.status(400).json({
                    success:0,
                    message:"Invalid email or password"
                })
            }
        })
    }
}
async function sendMail(user, callback) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "jashelke96@gmail.com",
        pass: "*************"
      }
    });
  
    let mailOptions = {
      from: '"Employee Portal"<jashelke96@gmail.com>', // sender address
      to:user.emailId   , // list of receivers
      subject: "Welcome to Employee Portal", // Subject line
      html: `<h1>Hi `+user.name+`</h1>
      <h4>Thanks for joining us, Please check your login details</h4>
      <h5>Login Id :`+user.emailId+`</h5>
      <h5>Password :`+user.password+`</h5>
      `
    };
  
    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);
  
    callback(info);
  }