var fs = require('fs');
var globalConf = require('./config');
var files = fs.readdirSync('./' + globalConf['web_path']);
var loader = new Map();

for (var i = files.length - 1; i >= 0; i--) {
    var filePath = './' + globalConf['web_path'] + '/' + files[i];
    var temp = require(filePath);
    if (temp.path) {
        for (var [key, value] of temp.path) {
            if (loader.has(key)) {
                var errorMsg = "url path异常,url:" + key;
                throw new Error(errorMsg);
            } else {
                loader.set(key, value);
            }
        }
    }
}
console.log(loader)
module.exports = loader;