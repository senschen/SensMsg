/**
 * Created by sens on 2017/2/7.
 */
function SensMsg(msg,time,isKeep,isMobile) {
    if (!(this instanceof arguments.callee)) {
        return new arguments.callee();
    }
    this.msg = msg || '';
    this.time = time || 3000;   //弹窗停留时间
    this.ele = null;           //弹窗的父容器
    this.isKeep = isKeep || false;  //弹窗结束后是否保留dom
    this.isMobile = isMobile || false;
    this.init();
}

SensMsg.prototype = {
    constructor: SensMsg,
    preCssText: "max-width: 200px;background: rgba(0,0,0,.6);border-radius: 5px;" +
    "text-align: center;word-break: break-all;padding: 0 10px;position: absolute;left: 50%;" +
    "transform: translate(-50%,50%) translate3d(0,0,0); -webkit-transform: translate(-50%,50%) translate3d(0,0,0);" +
    "color: #fff;font-size: 14px;transition: transform .5s; -webkit-transition: transform .5s;z-index: 9999;" +
    "height: 0;visibility: hidden;",
    nextCssText: "max-width: 200px;background: rgba(0,0,0,.6);border-radius: 5px;" +
    "text-align: center;word-break: break-all;padding: 5px 10px;position: absolute;left: 50%;" +
    "transform: translate(-50%,-50%) translate3d(0,0,0); -webkit-transform: translate(-50%,-50%) translate3d(0,0,0);" +
    "color: #fff;font-size: 14px;transition: transform .5s; -webkit-transition: transform .5s;z-index: 9999;" +
    "height: auto;visibility: visible;",
    init: function () {
        _obj = this;
        var _ele = document.createElement('div');
        this.ele = _ele;
        _ele.innerHTML = '<div class="sensmsg-block">' + _obj.msg + '</div>';

        document.body.appendChild(_ele);

    },
    show: function () {
        var _obj = this;
        if (_obj.ele) {
            var _mainEle = _obj.ele.childNodes[0];
            _mainEle.style.cssText = _obj.preCssText;
            _mainEle.clientWidth; //强制触发并完成重绘
            _mainEle.style.cssText = _obj.nextCssText;
            if(this.isMobile){
                _mainEle.style.top = screen.availHeight/4 + document.body.scrollTop + 'px'; //手机端位置靠上，避免键盘遮挡
            }
            else{
                _mainEle.style.top = screen.availHeight/2 + document.body.scrollTop + 'px';
            }
            setTimeout(function () {
                _obj.isKeep ? _mainEle.style.cssText = _obj.preCssText : document.body.removeChild(_obj.ele);
            }, _obj.time);
        }
    }
};