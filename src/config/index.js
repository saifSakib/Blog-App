const _ = require("lodash");
const path = require("path");
const glob = require("glob");
const nodeCache = require(path.join(process.cwd(),"src/config/lib/nodeCache"))

// globPatterns = ["src/modules/admin/admin.routes.js"], excludes = undefined
function getGlobbedPaths(globPatterns, excludes) {
	let urlRegex = new RegExp("^(?:[a-z]+:)?//", "i");

	let output = [];

	if (_.isArray(globPatterns)) {
		globPatterns.forEach(function (globPattern) {
			output = _.union(output, getGlobbedPaths(globPattern, excludes));
		});
	} else if (_.isString(globPatterns)) {
		if (urlRegex.test(globPatterns)) {
			output.push(globPatterns);
		} else {
			let files = glob.sync(globPatterns);
			if (excludes) {
				files = files.map(function (file) {
					if (_.isArray(excludes)) {
						for (let i in excludes) {
							if (excludes.hasOwnProperty(i)) {
								file = file.replace(excludes[i], "");
							}
						}
					} else {
						file = file.replace(excludes, "");
					}
					return file;
				});
			}
			output = _.union(output, files);
		}
	}

	return output;
}

const getGlobalConfig=()=>{
    const assets = require(path.join(process.cwd(),"src/config/assets/defaults"));
    const config = {
        routes:getGlobbedPaths(assets.routes)
    };
    return config;
}
const initEnvVariables=()=>{
    const secrets = {
        PORT:"5000",
        COOKIE_SECRET:"cookie-secret"
    }
    for (let key in secrets){
        nodeCache.setValue(key,secrets[key])
    }
}

module.exports.getGlobalConfig=getGlobalConfig;
module.exports.initEnvVariables=initEnvVariables;