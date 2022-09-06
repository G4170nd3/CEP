const { Router } = require("express")
const mysql = require("mysql");
const bcrypt = require("bcrypt")

const router = Router();
//fuck you akarsh

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "cep",
});

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
module.exports = router