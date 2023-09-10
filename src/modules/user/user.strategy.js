const passport = require("passport");
const { Strategy } = require("passport-strategy");
const path = require("path");
const nodeCache = require(path.join(process.cwd(),'src/config/lib/nodecache.js'))

const User = require(path.join(process.cwd(),"src/modules/user/user.model.js")); 

module.exports = () => {
    function cookieExtractor(req) {
        let token ;
        if(req && req.signedCookies){
            token = req.signedCookies["access_token"]
        }
        return token;  
    }
    
    passport.use(
        "jwt-token",
        new Strategy(
            {secretOrKey:nodeCache.getValue("JWT_SECRET"),jwtFromRequest:cookieExtractor},
            async(payload,done)=>{
                const user = await User.findOne({
                    where:{
                        id:payload.id
                    }
                });

                if (user) {
                    return done(null,user);
                }
                return done(null,false)    
            }
        ),
        

    );   
}