const jwt = require("jsonwebtoken");
const path = require("path");
const nodeCache = require(path.join(process.cwd(),'src/config/lib/nodecache.js'))
const generateAccessToken = (user)=>{
    console.log("asdasd====",nodeCache.getValue("TOKEN_SECRET"));

    const token = jwt.sign(
        {id:user.id},
        //nodeCache.getValue("TOKEN_SECRET"),
        "asdasdqqq",
        {issuer:user.id.toString()}
    );
    
    return token
}
module.exports = generateAccessToken