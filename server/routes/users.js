const { Router, response } = require("express")
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
});

router.post("/update",(request, response)=>{
    const rollNum = request.body.rollNum;
    const campus = request.body.campus;
    const branch = request.body.branch;
    const batch = request.body.batch;
    const isHosteller = request.body.isHosteller
    const hostel = request.body.hostel;
    const roomNum = request.body.roomNum;
    //if day scholar then no hostel and roomNum
    if((rollNum==null || campus==null || branch==null || batch==null || isHosteller==null) || (isHosteller==false && (hostel==null || roomNum==null))){
        response.send({message: "null value(s) present"});
    } else {
        try{
            db.query("insert into users(rollNum, campus, branch, batch, isHosteller, hostel, roomNum) values (?,?,?,?,?,?,?)",
            [rollNum, campus, branch, batch, isHosteller, hostel, roomNum],
            (error, result)=>{
                if(error) throw error;
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