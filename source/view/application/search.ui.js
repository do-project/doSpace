var app, page, nf;
nf = sm("do_Notification");
app = sm("do_App");
page = sm("do_Page");
var global = sm("do_Global");
var rootview = ui("$");
var pbar = ui(rootview.add("progressbar", "source://view/kit/pbar.ui", 0, 128));
var $U = require("url");
var shake = sm("do_AccelerometerSensor")

page.on("back", function() { // 监听android 的返回按钮;
    app.closePage();
});
var audio = sm("do_Audio");
var do_Button_1 = ui("do_Button_1")
var do_Button_2 = ui("do_Button_2")
var do_Button_3 = ui("do_Button_3")
var do_Button_4 = ui("do_Button_4")
var data1 = ["时间","刮目","列表"];
var data2 = ["动画","进度条","滚动"];
var data3 = ["文本","育医","点墨"];
var data4 = ["校信","App","视图"];
shake.on("shake", function(data) {
	audio.play("data://msg.wav");
	do_Button_1.text = data1[Math.floor(Math.random()*data1.length + 1)];
	do_Button_2.text = data2[Math.floor(Math.random()*data2.length + 1)];
	do_Button_3.text = data3[Math.floor(Math.random()*data3.length + 1)];
	do_Button_4.text = data4[Math.floor(Math.random()*data4.length + 1)];
});

do_Button_1.on("touch", function(data) {
	pages = 1
	getapp_http.url = $U.url.getUrl+"d1apps?IsRecommend="+type+"&ownerId=&appName="+encodeURIComponent(do_Button_1.text)+"&page=1"
	deviceone.print(JSON.stringify(getapp_http.url))
	getapp_http.request();
});
do_Button_2.on("touch", function(data) {
	pages = 1
	getapp_http.url = $U.url.getUrl+"d1apps?IsRecommend="+type+"&ownerId=&appName="+encodeURIComponent(do_Button_2.text)+"&page=1"
	deviceone.print(JSON.stringify(getapp_http.url))
	getapp_http.request();
});
do_Button_3.on("touch", function(data) {
	pages = 1
	getapp_http.url = $U.url.getUrl+"d1apps?IsRecommend="+type+"&ownerId=&appName="+encodeURIComponent(do_Button_3.text)+"&page=1"
	deviceone.print(JSON.stringify(getapp_http.url))
	getapp_http.request();
});
do_Button_4.on("touch", function(data) {
	pages = 1
	getapp_http.url = $U.url.getUrl+"d1apps?IsRecommend="+type+"&ownerId=&appName="+encodeURIComponent(do_Button_4.text)+"&page=1"
	deviceone.print(JSON.stringify(getapp_http.url))
	getapp_http.request();
});

//ios手势关闭页面
page.supportPanClosePage({support:"true"})

var back = ui("back");
back.on("touch", function(data) {
	app.closePage();
});

var pages = 1;

var listview = ui("do_ListView");
var listdata = mm("do_ListData");
listview.bindItems(listdata);

//var combox_type = ui("combox_type")
var type = ""
//combox_type.on("selectChanged",function(data, e){
//	type = data
//})

//var app_name = ui("app_name")
//var name =""
//app_name.on("textChanged",function(data, e){
//	name = app_name.text
//});

var datas = []
var getapp_http = mm("do_Http");
getapp_http.method = "get";
getapp_http.timeout = "60000";
getapp_http.contentType = "application/json";
getapp_http.on("fail", function(data){
    pbar.visible = false;
    nf.alert(data.message);
}).on("success", function(data){
    pbar.visible = false;
    datas= [];
    var type
    var time 
	if (data.result.length != 0) {
	    data.result.forEach(function(v,k){
	    	if(v.AppType == 0){
	    		type = "[示例]"
	    	}
	    	if(v.AppType == 1){
	    		type = "[开源]"
	    	}
	    	if(v.AppType == 2){
	    		type = "[案例]"
	    	}
	    	time = v.LastDate
	    	var img = v.AppIcon
	    	if(img == null){
	    		img = "source://image/default.png"
	    	}else {
	    		img = v.AppIcon
	    	}
	    	time = v.LastDate
	    	var app_time = time.substring(0,10)
	        datas.push({"Id":v.Id,"DownLoad_file":v.DownLoadUrl,"appicon": img, "apptype": type,"appname":v.AppName,"lastdate":app_time,"appdesc":v.AppDesc||""});
	    });
    } else{
    	nf.toast("暂无数据!");
    }
    listdata.removeAll();
    listdata.addData(datas);
    listview.bindItems(listdata);
    listview.refreshItems();
});

var content = ui ("content")
content.on("textChanged",function(data, e){
	pbar.visible = true;
	pages = 1
	getapp_http.url = $U.url.getUrl+"d1apps?IsRecommend="+type+"&ownerId=&appName="+encodeURIComponent(content.text)+"&page=1"
	deviceone.print(JSON.stringify(getapp_http.url))
	getapp_http.request();
	page.hideKeyboard();
})

//下拉刷新
var getapp_http1 = mm("do_Http");
getapp_http1.method = "get";
getapp_http1.timeout = "60000";
getapp_http1.contentType = "application/json";
getapp_http1.on("fail", function(data){
    pbar.visible = false;
    nf.alert(data.message);
}).on("success", function(data){
    pbar.visible = false;
    datas = []
    var type
    var time 
	if (data.result.length != 0) {
	    data.result.forEach(function(v,k){
	    	if(v.AppType == 0){
	    		type = "[示例]"
	    	}
	    	if(v.AppType == 1){
	    		type = "[开源]"
	    	}
	    	if(v.AppType == 2){
	    		type = "[案例]"
	    	}
	    	time = v.LastDate
	    	var app_time = time.substring(0,10)
	    	var img = v.AppIcon
	    	if(img == null){
	    		img = "source://image/default.png"
	    	}else {
	    		img = v.AppIcon
	    	}
	        datas.push({"Id":v.Id,"DownLoad_file":v.DownLoadUrl,"appicon": img, "apptype": type,"appname":v.AppName,"lastdate":app_time,"appdesc":v.AppDesc||""});
	    });
    } else{
    	nf.toast("暂无数据!");
    }
    listdata.addData(datas);
    listview.bindItems(listdata);
    listview.refreshItems();
});

//listview.on("pull",function(data, e){
//	if(datas.length == 0) {
//		nf.toast("数据为空请进行搜索")
//		this.rebound();
//	}else{
//		if(data.state==2){
//			pages = pages + 1 
//			getapp_http1.url = $U.url.getUrl+"d1apps?IsRecommend="+type+"&ownerId=&appName="+encodeURIComponent(name)+"&page="+pages
//			deviceone.print(JSON.stringify(getapp_http1.url))
//			getapp_http1.request();
//			this.rebound();
//		}
//	}
//});

listview.on("touch",function(data, e){
    var list_data = listdata.getOne({index:data});
	app.openPage({source:"source://view/application/detail/view0.ui",data:list_data,animationType:"push_r2l_1"});
});

var clearall = ui("delete")
clearall.on("touch",function(data, e){
	content.text = "";
});

