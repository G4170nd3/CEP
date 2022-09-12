const { Router } = require("express")
const mysql = require("mysql");
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer");

const router = Router();

const db = mysql.createConnection({
    user: "agytYNOlUB",
    host: "remotemysql.com",
    password: "FA5BTMxjBs",
    database: "agytYNOlUB",
    // user: "root",
    // host: "localhost",
    // password: "password",
    // database: "cep",
});

const smtpTransport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "satyam1286.be20@chitkarauniversity.edu.in",
        pass: "Satyam@321"
    },
    tls: {
        rejectUnauthorized: false
    }
});
const mailDetails = { 
    // sender: <parameter to be used>
    subject: "Test email",
}
function sendMail(userId, email){
    try{
        console.log(email);
        smtpTransport.sendMail(mailDetails,function(err,info){
            if(error) console.log(error);
        })
    } catch(error){
        db.query("delete from everify where userId=?",
        [userId],
        (error1)=>{
            if(error1) console.log(error1);
        })
        db.query("drop event deluser_?",
        [userId],
        (error1)=>{
            if(error1) console.log(error1);
        })
    }
}


router.post("/send", (request, response)=>{

    //possibilities:
    //1. new otp sent               done
    //2. clicked before 1 min
    //3. clicked after 1 min but before 10 min - update otp
    //4. clicked after 10 min - otp expired

    const email = request.body.vemail;
    const otp = Math.floor(Math.random()*90000)+10000;
    var userId;
    htmlString = `<div>Hello world this is the otp <b>${otp}</b></div>`;
    mailDetails.to = email;
    mailDetails.html = htmlString;
    db.query("select * from users where email=?",
        [email],
        (error,result)=>{
            if(error) console.log(error);
            if(result.length>0){
                userId = result[0].userId;
                db.query("select originTime from everify where userId=?",
                    [userId],
                    (error1,result1)=>{
                        if(error1) throw error1;
                        else if(result1.length>0){    //already an existing entry in otp table
                            var timeGap = parseInt(Date.now()/1000)-parseInt(result1[0].originTime);
                            if(timeGap < 60){  //less than 1 minute, no update allowed.
                                response.send({statusCode: 301,message:"cant send another one, its been less than a min lol"})
                            } else {   //over 1 minute, allow update.
                                //generate otp and send
                                
                                db.query("drop event deluser_?",
                                [userId],
                                (errr)=>{
                                    if(errr) console.log(errr);
                                })

                                db.query("update everify set originTime=?,otp=? where userId=?",
                                [parseInt(Date.now()/1000),otp,userId],
                                (errr)=>{
                                    if(errr) console.log(errr);
                                    else {
                                        sendMail(userId, email);
                                        response.send({statusCode: 300, message:"otp updated."});
                                    }
                                })

                                db.query("create event deluser_? on schedule at current_timestamp() + interval 10 minute do delete from everify where email=?",
                                [userId, email],
                                (errr)=>{
                                    if(errr) console.log(errr);
                                })

                            }
                        } else {    //creating a new entry for the otp table
                            db.query("insert into everify values(?,?,?,?)",
                            [userId,email,otp,parseInt(Date.now()/1000)],
                            (error,result)=>{
                                if(error) console.log(error);
                                else {
                                    sendMail(userId, email);
                                    response.send({statusCode:300, message: "otp sent"});
                                }
                            })

                            db.query("create event deluser_? on schedule at current_timestamp() + interval 10 minute do delete from everify where email=?",
                            [userId,email],
                            (error)=>{
                                if(error) console.log(error);
                            })
                        }
                    })

            } else response.send({statusCode: 302,message:"Invalid details"})
        })


})

router.post("/verify",(req,res)=>{
    const otp = req.body.otpVal;
    const email = req.body.vemail;
    db.query("select otp,userId,originTime from everify where email=?",
    [email],
    (error,result)=>{
        if(error) console.log(error)
        if(result.length==0) res.send({status: false, message:"No entries found."})
        // console.log(result[0].otp,otp);
        // console.log(otp==result[0].otp);
        if(otp==parseInt(result[0].otp)){
            db.query("drop event deluser_?;",
            [result[0].userId],
            (error1)=>{
                if(error1) console.log(error1);
            });

            db.query("delete from everify where email=?",
            [email],
            (error1)=>{
                if(error1) console.log(error1);
            });

            db.query("update users set isVerified=? where userId=?",
            [true,result[0].userId],
            (error1)=>{
                if(error1) console.log(error1);
            });
            res.send({status: true});
        }else {
            res.send({status:false, message:"incorrect otp entered"})
        }
    })
});
module.exports = router