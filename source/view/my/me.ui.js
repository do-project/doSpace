var nf = sm("do_Notification");
var app = sm("do_App")
var storage = sm("do_Storage");
var page = sm("do_Page");
var global = sm("do_Global");
var verify = require("verify");
var icon = ui("icon");
var listcache = sm("do_DataCache");
var nickname = ui("nickname");
var email = ui("email");
var telephone = ui("telephone");
var QQ = ui("QQ");
var weixin = ui("weixin");
var weibo = ui("weibo");
var global = sm("do_Global");
var rootview = ui("$");
var $U = require("url");
var pbar = ui(rootview.add("progressbar", "source://view/kit/pbar.ui", 0, 128));
var menuor = ui(rootview.add("menuor", "source://view/kit/menu.ui", 0, 0));

//读取头像缓存
var datacache = listcache.loadData({key: "cache_img"});
if (datacache) {
	icon.source = datacache[3]
}
nickname.text = datacache[0] || "";
email.text = datacache[1] || "";
telephone.text = datacache[2]|| ""
QQ.text = datacache[4]|| "";
weixin.text = datacache[5]|| "";
weibo.text = datacache[6]|| "";


//上传头像
var upImg_http = mm("do_Http");
upImg_http.method = "post";
upImg_http.timeout = "60000";
upImg_http.contentType = "application/json";
upImg_http.on("fail", function(data){
    pbar.visible = false;
}).on("success", function(data){
    pbar.visible = false;
    icon.source = data.file_path
});

//设置头像
var do_Camera = sm("do_Camera");
var album = sm("do_Album")
var Camera = ui("Camera")

Camera.on("touch",function(){
	page.hideKeyboard();
	menuor.visible=true;
});

page.on("menu-listen", function(data){
    menuor.visible = false;
});

page.on("menu-listen1", function(data){
    menuor.visible = false;
    if(data.state == 1)  do_Camera.capture(720, -1, 72, false, function(d){
    	icon.source = d;
    	pbar.visible = true;
    	upImg_http.url = $U.url.uploadImgUrl;
	upImg_http.body = upImg_http.upload(d)
    	upImg_http.request();
    });
});

page.on("menu-listen2", function(data){
	menuor.visible = false;
    if(data.state == 2)  album.select(1, 720, -1, 72, function(d){
    	icon.source = d[0];
    	pbar.visible = true;
    	upImg_http.url = $U.url.uploadImgUrl;
    	upImg_http.body = upImg_http.upload(d[0])
    	upImg_http.request();
    });
});

//修改个人信息
var changeUserInfo_http = mm("do_Http");
changeUserInfo_http.method = "PUT";
changeUserInfo_http.timeout = "60000";
changeUserInfo_http.contentType = "application/json";
changeUserInfo_http.on("result", function(data){
    pbar.visible = false;
    if(data.status == 204){
    	 nf.toast("修改成功")
    }
}).on("success", function(data){
    pbar.visible = false;
    nf.toast("修改成功")
});

var save = ui("save");
save.on("touch",function(){
    var a = QQ.text.trim()
	var body = {
			"Name": nickname.text|| "", 
			"Email": email.text|| "", 
			"MobilePhone": telephone.text|| "", 
			"QQ":QQ.text|| "",
			"WeiBo":weibo.text|| "",
			"WeiXin":weixin.text|| "",
			"Icon":icon.source|| ""
	}
	pbar.visible = true;
	changeUserInfo_http.url = $U.url.getUrl+"myInformation?accessToken="
	changeUserInfo_http.body = body
	changeUserInfo_http.setRequestHeader("Authorization","Bearer "+global.getMemory("user_token"));
	changeUserInfo_http.request();
});


//退出登录
var logOff_http = mm("do_Http");
logOff_http.method = "DELETE";
logOff_http.timeout = "60000";
logOff_http.contentType = "application/json";
logOff_http.on("fail", function(data){
    pbar.visible = false;
}).on("success", function(data){
   pbar.visible = false;
   app.closePage();
});

var exit = ui("exit");
exit.on("touch",function(){
   nf.confirm({text:"确定退出登录？", title:"", button1text:"确定", button2text:"取消"}, function(data, e){
	   if(data == 2) return;
	        global.setMemory("user_token","");
	   		global.setMemory("is_login","false");
	   		pbar.visible = true;
			logOff_http.url = $U.url.getUrl+"token"
			deviceone.print(logOff_http.url)
			logOff_http.request();
	   });
});


//定义topbar返回按钮
var back = ui("back");
back.on("touch",function(){
	app.closePage();
});

page.on("back", function() { 
	app.closePage();
});

//ios手势关闭页面//
page.supportPanClosePage({support:"true"})

