var rootview = ui("$");
var app = sm("do_App");
var page = sm("do_Page");
var nf = sm("do_Notification");
var global = sm("do_Global");
var imgbrowser = sm("do_ImageBrowser");
var pbar = ui(rootview.add("progressbar", "source://view/kit/pbar.ui", 0, 0));
var $U = require("url");
var token = global.getMemory("user_token");
var open = require("open");

var isMore = false;
var listview = ui("do_listview_all");
var listdata = mm("do_ListData");
listview.bindItems(listdata);
var listcache = sm("do_DataCache");
var chchekey = "cache_work_all";
var do_result = ui("do_result");

var work_http = mm("do_Http");
work_http.method = "get";
work_http.timeout = "60000";
work_http.contentType = "application/json";
work_http.on("fail", function(data) {
	pbar.visible = false;
	deviceone.print("error")
}).on("success", function(data) {
	pbar.visible = false;
	data = $U.work_format(data);
	if (isMore) {
		if (!data.length)
			nf.toast("暂无更多");
	} else {
		do_result.visible = !data.length;
		listdata.removeAll();
	}
	listdata.addData(data);
	listview.refreshItems();
	listcache.saveData({
		key : chchekey,
		value : listdata.getRange(0)
	});
	listview.rebound();
});
work_http.url = $U.url.getUrl + "workCircle?page=1" + "&PageSize=20"
work_http.request();

listview.on("pull",function(data, e){
	if(data.state==2){
		work_http.url = $U.url.getUrl + "workCircle?page=1&PageSize=20"
		work_http.request();
	}
});

var datacache = listcache.loadData({key : chchekey});
if (datacache && datacache.length) {
	listdata.addData(datacache);
	listview.refreshItems();
} else {
	pbar.visible = true;
}

page.on("check-all-listen", function(data) {
	listdata.getRange(0).forEach(function(v, k) {
		if (v.id == data.id) {
			v.msgVis = !data.vis;
			v.msgAllVis = data.vis;
			v.lb_check = (v.msgVis ? "查看" : "收起") + "全文";
			listdata.updateOne(k, v);
			return listview.refreshItems();
		}
	});
});

page.on("result", function(data) {
	work_http.url = $U.url.getUrl + "workCircle?page=1&PageSize=20"
	work_http.request();
	if(global.getMemory("user_token") == ""){
		name.text = "登录"
	}else{
		name.text = global.getMemory("person_info")
	}
})

page.on("imgs-listen", function(data) {
	imgbrowser.show(data.s, data.i);
});

page.on("comment-listen", function(data) {
	if(global.getMemory("user_token") == ""){
		app.openPage({source:"source://view/my/login.ui",animationType:"push_r2l_1"});
	}else{
		open.start({
			source : "source://view/wlt/comment_pub.ui",
			data : data,
			keyboardMode : "visible"
		});
	}
});

var all_add = ui("all_add")
all_add.on("touch", function() {
	if(global.getMemory("user_token") == ""){
		app.openPage({source:"source://view/my/login.ui",animationType:"push_r2l_1"});
	}else{
		open.start({
			source : "source://view/wlt/add.ui",
			animationType : "push_r2l_1"
		});
	}
})

var name = ui("name")
var do_ALayout_4 =  ui("do_ALayout_4")
if(global.getMemory("user_token") == ""){
		name.text = "登录";
}else{
		name.text = global.getMemory("person_info")
}
do_ALayout_4.on("touch", function() {
	if(global.getMemory("user_token") == ""){
		app.openPage({source:"source://view/my/login.ui",animationType:"push_r2l_1"});
	}else{
		app.openPage({source:"source://view/my/me.ui",animationType:"push_r2l_1"});
	}
})
