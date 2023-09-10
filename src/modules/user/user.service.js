const jwt = require("jsonwebtoken");
const path = require("path");
const nodeCache = require(path.join(process.cwd(),'src/config/lib/nodecache'))

const generateAccessToken = (user)=>{
    const token = jwt.sign(
        {id:user.id},
        process.env.TOKEN_SECRET,
        // nodeCache.getValue("TOKEN_SECRET"),
        {issuer:user.id.toString()}
    );
    
    return token
}
module.exports = generateAccessToken