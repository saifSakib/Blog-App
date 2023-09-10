const path = require("path");

const User = require(path.join(process.cwd(),"src/modules/user/user.model.js")); 

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

module.exports.ServiceGuard = (allowedServices)=> {
    return function (req,res,next){
        const UserServices = getUserServices(req.user.id);
        console.log(UserServices);
        next()
    }
}