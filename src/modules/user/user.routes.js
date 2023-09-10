const path = require("path");

const {signin,getProfile} = require(path.join(process.cwd(),"src/modules/user/user.controller.js"))
const UserStrategy = require(path.join(process.cwd(),"src/modules/user/user.authentication.middleware.js")); 
const {ServiceGuard} = require(path.join(process.cwd(),"src/modules/core/authorization.middleware.js")); 
const Service = require(path.join(process.cwd(),"src/modules/core/authorization.constants.js")); 
module.exports = (app) => {
    app.post("/api/user/signin",signin)
    app.get("/api/user/profile",UserStrategy,ServiceGuard([Service.MANAGE_USER]),getProfile)
}