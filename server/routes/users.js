const { Router, response } = require("express")
const mysql = require("mysql");
const router = Router();

const db = mysql.createConnection({
    // user: "agytYNOlUB",
    // host: "remotemysql.com",
    // password: "FA5BTMxjBs",
    // database: "agytYNOlUB",
    user: "root",
    host: "localhost",
    password: "password",
    database: "cep",
});

router.post("/details", (request, response) => {
    // console.log(request);
    const email = request.body.userEmail;
    db.query("select * from users where email=?",
    [email],
    (error,result)=>{
        if(error) console.log(error);
        else {
            if(result.length==0)
                response.send({statusCode: 400, message: "user not found"});
            else
                response.send({statusCode: 401, message: "user details found", data:result[0]});
        }
    });
});

router.post("/update",(request, response)=>{
    const email = request.body.email;
    const rollNum = request.body.rollNum;
    const campus = request.body.campus;
    const branch = request.body.branch;
    const batch = request.body.batch;
    const isHosteller = request.body.isHosteller
    const hostel = request.body.hostel;
    const roomNum = request.body.roomNum;
    //if day scholar then no hostel and roomNum
    if((rollNum==null || campus==null || branch==null || batch==null || isHosteller==null) || (isHosteller==false && (hostel==null || roomNum==null))){
        response.send({statusCode: 402, message: "null value(s) present"});
    } else {
        try{
            db.query("update users set rollNum=?, campus=?, branch=?, batch=?, isHosteller=?, hostel=?, roomNum=? where email=?",
            [rollNum, campus, branch, batch, isHosteller, hostel, roomNum, email],
            (error, result)=>{
                if(error) throw error;
                else {
                    db.query("select * from users where email=?",
                    [email],
                    (error,result)=>{
                        if(error) throw error;
                        response.send({statusCode:403, message:"user data updated succesfully", data:result[0]});
                    })
                }
            });
        } catch (error) {
            throw error;
        }
    }
});

// uni id
// campus
// branch
// batch
// hosteller/dayscholar
// hostel
// roomno
// 

module.exports = router