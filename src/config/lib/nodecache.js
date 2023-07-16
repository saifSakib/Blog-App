const nodeCache = require("node-cache");
const cache = new nodeCache()

module.exports.getValue=(key)=>cache.get(key)||process.env.key
module.exports.setValue=(key,value)=>cache.set(key,value)
module.exports.getAllValues=()=>cache.keys()