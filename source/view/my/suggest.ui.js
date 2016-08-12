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

var token =  ""

var back = ui("back");
back.on("touch",function(){
	app.closePage();
});

var page = sm("do_Page");
page.on("back", function() { // 监听android 的返回按钮;
    app.closePage();
});

var do_ALayout_4 = ui("do_ALayout_4")
do_ALayout_4.on("touch", function(){
	page.hideKeyboard();
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


var suggest_http = mm("do_Http");
suggest_http.method = "post";
suggest_http.timeout = "60000";
suggest_http.contentType = "application/json";
suggest_http.on("fail", function(data){
    pbar.visible = false;
}).on("success", function(data){
    pbar.visible = false;
    if(data){
        nf.toast("提交成功");
        delay3.start();
    }else nf.toast("提交失败");
});


var do_submit = ui("do_submit");
var do_suggest = ui("do_TextBox_1")
do_submit.on("touch", function(){
	page.hideKeyboard();
	var usersuggest = do_suggest.text.trim()
	if (usersuggest == "") return nf.toast("意见不可为空");
	var body = {
			Message : usersuggest
	}
	pbar.visible = true;
	suggest_http.body = body
	suggest_http.url = $U.url.getUrl+"suggestion?accessToken="+token
	deviceone.print(suggest_http.url)
	deviceone.print(suggest_http.body)
	suggest_http.request();

}).on("touchDown", function(){
    this.animate(anim_button);
});