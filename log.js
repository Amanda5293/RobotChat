var fs = require('fs');
var globalConf = require('./config')
var logPath = globalConf['log_path'];

function log(content) {
    var date = new Date().toLocaleDateString();
    var filePath = logPath + '/' + date + 'log.txt';
    fs.appendFile(filePath, content + '\r', function (err) {
        if (err) {
            console.log('日志记录失败', err)
        }
    })
}

module.exports = log;