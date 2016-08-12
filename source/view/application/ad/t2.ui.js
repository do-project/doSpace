var app = sm("do_App")

var adthird = ui("adthird");
adthird.on("touch",function(){
	app.openPage("source://view/target.ui");
});