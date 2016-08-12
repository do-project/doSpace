var nf = sm("do_Notification");
var app = sm("do_App")
var storage = sm("do_Storage");
var page = sm("do_Page");
var global = sm("do_Global");
var push=sm("do_BaiduPush");

var back = ui("back");
back.on("touch",function(){
	app.closePage();
});

page.on("back", function() { 
	app.closePage();
});

//ios手势关闭页面//
page.supportPanClosePage({support:"true"})


var about = ui("about");
about.on("touch",function(){
	app.openPage({source:"source://view/my/about.ui",animationType:"push_r2l_1"});
});

var yjfk = ui("yjfk");
yjfk.on("touch",function(){
		app.openPage({source:"source://view/my/suggest.ui",animationType:"push_r2l_1"});
});

var do_ALayout_13 = ui("do_ALayout_13")
var do_ALayout_14 = ui("do_ALayout_14")
var do_Button_1 = ui("do_Button_1")
var do_Button_2 = ui("do_Button_2")

do_ALayout_13.on("touch",function(){
	do_Button_1.bgColor = "de3031ff";
	do_Button_1.text = "是";
	do_Button_2.bgColor = "e5e5e5ff";
	do_Button_2.text = "";
	push.startWork();
})

do_ALayout_14.on("touch",function(){
	do_Button_2.bgColor = "de3031ff";
	do_Button_2.text = "否";
	do_Button_1.bgColor = "e5e5e5ff";
	do_Button_1.text = "";
	push.stopWork();
})
