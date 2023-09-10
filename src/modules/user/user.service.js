const jwt = require("jsonwebtoken");
const path = require("path");
const nodeCache = require(path.join(process.cwd(),'src/config/lib/nodecache.js'))
const generateAccessToken = (user)=>{
    const token = jwt.sign(
        {id:user.id},
        nodeCache.getValue("JWT_SECRET"),
        {issuer:user.id.toString()}
    );
    
    return token
}
module.exports = generateAccessToken