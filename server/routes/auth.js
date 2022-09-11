const refreshToken = require('../util/tokenFunctions.js');
const { Router, response } = require("express")
const mysql = require("mysql");
const bcrypt = require("bcrypt")

const router = Router();

let db
try {
    db = mysql.createConnection({
        user: "agytYNOlUB",
        host: "remotemysql.com",
        password: "FA5BTMxjBs",
        database: "agytYNOlUB",
        // user: "root",
        // host: "localhost",
        // password: "password",
        // database: "cep",
    });
} catch (error) {
    console.log(error)
}

router.post("/register", (request, response) => {
    const name = request.body.regName;
    const password = request.body.regPassword;
    const email = request.body.regEmail;
    try{
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
                        db.query("insert into users(userId,name,password,email,isComplete) values(?,?,?,?,false)",
                        [result1.length + 1, name, password, email],
                        (err) => {
                            if (err) console.log(err);
                            else {
                                const reftoken = refreshToken(email);
                                db.query("insert into refreshToken values(?,?)",
                                [email,reftoken],
                                (error)=>{
                                    if(error) throw error;
                                });
                                response.send({ statusCode: 500, message: "Register Succesful and token noted", data: result1 });
                            }
                        });
                    });
                } else {
                    response.send({ statusCode: 501, message: "A user with that email already exists. Please Log In or use a different email." });
                }
            }
        });
    } catch (error) {
        throw error;
    }

    // db.query("insert into regdetails(name,password,email) values(?,?,?)",
    // [name,password,email],
    // (error,result)=>{
    //     console.log(error);
    // });

});

router.post("/checkToken",(request,response)=>{
    const refToken = request.body.refreshToken;
    try{
        db.query("select * from refreshToken where refreshToken=?",
        [refToken],
        (error,result)=>{
            if(error) throw error;
            else{
                if(result.length==0){
                    response.send({statusCode:403, message: "unauthorized access"});
                } else {
                    response.send({statusCode:440, message: "token valid, verified!", data:result[0].email});
                }
            }
        });
    } catch (error){
        throw error;
    }
});

router.post("/login", (request, response) => {
    const email = request.body.loginEmail;
    const password = request.body.loginPassword;
    console.log(email, password);
    // console.log(email, password);
    // db query to fetch login info
    try {
        db.query("select * from users where email=? and password=?",
        [email, password],
        (error, result) => {
            // console.log(result);
            if (error) {
                console.log(error);
            }
            else if (result.length > 0) {
                const reftoken = refreshToken(email);
                db.query("select * from refreshToken where email=?",
                [email],
                (error, result)=>{
                    if(error) throw error;
                    if(result.length==0){
                        db.query("insert into refreshToken values(?,?)",
                        [email,reftoken],
                        (error)=>{
                            if(error) throw error;
                        });
                    } else {
                        db.query("update refreshToken set refreshToken=? where email=?",
                        [reftoken,email],
                        (error, result)=>{
                            if(error) throw error;
                        });
                    }
                });
                response.send({statusCode: 550, message: "Login succesful.", data: result});
            } else {
                response.send({ statusCode: 502, message: "Login info doesn't match any records." });
            }
        });
    } catch (error){
        throw error;
    }
});
module.exports = router