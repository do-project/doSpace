var app, page, nf;
nf = sm("do_Notification");
app = sm("do_App");
page = sm("do_Page");
var global = sm("do_Global");
var rootview = ui("$");

var version = ui("version")
ui("$").setMapping({
	"logo.source" : "icon",
	"os.text" : "os",
	"version.text" : "version",
	"time.text" : "createTime",
	"description.text" : "description",
	"tag" : "id"
});

var al_comversion = ui("al_comversion");
al_comversion.on("touch",function(data, e){
    var com_url = version.text
    var id = rootview.tag
	var url = {
		url : ""+id+"?version="+com_url,
	}
	app.openPage({source:"source://view/component/detail/web_view.ui",data:url,animationType:"push_r2l_1"});
});