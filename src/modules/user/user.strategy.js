const passport = require("passport");
const path = require("path")
const { Strategy } = require("passport-jwt");
const User = require(path.join(process.cwd(),"src/modules/user/user.model.js"))
//const nodeCache = require(path.join(process.cwd(),"src/config/lib/nodeCache"))

module.exports = ()=>{
    function cookieExtractor(req){
        if (req && req.signedCookies) {
            return req.signedCookies["access_token"]
        }
    }
    passport.use(
        "jwt-token",
        new Strategy(
            {
                secretOrKey:process.env.TOKEN_SECRET,
                // secretOrKey:nodeCache.getValue("TOKEN_SECRET"),
                jwtFromRequest:cookieExtractor
            },
            async(payload,done)=>{
                const user = await User.findOne({
                    where:{
                        id:payload.id
                    }
                });
                if (!user) {
                    return done(null,false)
                }
                return done(null,user)
            }
        )
    )
}