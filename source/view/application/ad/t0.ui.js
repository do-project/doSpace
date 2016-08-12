var app = sm("do_App")

var adfirst = ui("adfirst");
adfirst.on("touch",function(){
	app.openPage("source://view/target.ui");
});