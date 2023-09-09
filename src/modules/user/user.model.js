const path = require("path")
const { DataTypes } = require("sequelize")
const sequelize = require(path.join(process.cwd(),"src/config/lib/sequelize"))
const User = sequelize.define(
    "users",
    {
        id:{
            allowNull:false,
            primaryKey:true,
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4
        },
        email:{
            allowNull:false,
            type:DataTypes.STRING,
        },
        password:{
            allowNull:false,
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
        tablename:"users",
        timestamps:false,
        creattedAt:"created_at",
        updatedAt:"updated_at"
    }
);

module.exports = User;