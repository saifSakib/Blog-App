const {Sequelize} = require("sequelize");
// const path = require("path");
// const nodeCache = require(path.join(process.cwd(),"src/config/lib/nodeCache"))
// const DB_USERNAME = nodeCache.getValue(DB_USERNAME);
// const DB_PASSWORD = nodeCache.getValue(DB_PASSWORD);
// const DB_HOST = nodeCache.getValue(DB_HOST);
const sequelize = new Sequelize('blog','root','',{
    host:"localhost",
    dialect:'mysql',
    sync:true,
    logging:false
});

module.exports = sequelize

