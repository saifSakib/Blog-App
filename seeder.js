
function init() {
    const path = require("path");
    const sequelize = require(path.join(
        process.cwd(),
        "/src/config/lib/sequelize"
    ));

    sequelize.query('CREATE DATABASE IF NOT EXISTS blog', (err, res) => {
        if(err) {
            console.log(err);
        } else {
            console.log(res);
        }
    });

    const user = require(path.join(process.cwd(), "src/modules/user/user.model.js"));

    sequelize.sync()
    .then(() => console.log("success"))
    .catch((err) => console.log(err));    
}

init();