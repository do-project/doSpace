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
//ios手势关闭页面
page.supportPanClosePage({support:"true"})

page.on("back", function() { // 监听android 的返回按钮;
    app.closePage();
});

var do_ListView = ui("do_ListView");
var listdata = mm("do_ListData");
do_ListView.bindItems(listdata);

var datas = []
//获取信息
var getmsg_http = mm("do_Http");
getmsg_http.method = "get";
getmsg_http.timeout = "60000";
getmsg_http.contentType = "application/json";
getmsg_http.url = $U.url.getUrl+"notification";
getmsg_http.on("result", function(data){
    pbar.visible = false;
}).on("success", function(data){
	if (data.result.length != 0) {
	    data.result.forEach(function(v,k){
	    	time = v.CreateDate
	    	var course_time = time.substring(0,10)
	        datas.push({"Title":v.Name,"Img":v.Icon,"Content":v.Url});
	    });
	}
	listdata.removeAll()
	listdata.addData(datas)
	do_ListView.bindItems(listdata);
	do_ListView.refreshItems();
	listcache.saveData({key: chchekey, value: datas});
});
getmsg_http.request();

do_ListView.on("touch",function(data){
	var list_data = listdata.getOne({index:data});
	app.openPage({source:"source://view/my/xxts_detail.ui",animationType:"push_r2l_1",data:list_data});
})
