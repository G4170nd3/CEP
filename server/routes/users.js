const { Router } = require("express")
const mysql = require("mysql");
const router = Router();

const db = mysql.createConnection({
    user: "agytYNOlUB",
    host: "remotemysql.com",
    password: "FA5BTMxjBs",
    database: "agytYNOlUB",
    
    // user: "root",
    // host: "localhost",
    // password: "admin",
    // database: "cep",
});

router.post("/details", (request, response) => {
    
})

module.exports = router