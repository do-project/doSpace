var app = sm("do_App");
var page = sm("do_Page");
var nf = sm("do_Notification");
var global = sm("do_Global");

page.on("back", function() { // 监听android 的返回按钮;
    app.closePage();
});

//ios手势关闭页面
page.supportPanClosePage({support:"true"})

var back = ui("back")
back.on("touch",function(){
	app.closePage();
});




