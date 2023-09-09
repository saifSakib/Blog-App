const path = require("path");
const { DataTypes } = require("sequelize");
const sequelize = require(path.join(process.cwd(),'src/config/lib/sequelize.js'));

const Service = require(path.join(process.cwd(),"src/modules/service/service.model.js"))
const PermissionService = sequelize.define(
    'permission-services',
    {
        id:{
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            allowNull:false,
            primaryKey:true
        },
        permission_id:{
            type:DataTypes.UUID
        },
        service_id:{
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
        tablename:'permission-services',
        createdAt:'created_at',
        updatedAt:'updated_at'
    }
);

PermissionService.belongsTo(Service,{foreignKey:"service_id",as:"service"});
module.exports = PermissionService;