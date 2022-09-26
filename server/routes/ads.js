const { Router, response } = require("express")
const mysql = require("mysql");
const router = Router();

const db = mysql.createConnection({
    // user: "agytYNOlUB",
    // host: "remotemysql.com",
    // password: "FA5BTMxjBs",
    // database: "agytYNOlUB",
    user: "test",
    host: "localhost",
    password: "password",
    database: "cep",
});


// /all
// /all/active
// /user/all
// /user/all/active
// /edit
// /delete

router.post("/post",(request, response)=>{
    const email = request.body.email;
    const title = request.body.adTitle;
    const description = request.body.adDesc;
    const photo = request.body.adPhoto;
    const price = request.body.adPrice;
    const priceType = request.body.adPriceType;
    try{
        db.query("select count(*) from adverts",
        (error, result)=>{
            if(error) throw error;
            var nextId;
            if(result>=1000) nextId=""+result;
            else if(result>=100) nextId="0"+result;
            else if(result>=10) nextId="00"+result;
            else nextId="000"+result;

            db.query("select * from adverts where adTitle=?",
            [title],
            (error1, result1)=>{
                if(error1) throw error1;
                if(result1.length!=0) response.send({statusCode:200, message:"an ad with the title already exits, either edit that or create a new ad with new title", adData:result1});
                else {
                    db.query("insert into adverts values(?,?,?,?,?,?,?,current_timestamp(),null,false)",
                    [email, nextId, title, description, photo, price, priceType],
                    (error2,result2)=>{
                        if(error2) throw error2;
                        response.send({statusCode:201, message:"new ad created"});
                    })
                }
            })

        })
    } catch (error) {
        throw error;
    }
});

router.post("/all",(request, response)=>{
    try{
        db.query("select * from adverts",
        (error, result)=>{
            if(error) throw error;
            response.send({statusCode:202, message:"all ads fetched succesfully", adData:result});
        })
    } catch (error){
        throw error;
    }
});

router.post("/all/active",(request, response)=>{
    const email = request.body.email;
    try{
        db.query("select * from adverts where email!=? and isActive=true",
        [email],
        (error, result)=>{
            if(error) throw error;
            response.send({statusCode:203, message:"all active ads except the same user fecthed", adData:result});
        })
    } catch (error) {
        throw error;
    }
});

router.post("/user/all",(request, response)=>{
    const email = request.body.email;
    try{
        db.query("select * from adverts where email=?",
        [email],
        (error, result)=>{
            if(error) throw error;
            response.send({statusCode:204, message:"ads of the user sent succesfully", adData:result});
        })
    } catch (error) {
        throw error;
    }
});

router.post("/user/all/active",(request, response)=>{
    const email = request.body.email;
    try{
        db.query("select * from adverts where email=? and isActive=true",
        [email],
        (error, result)=>{
            if(error) throw error;
            response.send({statusCode:205, message:"active ads of the user sent succesfully", adData:result});
        })
    } catch (error) {
        throw error;
    }
});

router.post("/edit",(request, response)=>{
    const email = request.body.email;
    const adId = request.body.adId;
    const title = request.body.adTitle;
    const description = request.body.adDesc;
    const photo = request.body.adPhoto;
    const price = request.body.adPrice;
    const priceType = request.body.adPriceType;
    try{
        db.query("select * from adverts where adId=?",
        [adId],
        (error, result)=>{
            if(error) throw error;
            if(email!=result[0].email) response.send({statusCode:206, message:"unauthorized access"});
            else if(title==result[0].adTitle && description==result[0].adDesc && photo==result[0].adPhoto){
                response.send({statusCode:207, message:"no change in title, description or the photo detected"});
            } else {
                db.query("update adverts set adTitle=?, adDesc=?, adPhoto=?, adPrice=?, adPriceType=?, lastEdited=current_timestamp()",
                [title,description,photo,price,priceType],
                (error1,result1)=>{
                    if(error1) throw error1;
                    response.send({statusCode:208, message:"entry updated", adData:result[0]});
                })
            }
        })
    } catch (error) {
        throw error;
    }
});

router.post("/delete",(request, response)=>{
    const adId = request.body.adId;
    try{
        db.query("delete from adverts where adId=?",
        [adId],
        (error, result)=>{
            if(error) throw error;
            response.send({statusCode:209, message:"ad deleted succesfully"});
        })
    } catch (error){
        throw error;
    }
});


module.exports = router