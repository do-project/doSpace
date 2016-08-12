var nf = sm("do_Notification");
var app = sm("do_App");
var page = sm("do_Page");
var $U = require("url");
var rootview = ui("$");
var pbar = ui(rootview.add("progressbar", "source://view/kit/pbar.ui", 0, 128));
var hash = require("hash");
var verify = require("verify");
var global = sm("do_Global");

var anim_button = mm("do_Animation", "BUTTONTOUCHDOWN", "app");

var accesstoken =  global.getMemory("user_token");

var back = ui("back");
back.on("touch",function(){
	app.closePage();
});

var page = sm("do_Page");
page.on("back", function() { // 监听android 的返回按钮;
    app.closePage();
});

var delay3 = mm("do_Timer");
delay3.delay = 0;
delay3.interval = 1000;
delay3.DURATION = 1;
delay3.on("tick", function(){
    if(this.DURATION <= 0){
        this.stop();
        return page.fire("back");
    }
    this.DURATION--;
});


var qiandao_http = mm("do_Http");
qiandao_http.method = "get";
qiandao_http.timeout = "60000";
qiandao_http.contentType = "application/json";
qiandao_http.on("fail", function(data){
    pbar.visible = false;
}).on("success", function(data){
    pbar.visible = false;
    nf.alert(data)
});

pbar.visible = true;
qiandao_http.request();
qiandao_http.url = $U.url.getUrl+"signrecord"
deviceone.print(qiandao_http.url)
qiandao_http.setRequestHeader("Authorization","Bearer "+accesstoken);
