const passport = require("passport");

module.exports.UserStrategy = (req,res,next) => {
    const auth = passport.authenticate("jwt-token",(error,user)=>{
        if (error) {
            return res.status(500).send("internal server error")
        }
        if (!user) {
            return res.status(401).send("unauthorized user")
        }
        req.login(
            user,
            {session:false},
            (err)=>{
                if (err) {
                    return next(err)
                }
                return next()
            }
        )
    })
    auth(req,res,next)
}