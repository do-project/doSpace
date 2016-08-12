var nf = sm("do_Notification");
var app = sm("do_App")
var storage = sm("do_Storage");
var page = sm("do_Page");
var global = sm("do_Global");
var listcache = sm("do_DataCache");
var $U = require("url");
var rootview = ui("$");
var pbar = ui(rootview.add("progressbar", "source://view/kit/pbar.ui", 0, 128));

var back = ui("back");
back.on("touch",function(){
	app.closePage();
});

var page = sm("do_Page");
page.on("back", function() { // 监听android 的返回按钮;
    app.closePage();
});

//ios手势关闭页面
page.supportPanClosePage({support:"true"})

var title = ui("title")
var content = ui("content")
var detailData = page.getData();

title.text = detailData.Title;
content.text = detailData.Content;

