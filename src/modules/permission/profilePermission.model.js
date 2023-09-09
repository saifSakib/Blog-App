const path = require("path");
const { DataTypes } = require("sequelize");
const sequelize = require(path.join(process.cwd(),'src/config/lib/sequelize.js'));

const ProfilePermissions = sequelize.define(
    'profile-permissions',
    {
        id:{
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            allowNull:false,
            primaryKey:true
        },
        profile_id:{
            type:DataTypes.UUID,
        },
        permission_id:{
            type:DataTypes.UUID
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
        tablename:'profile-permissions',
        createdAt:'created_at',
        updatedAt:'updated_at'
    }
);

module.exports = ProfilePermissions;