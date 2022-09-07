const { Router } = require("express")
const mysql = require("mysql");
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

router.post("/details", (request, response) => {
    // console.log(request);
    const email = request.body.userEmail;
    db.query("select * from users where email=?",
    [email],
    (error,result)=>{
        if(error) console.log(error);
        else {
            if(result.length==0)
                response.send({statusCode: 404, message: "user not found", data:null});
            else
                response.send({statusCode: 300, message: "user details found", data:result});
        }
    });
})

module.exports = router