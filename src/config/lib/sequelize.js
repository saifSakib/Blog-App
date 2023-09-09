const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    'blogApp',
    'root',
    '',
    {
        host:'localhost',
        dialect:'mysql',
        sync:true,
        logging:false
    }
);

module.exports = sequelize