const SHA256 = require("crypto-js/sha256")

module.exports = function tokenGenerator(email){
    const token = SHA256("$%uhhlala"+email+Date.now()+"%$uhhlala").toString();
    return token;
}