var http = require('http');
var url = require('url');
var fs = require('fs');
var globalCof = require('./config');
var loader = require('./loader');
var log = require('./log');
var tool = require('./utils/common');

http.createServer(function (requset, response) {
    var urlObj = url.parse(requset.url, true);
    var pathname = urlObj.pathname;
    if (tool.isStaticFile(pathname)) {
        try {
            var data = fs.readFileSync(globalCof['page_path'] + pathname);
            response.writeHead(200, { 'Content-Type': tool.getMIMEType(pathname) });
            response.write(data);
            response.end();
        } catch (e) {
            tool.handleErrResponse(response, 404, '404 NotFound');
        }
    } else {
        if (loader.has(pathname)) {
            var value = urlObj.query.text;
            try {
                loader.get(pathname)(response, value);
            } catch (e) {
                tool.handleErrResponse(response, 500, '500 Bad Server');
            }
        } else {
            tool.handleErrResponse(response, 404, '404 NotFound');
        }
    }
}).listen(globalCof.port)
log('服务器已启动');
console.log('服务器已启动');