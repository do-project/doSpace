var login = ui("login")
var app = sm("do_App")
var nf = sm("do_Notification");
var listcache = sm("do_DataCache");
var nick = ui("nick");
var global = sm("do_Global");
var page = sm("do_Page");
var rootview = ui("$");
var $U = require("url");
var pbar = ui(rootview.add("progressbar", "source://view/kit/pbar.ui", 0, 128));
var share = ui(rootview.add("share", "source://view/kit/share.ui", 0, 0));
var do_ImageView = ui("do_ImageView")
var num = ui("num");//积分

page.on("result",function(){
	if(global.getMemory("user_token") == "")
	{
		nick.text = "点击登录";
		do_ImageView.source = "source://image/me.png"
		num.text = "0";
	}else {
		//头像缓存
		var datacache = listcache.loadData({key: "cache_img"});
		do_ImageView.source = datacache[3];
		nick.text = datacache[0];
	    num.text = datacache[7];
	}
})

if(global.getMemory("user_token") == "")
{
	nick.text = "点击登录";
	do_ImageView.source = "source://image/me.png"
	num.text = "0";
}else {
	//头像缓存
	var datacache = listcache.loadData({key: "cache_img"});
	do_ImageView.source = datacache[3];
	nick.text = datacache[0];
    num.text = datacache[7];
}

login.on("touch",function(){
	if(global.getMemory("user_token") == ""){
		app.openPage({source:"source://view/my/login.ui",animationType:"push_r2l_1"});
	}
	else{
		app.openPage({source:"source://view/my/me.ui",animationType:"push_r2l_1"});
	}
});
//签到
var qiandao = ui("qiandao");
qiandao.on("touch",function(){
	if(global.getMemory("user_token") == ""){
		app.openPage({source:"source://view/my/login.ui",animationType:"push_r2l_1"});
	}else{
		pbar.visible = true;
		qiandao_http.url = $U.url.getUrl+"signrecord";
		qiandao_http.setRequestHeader("Authorization","Bearer "+global.getMemory("user_token"))
		qiandao_http.request();
	}
});
//qrcode
var scan = ui("scan");
scan.on("touch",function(){
	app.openPage({source:"source://view/scan/scan.ui",animationType:"push_r2l_1"});
});
//setting
var setting = ui("setting");
setting.on("touch",function(){
	app.openPage({source:"source://view/my/setting.ui",animationType:"push_r2l_1"});
});
//message center
var message = ui("message");
message.on("touch",function(){
	if(global.getMemory("user_token") == ""){
		app.openPage({source:"source://view/my/login.ui",animationType:"push_r2l_1"});
	}
	else{
		app.openPage({source:"source://view/my/xxts.ui",animationType:"push_r2l_1"});
	}
});
//意见反馈
var feedback = ui("feedback");
feedback.on("touch",function(){
	app.openPage({source:"source://view/my/suggest.ui",animationType:"push_r2l_1"});
});

//个人中心 
var person = ui("person");
person.on("touch",function(){
	if(global.getMemory("user_token") == ""){
		app.openPage({source:"source://view/my/login.ui",animationType:"push_r2l_1"});
	}
	else{
		app.openPage({source:"source://view/my/me.ui",animationType:"push_r2l_1"});
	}
});


//签到
var qiandao_http = mm("do_Http");
qiandao_http.method = "get";
qiandao_http.timeout = "60000";
qiandao_http.contentType = "application/json";
qiandao_http.on("fail", function(data){
    pbar.visible = false;
}).on("success", function(data){
    pbar.visible = false;
    if("\"签到成功\"" == data){
    		nf.alert("签到成功！");
    	 	num.text = Number(num.text) + 2;
    	}else{
    		nf.alert("今天已经签到过了，明天再来吧！");
    	}
});

//打赏
var do_ALayout_18 = ui("do_ALayout_18");
do_ALayout_18.on("touch",function(){
	app.openPage({source:"source://view/my/dashang.ui",animationType:"push_r2l_1"});
});

//请缓存
var do_ALayout_16 = ui("do_ALayout_16");
var dh = ui("dh");
var mTimer = mm("do_Timer");
mTimer.delay = 5000;
mTimer.on("tick", function(data, e) {
	dh.stop();
	dh.visible = false;
	nf.alert("清理成功！");
	mTimer.stop();
});
do_ALayout_16.on("touch",function(){
	dh.visible = true;
	dh.startGif("source://image/donghua.gif", -1);	
	mTimer.start();
});

var img_sj = ui("img_sj")
var device = sm("do_Device");
var os = device.getInfo().OS == "android" ? 1 : 0;
var version = global.getVersion().ver;


var update_http = deviceone.mm("do_Http");
update_http.method = "get";
update_http.timeout = "60000";
update_http.contentType = "application/json";
update_http.request();
update_http.on("fail", function(data){
    if (pbar) $U.fail(data, pbar);
}).on("success", function(data){
    if (pbar) pbar.visible = false;
    if (data.VersionNum != version) {
    		img_sj.visible = true
    } else {
    		img_sj.visible = false
    }
});
if(os == 1){
	update_http.url = $U.url.getUrl+"versionUpdate" + "?" + $U.queryString({type: os});
}else if(os == 0){
	update_http.url = $U.url.ios_update_url + $U.queryString({type: os});
}

var do_ALayout_17 = ui("do_ALayout_17");
do_ALayout_17.on("touch",function(){
	app.openPage({source:"source://view/my/jubao.ui",animationType:"push_r2l_1"});
});

var device = sm("do_Device");

//android分享
var fx = ui("fx")
fx.on("touch",function(k,v){
	if(device.getInfo().OS == "android"){
		var M0011_share = sm("M0011_share")
		M0011_share.share("标题", "这个App不错哦，帮助我快速学习 ")
	}else {
		nf.alert("正在建设中...")
	}
})
