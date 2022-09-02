const { Router } = require("express")
const mysql = require("mysql");
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer");

const router = Router();

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "cep",
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
            if(err) console.log(err);
        })
    } catch(error){
        db.query("delete from everify where userId=?",
        [userId],
        (errorr)=>{
            if(errorr) console.log(errorr);
        })
        db.query("drop event deluser_?",
        [userId],
        (errorr)=>{
            if(errorr) console.log(errorr);
        })
    }
}

router.post("/register", (request, response) => {
    const name = request.body.regName;
    const password = request.body.regPassword;
    const email = request.body.regEmail;
    db.query("select * from users where email=?",
        [email],
        (error, result) => {
            if (error) console.log(error);
            else {
                if (result.length == 0) {
                    // further
                    db.query("select * from users",
                        (error1, result1) => {
                            if (error1) console.log(error1);
                            db.query("insert into users(userId,name,password,email) values(?,?,?,?)",
                                [result1.length + 1, name, password, email],
                                (err) => {
                                    if (err) console.log(err);
                                    else response.send({ statusCode: 500, message: "Register Succesful", data: result1 });
                                });

                        });
                } else {
                    response.send({ statusCode: 501, message: "A user with that email already exists. Please Log In or use a different email." });
                }
            }
        });

    // db.query("insert into regdetails(name,password,email) values(?,?,?)",
    // [name,password,email],
    // (error,result)=>{
    //     console.log(error);
    // });

});

router.post("/login", (request, response) => {
    const email = request.body.loginEmail;
    const password = request.body.loginPassword;
    console.log(email, password);
    // console.log(email, password);
    // db query to fetch login info
    db.query("select * from users where email=? and password=?",
        [email, password],
        (error, result) => {
            // console.log(result);
            if (error) {
                console.log(error);
            }
            else if (result.length > 0) {
                response.send({ statusCode: 550, message: "Login succesful.", data: result });
            } else {
                response.send({ statusCode: 502, message: "Login info doesn't match any records." });
            }
        })


});

router.post("/verifier", (request, response)=>{

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
        (err,res)=>{
            // console.log(Date.now()/1000);
            if(err) console.log(err);
            if(res.length>0){
                userId = res[0].userId;
                db.query("select originTime from everify where userId=?",
                    [userId],
                    (error,result)=>{
                        if(result.length>0){    //already an existing entry in otp table
                            var timeGap = parseInt(Date.now()/1000)-parseInt(result[0].originTime);
                            if(timeGap < 60){  //less than 1 minute, no update allowed.
                                response.send({message:"cant send another one, its been less than a min lol"})
                            } else {   //over 1 minute, allow update.
                                //generate otp and send
                                try {

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
                                                response.send({message:"otp updated."});
                                            }
                                        })
                                } catch (error) {   //incase the entry got deleted while working on it
                                    db.query("insert into everify values(?,?,?,?)",
                                        [userId,email,otp,parseInt(Date.now()/1000)],
                                        (errr)=>{
                                            if(errr) console.log(errr);
                                            else{
                                                sendMail(userId, email);
                                                response.send({message:"otp updated."});
                                            }
                                        })
                                }

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
                                        response.send({message: "otp sent"});
                                    }
                                })

                            db.query("create event deluser_? on schedule at current_timestamp() + interval 10 minute do delete from everify where email=?",
                                [userId,email],
                                (error)=>{
                                    if(error) console.log(error);
                                })
                        }
                    })

            } else response.send({message:"Invalid details"})
        })


})

router.post("/checker",(req,res)=>{
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
                (error)=>{
                    if(error) console.log(error);
                });

            db.query("delete from everify where email=?",
                [email],
                (error)=>{
                    if(error) console.log(error);
                });

            db.query("update users set isVerified=? where userId=?",
                [true,result[0].userId],
                (error)=>{
                    if(error) console.log(error);
                });
            res.send({status: true});
        }else {
            res.send({status:false, message:"incorrect otp entered"})
        }
    })
})

module.exports = router