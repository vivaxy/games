/**
 * @since 14/12/8 上午9:50
 * @author vivaxy
 */
var Share = function () {
    this.image = 'http://vivaxy.github.io/vivaxy.png';
    this.link = location.href;
    this.title = document.title;
    this.content = document.title;
    if (typeof WeixinJSBridge == 'undefined') {
        document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady.bind(this), false);
    } else {
        this.onBridgeReady();
    }
};
Share.prototype.onBridgeReady = function () {
    var self = this;
    WeixinJSBridge.call('showOptionMenu');
    //发送给朋友
    WeixinJSBridge.on('menu:share:appmessage', function (argv) {
        WeixinJSBridge.invoke('sendAppMessage', {
            'img_url': self.image,
            'link': self.link,
            'desc': self.content,
            'title': self.title
        }, function (res) {
        });
    });
    //分享到朋友圈
    WeixinJSBridge.on('menu:share:timeline', function (argv) {
        WeixinJSBridge.invoke('shareTimeline', {
            'img_url': self.image,
            'link': self.link,
            'desc': self.content,
            'title': self.title
        }, function (res) {
        });
    });
};
