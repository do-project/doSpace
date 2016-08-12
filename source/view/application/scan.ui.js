var app = sm("do_App");
var page = sm("do_Page");
var nf = sm("do_Notification");
var global = sm("do_Global");

ui("go_back").on("touch",function(){
	app.closePage();
});
page.on("back", function(){
	app.closePage();
});

var bcv_scan = ui("bcv_scan");

page.on("loaded",function(){
	bcv_scan.start(function(data,e){
		app.openPage({source:"source://view/application/ad/webview.ui",data:data.value,animationType:"push_r2l_1"});
	})
})

page.on("result",function(){
	bcv_scan.start(function(data,e){
		app.openPage({source:"source://view/application/ad/webview.ui",data:data.value,animationType:"push_r2l_1"});
	})
})

