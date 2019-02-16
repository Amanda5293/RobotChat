var apiAdd = require('../config')['tuling_api'];
var req = require('request');
var path = new Map();

function getTulingRes(response, text) {
    var options = {
        url: apiAdd,
        method: 'POST',
        headers: {
            'Content': 'application/json'
        },
        body: JSON.stringify({
            "reqType": 0,
            "perception": {
                "inputText": {
                    "text": text
                }
            },
            "userInfo": {
                "apiKey": "2facff08345b4652b36f42139094882b",
                "userId": "6767676"
            }
        })
    };
    req(options, function (error, resp, data) {
        if (!error && resp.statusCode == 200) {
            var resText = {text:'本宝宝不知道你说的四什么东东啊'};
            data = JSON.parse(data);
            if (data && data.results && data.results[0] && data.results[0].values) {
                resText = JSON.stringify(data.results[0].values);
                response.writeHead(200);
            } else {
                response.writeHead(400);
            }
            response.write(resText);
            response.end();
        }
    });
}
path.set('/getTulingRes', getTulingRes);
module.exports.path = path;