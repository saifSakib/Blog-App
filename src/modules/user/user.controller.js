const path = require("path");
const { getAccessToken } = require(path.join(process.cwd(),"src/modules/user/user.service.js"));
const User = require(path.join(process.cwd(),"src/modules/user/user.model.js"))

const register = async(req,res) =>{
    const {email,password} = req.body;
    const [user,created] = await User.findOrCreate({
        where:{
            email:email
        },
        defaults:{
            email,
            password
        },
    });
    if (!created) {
        return res.status(409).send("user already exists")
    }
    return res.status(201).send(user);
}

const signin = async(req,res) =>{
    const {email,password} = req.body;
    const user = await User.findOne({
        where:{
            email:email,
            password:password
        }
    });
    res.cookie(
        "access_token",
        getAccessToken(user),
        {
            signed:true,
            httpOnly:true
        }
    )
    return res.status(200).json({access_token:getAccessToken(user)});
}

const getProfile = async(req,res)=>{
    const user = req.user;
    const userProfile =await User.findOne({
        where:{
            id : user.id
        }
    })
    res.status(200).json({data:userProfile})
}

module.exports.register = register
module.exports.signin = signin
module.exports.getProfile = getProfile