var app = sm("do_App")

var adsecond = ui("adsecond");
adsecond.on("touch",function(){
	app.openPage("source://view/target.ui");
});