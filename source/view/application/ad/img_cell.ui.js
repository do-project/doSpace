var app, page, nf;
nf = sm("do_Notification");
app = sm("do_App");
page = sm("do_Page");
var global = sm("do_Global");
var rootview = ui("$");

var img = ui("img")
rootview.setMapping({
    "img.source": "path",
    "img_dd.source" : "dd_path",
    "img.tag" : "url",
    "tag" : "id"
});
//轮播图点击跳转详情页
var slide_id = ui("slide_id");
slide_id.on("touch",function(data, e){
    var imgurl = img.tag
	var newid = rootview.tag
	var url = {
		img_url : imgurl,
		newsID:newid
	}
	app.openPage({source:"source://view/application/ad/img_webview.ui",data:url,animationType:"push_r2l_1"});
});
