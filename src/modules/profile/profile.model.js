const path = require("path");
const { DataTypes } = require("sequelize");
const sequelize = require(path.join(process.cwd(),'src/config/lib/sequelize.js'));

const ProfilePermission = require(path.join(process.cwd(),"src/modules/permission/profilePermission.model.js"))
const Profile = sequelize.define(
    'profiles',
    {
        id:{
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            allowNull:false,
            primaryKey:true
        },
        title:{
            type:DataTypes.STRING,
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
        tablename:'profiles',
        createdAt:'created_at',
        updatedAt:'updated_at'
    }
);

Profile.hasMany(ProfilePermission,{foreignKey:"profile_id",as:"profile_permissions",constraint:true});
module.exports = Profile;