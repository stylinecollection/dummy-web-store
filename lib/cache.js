const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 300 });

module.exports = myCache;
