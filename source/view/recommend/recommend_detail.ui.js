var app = sm("do_App");
var page = sm("do_Page");
var nf = sm("do_Notification");
var global = sm("do_Global");
var external = sm("do_External");
var imageBrowser = sm("do_ImageBrowser");
var rootview = ui("$");
var listcache = sm("do_DataCache");
var Device = sm("do_Device");
var chchekey = "cache_img_list"
var anim_button = mm("do_Animation", "BUTTONTOUCHDOWN", "app");
	
var pbar = ui(rootview.add("progressbar", "source://view/kit/pbar.ui", 0, 128));
var pbar1 = ui(rootview.add("progressbar1", "source://view/kit/pbar1.ui", 106, 128));
var $U = require("url");
var storage = sm("do_Storage");

page.on("back", function() { 
	app.closePage();
});

//ios手势关闭页面
page.supportPanClosePage({support:"true"})

var go_back = ui("go_back");
go_back.on("touch", function(data) {
	app.closePage();
});

var appicon = ui("appicon");
var appname = ui("appname");
var ownername = ui("ownername")
var desc = ui("desc")

//读取头像缓存
var datacache = listcache.loadData({key: "nadou"});
if (datacache) {
	appicon.source = datacache[0]
	appname.text = datacache[1]
	ownername.text = datacache[3]
	desc.text = datacache[2]
}

