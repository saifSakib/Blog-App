const passport = require("passport")

const UserStrategy = (req,res,next)=> {
    const auth = passport.authenticate("user-token",async(error,user)=>{
        if (!user) {
            return res.status(404).send("unauthorized user")
        }
        if (error) {
            return res.status(404).send("unauthorized user")
        }
        
        req.login(
            user,
            {session:false},
            (err)=>{
                if (err) {
                    return next(err)
                }else{
                   next()
                }
            }
        )
    })
    auth(req,res,next)
}

module.exports = UserStrategy