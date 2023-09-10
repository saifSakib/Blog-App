const path = require("path");

const User = require(path.join(process.cwd(),"src/modules/user/user.model.js")); 
const Profile = require(path.join(process.cwd(),"src/modules/profile/profile.model.js")); 
const Permission = require(path.join(process.cwd(),"src/modules/permission/permission.model.js"));
const ProfilePermission = require(path.join(process.cwd(),"src/modules/permission/profilePermission.model.js")); 
const Service = require(path.join(process.cwd(),"src/modules/service/service.model.js")); 
const PermissionService = require(path.join(process.cwd(),"src/modules/service/permissionService.model.js")); 
    
const getUserServices = async(id)=> {
    const user = await User.findOne({
        where:{
            id
        },
        include:[
            {
                model:Profile,
                as:"profile",
                include:[
                    {
                        model:ProfilePermission,
                        as:"profile_permissions",
                        include:[
                            {
                                model:Permission,
                                as:"permission",
                                include:[
                                    {
                                        model:PermissionService,
                                        as:"permission_services",
                                        include:[
                                            {
                                                model:Service,
                                                as:"service"
                                            }
                                        ]
                                    }
                                ]
                            }    
                        ]
                    }
                ]
            }
        ]
    });

    let service = []

    const profile_permissions = user.profile.profile_permissions
    for(const profile_permission of profile_permissions){
        const permission_services = profile_permission.permission.permission_services
        for(const permission_service of permission_services){
            service.push(permission_service.service)
        }
    }
    return service
}

const isPermitted = (userServices=[],allowedServices=[])=> {
    if (userServices.some(userservice=>allowedServices.includes(userservice.slug))){
        return true
    }
    return false 
}
module.exports.ServiceGuard = (allowedServices)=> {
    return async function (req,res,next){
        const UserServices = await getUserServices(req.user.id);
        if (isPermitted(UserServices,allowedServices)) {
            next()
        }else{
            return res.status(403).send("Forbidden. You are not authorized.");
        }
    }
}