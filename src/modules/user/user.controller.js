const path = require("path");
const User = require(path.join(process.cwd(),"src/modules/user/user.model.js")); 
const generateAccessToken = require(path.join(process.cwd(),'src/modules/user/user.service.js'))
const signin = async (req,res) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({
            where:{
                email,
                password
            }
        });
        
        if (!user) {
            return res.status(401).send("invalid ccredentials")
        }
        
        const token = generateAccessToken(user)
        res.cookie('access_token', generateAccessToken(user), { httpOnly: true, signed:true });
    
        return res.status(200).json({access_token:token})
    } catch (error) {
        console.log(error);
        return res.status(200).json({error:"internal server error"})
    }
}

const getProfile = async(req,res) => {
    const user = await User.findOne({
        where:{
            id:req.user.id
        }
    });

    res.status(200).send(user)
}

module.exports.signin = signin
module.exports.getProfile = getProfile