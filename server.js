(async function(){
    const path = require("path");
    const app = require(path.join(process.cwd(),"src/config/lib/app"));
    const config = require(path.join(process.cwd(),"src/config"));
    await config.initEnvVariables()
    app.start() 
})()