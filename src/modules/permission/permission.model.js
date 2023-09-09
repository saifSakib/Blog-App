const path = require("path");
const { DataTypes } = require("sequelize");
const sequelize = require(path.join(process.cwd(),'src/config/lib/sequelize.js'));

const Permission = sequelize.define(
    'permissions',
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
        tablename:'permissions',
        createdAt:'created_at',
        updatedAt:'updated_at'
    }
);

module.exports = Permission;