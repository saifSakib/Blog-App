const path = require("path")
const  jwt  = require("jsonwebtoken")
const nodeCache = require(path.join(process.cwd(),"src/config/lib/nodeCache"))

module.exports.getAccessToken = (user)=>{
    return jwt.sign(
        {id:user.id},
        nodeCache.getValue("TOKEN_SECRET"),
        {
            issuer:user.id.toString()
        }
    )
}