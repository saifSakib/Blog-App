const express = require('express');
const path = require("path")
const nodeCache = require(path.join(process.cwd(),"src/config/lib/nodeCache"))
const config = require(path.join(process.cwd(),"src/config"))
const cookieParser = require("cookie-parser")
module.exports=()=>{
    const app =  express();
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use(cookieParser(nodeCache.getValue("COOKIE_SECRET")));
    
    app.set("PORT",nodeCache.getValue("PORT"))

    const globalConfig = config.getGlobalConfig();
    globalConfig.routes.forEach(route => {
        // require(path.resolve(route))(app);
        require(path.join(process.cwd(),route))(app)
    });

    globalConfig.strategies.forEach(route => {
        require(path.join(process.cwd(),route))()
    });
    
    return app
    
}
