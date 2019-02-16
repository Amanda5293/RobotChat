var globalConf = require('../config');
var staticArr = globalConf['static_file'].split('|');
var mimeType = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
};
function isStaticFile(pathname) {
    for (var i = 0, len = staticArr.length; i < len; i++) {
        var staticType = staticArr[i];
        if (pathname.indexOf(staticType) == pathname.length - staticType.length) {
            return true;
        }
    }
    return false;
}

function getMIMEType(pathname) {
    var result = 'text/plain';
    for (var i = 0, len = staticArr.length; i < len; i++) {
        var staticType = staticArr[i];
        if (pathname.indexOf(staticType) == pathname.length - staticType.length) {
            return mimeType[staticType.replace('.', '')];
        }
    }
    return result;
}

function handleErrResponse(response, errCode, errText) {
    response.writeHead(errCode);
    response.write('<html><body><h1>' + errText + '</h1></body></html>');
    response.end();
}

module.exports = {
    isStaticFile,
    getMIMEType,
    handleErrResponse
}