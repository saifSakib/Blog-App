const path = require("path");
const { getProfiles, createProfile, updateProfile, deleteProfile } = require(path.join(process.cwd(),"src/modules/profile/profile.controller"))
const {UserStrategy} = require(path.join(process.cwd(),"src/modules/user/user.authentication.middleware.js")); 
const {ServiceGuard} = require(path.join(process.cwd(),"src/modules/core/authorization.middleware.js")); 
const Service = require(path.join(process.cwd(),"src/modules/core/authorization.constants.js")); 

module.exports = (app) => {
    app.get("/api/profiles",UserStrategy,ServiceGuard([Service.MANAGE_PROFILE]),getProfiles)
    app.post("/api/profiles",UserStrategy,ServiceGuard([Service.MANAGE_PROFILE]),createProfile)
    app.patch("/api/profiles/:id",UserStrategy,ServiceGuard([Service.MANAGE_PROFILE]),UserStrategy,updateProfile)
    app.delete("/api/profiles/:id",UserStrategy,ServiceGuard([Service.MANAGE_PROFILE]),UserStrategy,deleteProfile)
}