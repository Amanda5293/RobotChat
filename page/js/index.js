(function () {
    var executeObj = {
        init: function () {
            this.btn = document.getElementsByClassName('btn')[0];
            this.inp = document.getElementById('inpChat');
            this.content = document.getElementsByClassName('content')[0];
            this.bindEvent();
        },
        bindEvent: function () {
            var _this = this;
            _this.btn.onclick = function () {
                var value = _this.inp.value;
                if (value == '') {
                    return;
                }
                _this.produceDialog(value, 1);
                _this.inp.value = '';
                //发送数据
                _this.sendReq(value);
            };

            document.onkeydown = function (e) {
                var value = _this.inp.value;
                if (e.key != 'Enter' || value == '') {
                    return;
                }
                _this.produceDialog(value, 1);
                _this.inp.value = '';
                //发送数据
                _this.sendReq(value);
            };
        },
        sendReq: function (value) {
            var _this = this;
            ajax('http://127.0.0.1:8090/getTulingRes', 'Get', 'text=' + value, function (data) {
                data = JSON.parse(data);
                _this.produceDialog(data.text, 2);
            }, true);
        },
        produceDialog: function (text, type) {
            var htmlStr = '';
            var dom = document.createElement('div');

            if (type == 1) {
                dom.classList = 'user chatting-person';
                htmlStr += '<div class="avatar person" ></div >\
                            <span class="chat-text">'+ text + '</span>'
            } else {
                dom.classList = 'robot chatting-person';
                htmlStr += '<div class="avatar robot" ></div >\
                            <span class="chat-text">'+ text + '</span>'
            }
            dom.innerHTML = htmlStr;
            this.content.appendChild(dom);
        }
    }
    executeObj.init();
}())