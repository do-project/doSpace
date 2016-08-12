var app = sm("do_App");
var page = sm("do_Page");
var nf = sm("do_Notification");
var global = sm("do_Global");
var external = sm("do_External");
var rootview = ui("$");
var pbar = ui(rootview.add("progressbar", "source://view/kit/pbar.ui", 0, 128));
var $U = require("url");

page.on("back", function() { // 监听android 的返回按钮;
    app.closePage();
});

//ios手势关闭页面
page.supportPanClosePage({support:"true"})

var do_ALayout_34 = ui("do_ALayout_34")
do_ALayout_34.on("touch",function(){
	app.closePage();
});

var pageDate = page.getData();

var appname = pageDate.text
var url = pageDate.url

var label_title = ui("label_title")
label_title.text = appname
var do_WebView = ui("do_WebView")

do_WebView.url = url
//pbar.visible = true;

//do_WebView.on("loaded",function(){
//	pbar.visible = false;
//})