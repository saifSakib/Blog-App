const path = require("path")
// const { UserStrategy } = require("./user.authentication.middleware")
const { UserStrategy } = require(path.join(process.cwd(),"src/modules/user/user.authentication.middleware"))
const {register,signin,getProfile}  = require(path.join(process.cwd(),"src/modules/user/user.controller.js"))

module.exports = (app)=>{
    app.post("/api/user/register",register)
    app.post("/api/user/signin",signin)
    app.get("/api/user/profile",UserStrategy,getProfile)
}