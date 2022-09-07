const SHA256 = require("crypto-js")

module.exports = function tokenGenerator(email){
    const token = SHA256("$%uhhlala"+email+Date.now()+"%$uhhlala");
    return token;
}