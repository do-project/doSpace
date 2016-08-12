var nf = sm("do_Notification");
var do_ALayout_img = ui("do_ALayout_img")
var img = ui("img")
var rootview = ui("$");
var page = sm("do_Page");

ui("$").setMapping({
	"img.source" : "source",
	"tag" : "index"
});

do_ALayout_img.on("touch",function(){
	data_img = []
	var num = rootview.tag
	page.fire("browser_view", {index:num})
})

