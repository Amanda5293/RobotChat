var fs = require('fs');
var globalCof = {};
try {
    var config = fs.readFileSync('./server.conf');
    var configArr = config.toString().split('\r\n');
    for (var i = 0, len = configArr.length; i < len; i++) {
        var itemConfig = configArr[i].split(' = ');
        globalCof[itemConfig[0]] = itemConfig[1];
    }
} catch (e) {
    handleError(e);
}

function handleError(e) {
    console.log('缺少配置文件server.conf')
}


module.exports = globalCof;