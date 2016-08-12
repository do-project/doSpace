var app = sm("do_App");
var page = sm("do_Page");
var nf = sm("do_Notification");
var global = sm("do_Global");
var do_external = sm("do_External");
var rootview = ui("$");
var pbar = ui(rootview.add("progressbar", "source://view/kit/pbar.ui", 0, 128));
var $U = require("url");

page.on("back", function() { // 监听android 的返回按钮;
    app.closePage();
});

//ios手势关闭页面
page.supportPanClosePage({support:"true"})

var back = ui("back")
back.on("touch",function(){
	app.closePage();
});

var pageDate = page.getData();
var result = ui("result");
result.text = pageDate;
var external = ui("external")
external.on("touch",function(){
	do_external.openURL(pageDate);
});


