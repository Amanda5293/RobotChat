/**
 * 
 * @param {请求地址} url 
 * @param {GET|POST} method 
 * @param {参数} data 
 * @param {回调} callback 
 * @param {是否异步} async 
 */
function ajax(url, method, data, callback, async) {
    var request;
    if (XMLHttpRequest) {
        request = new XMLHttpRequest();
    } else if (ActiveXObject) {
        request = new ActiveXObject('Microsoft.XMLHttp');
    }
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            console.log(request.status)
            if ((request.status >= 200 && request.status < 300) || request.status == 304) {
                typeof callback == 'function' ? callback(request.responseText) : '';
            } else {
                console.log('error' + request.response.status);
            }
        }
    }
    method = method.toUpperCase();
    if (method == "GET") {
        request.open('GET', url + '?' + data, async);
        request.send();
    }
    else if (method == 'POST') {
        request.open('POST', url, async);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.send(data);
    }

}