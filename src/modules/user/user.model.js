const path = require("path");
const { DataTypes } = require("sequelize");
const sequelize = require(path.join(process.cwd(),'src/config/lib/sequelize.js'));

const Profile = require(path.join(process.cwd(),"src/modules/profile/profile.model.js"))
const User = sequelize.define(
    'users',
    {
        id:{
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            allowNull:false,
            primaryKey:true
        },
        email:{
            type:DataTypes.STRING
        },
        password:{
            type:DataTypes.STRING,
        },
        profile_id:{
            type:DataTypes.UUID,
        },
        created_by:{
            type:DataTypes.UUID,
        },
        updated_by:{
            type:DataTypes.UUID,
        }
    },
    {
        timestamps:false,
        tablename:'users',
        createdAt:'created_at',
        updatedAt:'updated_at'
    }
);

User.belongsTo(Profile,{foreignKey:"profile_id",as:"profile"});
module.exports = User;