var nf = sm("do_Notification");
var app = sm("do_App");
var page = sm("do_Page");
var global = sm("do_Global");
var UM = sm("do_UMengAnalytics");
var rootview = ui("$");
var $U = require("url");

var iv0 = ui("iv0");
var label0 = ui("label0");
var iv1 = ui("iv1");
var label1 = ui("label1");
var iv2 = ui("iv2");
var label2 = ui("label2");
var iv3 = ui("iv3");
var label3 = ui("label3");
var do_ImageView_1 = ui("do_ImageView_1");
var do_ImageView_2 = ui("do_ImageView_2");
var do_ImageView_3 = ui("do_ImageView_3");
var do_ImageView_4 = ui("do_ImageView_4");

//var upgrade = require("upgrade");
//upgrade.request();

var canBack = false;
page.on("back", function(){
    if (canBack) {
        global.exit();
    } else {
        nf.toast("再按一次退出");
        canBack = true;
        delay3.start();
    }
});

var delay3 = mm("do_Timer");
delay3.delay = 3000;
delay3.interval = 1000;
delay3.on("tick", function(){
    this.stop();
    canBack = false;
});

//友盟统计
page.on("resume",function(data, e){
	UM.beginPageLog({pageName:""});
});

var device = sm("do_Device");
var deviceName = device.getInfo().deviceName
var OSVersion = device.getInfo().OSVersion
var OS = device.getInfo().OS
var deviceID = device.getInfo().deviceId;

var body ={
		OsInfor : "",
		OsName  :deviceName ,
		OsTypeStr :"",
		Os :OS,
		OSVersion :OSVersion,
		DeviceId :deviceID
}


var device_http = mm("do_Http");
device_http.method = "post";
device_http.timeout = "60000";
device_http.contentType = "application/json";
device_http.on("fail", function(data){
}).on("success", function(data){
});

device_http.url = $U.url.getUrl+"oslist"
device_http.body = body
device_http.request();

//设置当前数值
//var push_http = deviceone.mm("do_Http");
//push_http.method = "post";
//push_http.timeout = "60000";
//push_http.contentType = "application/json";
//push_http.on("fail", function(data){
//}).on("success", function(data){
//    pbar.visible = false;
//});
//app.on("baidupush-listen", function(data){
//    if (data.errorCode) return;
//	push_http.body = {
//            DeviceId: device.deviceId,
//            Os: device.OS == "android" ? 1 : 2,
//            PushId: data.userId + "_" + data.channelId
//        };
//    pbar.visible = true;
//    push_http.url = $U.token($U.url.PushSeting);
//    deviceone.print(push_http.url)
//    push_http.request();
//});

var viewShower = ui("do_ViewShower_1");
var ivs = [ iv0, iv1, iv2, iv3 ];
var labels = [ label0, label1, label2, label3 ];

var data = [ 
            {
         	"id" : "view0",
         	"path" : "source://view/application/index.ui"
            }, 
            {
         	"id" : "view1",
         	"path" : "source://view/recommend/recommend.ui"
            }, 
            {
         	"id" : "view2",
         	"path" : "source://view/wlt/wlt.ui"
            },	
            {
         	"id" : "view3",
         	"path" : "source://view/my/index.ui"
            } 
         ];

var checkFun = function(index) {
	if(index==0)
	{
		viewShower.showView("view0");
		label0.fontColor="de3031FF";
		label1.fontColor="666666FF";
		label2.fontColor="666666FF";
		label3.fontColor="666666FF";
		do_ImageView_1.source="source://image/index/index_app_selected.png";
		do_ImageView_2.source="source://image/index/index_learn_normal.png";
		do_ImageView_3.source="source://image/index/index_component_normal.png";
		do_ImageView_4.source="source://image/index/index_me_normal.png";
	}
	else if(index==1)
	{
		viewShower.showView("view1");
		label0.fontColor="666666FF";
		label1.fontColor="de3031FF";
		label2.fontColor="666666FF";
		label3.fontColor="666666FF";
		do_ImageView_1.source="source://image/index/index_app_normal.png";
		do_ImageView_2.source="source://image/index/index_learn_selected.png";
		do_ImageView_3.source="source://image/index/index_component_normal.png";
		do_ImageView_4.source="source://image/index/index_me_normal.png";
	}
	else if(index==2)
	{
		viewShower.showView("view2");
		label0.fontColor="666666FF";
		label1.fontColor="666666FF";
		label2.fontColor="de3031FF";
		label3.fontColor="666666FF";
		do_ImageView_1.source="source://image/index/index_app_normal.png";
		do_ImageView_2.source="source://image/index/index_learn_normal.png";
		do_ImageView_3.source="source://image/index/index_component_selected.png";
		do_ImageView_4.source="source://image/index/index_me_normal.png";
		
	}
	else if(index==3)
	{
		viewShower.showView("view3");
		label0.fontColor="666666FF";
		label1.fontColor="666666FF";
		label2.fontColor="666666FF";
		label3.fontColor="de3031FF";
		do_ImageView_1.source="source://image/index/index_app_normal.png";
		do_ImageView_2.source="source://image/index/index_learn_normal.png";
		do_ImageView_3.source="source://image/index/index_component_normal.png";
		do_ImageView_4.source="source://image/index/index_me_selected.png";
	}
	viewShower.showView("view" + index, "slide_l2r", 300)
}

ivs.forEach(function(iv, i) {
	iv.on("touch", function(data, e) {
		checkFun(i);
	});
})

viewShower.addViews(data);

viewShower.showView("view0");

viewShower.on("viewChanged", function(data, e) {
	page.fire("indexChanged",{index:data});
});

page.on("openDoR",function(){
	checkFun(1);
})