//var pageDate = page.getData();
//var download_url = pageDate.DownLoad_file
//var Id = pageDate.Id
//var aname = pageDate.appname
//var aicon = pageDate.appicon
//var adesc = pageDate.appdesc
//var adate = pageDate.lastdate
//
//var device_info = Device.getInfo().OS
//var chchekey_valuekey = "cache_value"+pageDate.Id
//var lb_yunxing = ui("lb_yunxing")
//var lb_version = ui("lb_version")
//var lb_dx = ui("lb_dx")
//var do_ALayout_collection = ui("do_ALayout_collection")
//var do_ALayout_dis = ui("do_ALayout_dis")
//var al_sj = ui("al_sj")
//var do_Button_sj = ui("do_Button_sj")
//
var do_SegmentView = ui ("do_SegmentView")
var seg_listdata = mm("do_ListData")
seg_listdata.removeAll();
seg_listdata.addData(datacache[4]);
do_SegmentView.bindItems(seg_listdata);
do_SegmentView.refreshItems();
//
//
//var seg_Data= [];
//
//var startKey
//var code_url
//var dis_url 
//var Installtype 
//var ins_url =""
//var verson =""
//var cacache_verson =""
//var URL = ""
////图片缓存
//var datacache = listcache.loadData({key: chchekey});
//if (datacache) {
//	seg_listdata.removeAll();
//	seg_listdata.addData(datacache);
//	do_SegmentView.bindItems(seg_listdata);
//	do_SegmentView.refreshItems();
//}
////其它数据缓存
//var datacache_valuekey = listcache.loadData({key: chchekey_valuekey});
//if (datacache_valuekey) {
//    appicon.source = datacache_valuekey.img
//    appname.text = datacache_valuekey.appname 
//    ownername.text = datacache_valuekey.ownername 
//    desc.text = datacache_valuekey.desc
//	lb_version.text = datacache_valuekey.lb_version
//	cacache_verson = datacache_valuekey.lb_version
//	lb_dx.text = datacache_valuekey.lb_dx
//}
//
////获取应用列表
//var gatappdetail_http = mm("do_Http");
//gatappdetail_http.method = "get";
//gatappdetail_http.timeout = "60000";
//gatappdetail_http.contentType = "application/json";
//gatappdetail_http.on("fail", function(data){
//    pbar.visible = false;
//    nf.alert(data.message);
//}).on("success", function(data){
//    pbar.visible = false;
//	var img = data.AppIcon
//	if(img == null){
//		img = "source://image/default.png"
//	}else {
//		img = data.AppIcon
//	}
//    appicon.source = img
//    appname.text = data.AppName ||""
//    ownername.text = data.OwnerName ||"" 
//    desc.text = data.AppDesc ||""
//    startKey = data.StartKey
//    code_url = data.CodeUrl
//    dis_url = data.DiscussUrl
//    InstallType = data.InstallType
//    URL = data.URL
//    data.Imgs.map(function(d,k){
//    	seg_Data.push({"source":d.ImgUrl,"index":k})
//    })
//    data.OsList.map(function(d){
//    	lb_version.text = d.Version ||""
//    	verson = lb_version.text
//    	var al_dx = ui("al_dx")
//    	if(InstallType == 0){
//    		al_dx.visible = true
//		    var number = d.PackageSize
//    		var numsize = number.toFixed(1)
//    		lb_dx.text = numsize+ "KB"||"" 
//    	} else {
//    		al_dx.visible = false
//    	}
//    		
//    	var Os = d.Os
//    	if(device_info == "android"){
//        	if(d.Os == "android"){
//        		ins_url = d.AndroidURL
//        	}
//    	}
//
//    	if(device_info == "iPhone OS"){
//        	if(d.Os == "ios"){
//        		ins_url = d.IosURL
//        	}
//    	}
//    })
//    seg_listdata.removeAll();
//    seg_listdata.addData(seg_Data)
//    do_SegmentView.refreshItems();
//    
//	//数据缓存 缓存图片
//	listcache.saveData({key: chchekey, value: seg_Data});
//	listcache.saveData({key: chchekey_valuekey, value: {img:img,appname:data.AppName,ownername:data.OwnerName,desc:data.AppDesc,lb_version:lb_version.text,lb_dx:lb_dx.text}});
//    do_ALayout_dis.on("touch",function(){
//    	app.openPage({source:"source://view/application/detail/web_view.ui",data:{"url":dis_url,"text":"讨论"},animationType:"push_r2l_1"});
//    })
//    
//});
//
//page.on("browser_view",function(data){
//	imageBrowser.show(seg_Data,data.index);
//})
//
//pbar.visible = true;
//gatappdetail_http.url = $U.url.getUrl+"d1apps/"+Id
//gatappdetail_http.request();
//deviceone.print(gatappdetail_http.url)
//
//var is_login = global.getMemory("is_login");
//var userid = global.getMemory("user_id");
//var do_ALayout_collection = ui("do_ALayout_collection")
//var coll_image = ui("coll_image")
//var imgchange = true
//var token =  global.getMemory("user_token");
//
//isFavorites_http.url = $U.url.getUrl+"collectionApp?id="+Id+"&userid="+userid+"&type="+0
//isFavorites_http.setRequestHeader("Authorization","Bearer "+token);
//deviceone.print(JSON.stringify(isFavorites_http.url))
//isFavorites_http.request();
//
//page.on("result",function(){
//	token =  global.getMemory("user_token");
//	is_login =  global.getMemory("is_login");
//    userid = global.getMemory("user_id");
//    isFavorites_http.url = $U.url.getUrl+"collectionApp?id="+Id+"&userid="+userid+"&type="+0
//    isFavorites_http.setRequestHeader("Authorization","Bearer "+token);
//    deviceone.print(JSON.stringify(isFavorites_http.url))
//    isFavorites_http.request();
//})
//
//
//do_ALayout_collection.on("touch",function(){
//	if (is_login == "true"){
//	    if (imgchange) {
//	    	coll_image.source = "source://image/bb_@change.png";
//	    	var body = {
//	    			UserId : userid,
//	    			UserName : aname,
//	    			Type : 0,
//	    			CollectId :Id,
//	    			CIcon : aicon,
//	    			CDescription : adesc,
//	    			Ctype : "",
//	    			CName : aname,
//	    			CCreateDate : adate
//	    	}
//			addFavorites_http.url = $U.url.getUrl+"myCollection"
//			addFavorites_http.setRequestHeader("Authorization","Bearer "+token);
//			addFavorites_http.body = body
//			addFavorites_http.request();
//	    	deviceone.print(JSON.stringify(addFavorites_http.url))
//	    	deviceone.print(JSON.stringify(addFavorites_http.body))
//	    	imgchange = false
//	    } else {
//	    	coll_image.source = "source://image/soucang.png";
//			removeFavorites_http.url = $U.url.getUrl+"myCollection?userid="+userid+"&CollectId="+Id
//			removeFavorites_http.setRequestHeader("Authorization","Bearer "+token);
//			removeFavorites_http.request();
//			deviceone.print(JSON.stringify(removeFavorites_http.url))
//	    	imgchange = true
//	    }
//	} else {
//		app.openPage({source:"source://view/my/login.ui",animationType:"push_r2l_1"});
//	}
//})
