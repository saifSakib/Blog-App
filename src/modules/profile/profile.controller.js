const path = require("path")
const Profile = require(path.join(process.cwd(),"src/modules/profile/profile.model"))
const ProfilePermission = require(path.join(process.cwd(),"src/modules/permission/profilePermission.model"))

const getProfiles = async(req,res) => {
    const profiles = await Profile.findAll()
    res.send(profiles)
}

const createProfile = async(req,res) => {
    try {
        const {title,permission_ids} = req.body

        const [profile,created] = await Profile.findOrCreate({
            where:{
                title:title
            },
            
            defaults:{
                created_by:req.user.id,
                updated_by:null
            }
        })

        if (!created) {
            return res.status(409).json("sorry!Profile already exists")
        }

        await Promise.all(permission_ids.map(async permission_id=>{
            await ProfilePermission.create({
                profile_id:profile.id,
                permission_id,
                created_by:req.user.id,
                updated_by:null
            })
        }))

        const ProfilePermissions =await Profile.findOne({
            where:{
                id:profile.id
            },
            include:[
                {
                    model:ProfilePermission,
                    as:"profile_permissions"
                }
            ]
        });

        res.status(201).json(ProfilePermissions)
    } catch (error) {
        res.status(500).json({error:error})
    }
    
}

const updateProfile = async(req,res) => {
    try {
        const id = req.params.id
        const {title,permission_ids} = req.body
        const profile = await Profile.findOne({where:{id}})
        
        if (!profile) {
           return res.status(401).json({error:"profile could not be found"})
        }

        if (title) {
            await profile.update({title,updated_by:req.user.id})
        }

        if (permission_ids) {
            await ProfilePermission.destroy(
                {
                    where:{
                      profile_id:id
                    },
                    //truncate:true,
                }
            )

            await Promise.all(permission_ids.map(async permission_id=>{
                await ProfilePermission.create({
                    profile_id:profile.id,
                    permission_id,
                    updated_by:req.user.id,
                })
            }));

        }

        const ProfilePermissions =await Profile.findOne({
            where:{
                id:profile.id
            },
            include:[
                {
                    model:ProfilePermission,
                    as:"profile_permissions"
                }
            ]
        });

        res.status(200).json(ProfilePermissions)
    } catch (error) {
        res.status(500).json({error:error})
    }
    
}


const deleteProfile = async(req,res)=>{
    try {
        const id = req.params.id;
        const profile = await Profile.findOne({where:{id}})
        
        if (!profile) {
            return res.status(401).json({error:"profile could not be found"})
        }

        await profile.destroy({
            where:{
                id:profile.id
            },
        });

        await ProfilePermission.destroy({
            where:{
                profile_id:profile.id
            }
        });
        
        res.status(200).json({success:"profile deleted"})
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports.getProfiles = getProfiles
module.exports.createProfile = createProfile
module.exports.updateProfile = updateProfile
module.exports.deleteProfile = deleteProfile