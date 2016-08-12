var app, page, nf;
nf = sm("do_Notification");
app = sm("do_App");
page = sm("do_Page");
var global = sm("do_Global");
var rootview = ui("$");
var listcache = sm("do_DataCache");
var pbar = ui(rootview.add("progressbar", "source://view/kit/pbar.ui", 0, 128));
var $U = require("url");

rootview.setMapping({
    "tag": "areaMap"    
});

var listview = ui("do_ListView");
var listdata = mm("do_ListData");
listview.bindItems(listdata);
var pages = 1

var datas = [];
var getmodule_http = mm("do_Http");
var getcourse_http = mm("do_Http")
var getXlSectionNews_http = mm("do_Http");
var areaMap
rootview.on("dataRefreshed", function(){
    areaMap = rootview.tag
    var chchekey = "cache_com_list"+areaMap;
	var datacache = listcache.loadData({key: chchekey});
	if (datacache) {
		listdata.removeAll();
	    listdata.addData(datacache);
	    listview.bindItems(listdata);
	    listview.refreshItems();
	}
	//获取教程列表
	if(areaMap == 0 || areaMap == 1 ||areaMap == 2){
	    getcourse_http.method = "get";
	    getcourse_http.timeout = "60000";
	    getcourse_http.contentType = "application/json";
	    getcourse_http.on("fail", function(data){
		    pbar.visible = false;
		    nf.alert(data.message);
		}).on("success", function(data){
		    pbar.visible = false;
		    datas= [];
		    var type
		    var time 
			if (data.result.length != 0) {
			    data.result.forEach(function(v,k){
//			    	if(v.Type == 0){
//			    		type = "[入门]"
//			    	}
//			    	if(v.Type == 1){
//			    		type = "[晋级]"
//			    	}
//			    	if(v.Type == 2){
//			    		type = "[问答]"
//			    	}
			    	time = v.LastDate
			    	var course_time = time.substring(0,10)
			        datas.push({"Id":v.Id,"areaMap":areaMap,"appicon": "source://image/default.png","MainDocUrl":v.MainDocUrl,"apptype": type,"appname":v.Name,"lastdate":course_time,"appdesc":v.Desc||""});
			    });
		    } else{
		    	nf.toast("暂无数据!");
		    }
		    listdata.removeAll();
		    listdata.addData(datas);
		    listview.bindItems(listdata);
		    listview.refreshItems();
			//数据缓存 缓存教程列表数据
			listcache.saveData({key: chchekey, value: datas});
		});
		pbar.visible = true;
		getcourse_http.url = $U.url.getUrl+"d1course?type="+areaMap+"&ownerId=&name=&page=1"
		deviceone.print(getcourse_http.url)
		getcourse_http.request();
	}else {
	    //获取组件列表
	    getmodule_http.method = "get";
	    getmodule_http.timeout = "60000";
	    getmodule_http.contentType = "application/json";
	    getmodule_http.on("fail", function(data){
		    pbar.visible = false;
		    nf.alert(data.message);
		}).on("success", function(data){
		    pbar.visible = false;
		    datas= [];
		    var type
		    var time 
			if (data.items.length != 0) {
			    data.items.forEach(function(v,k){
//			    	if(v.type == "UI"){
//			    		type = "[视图]"
//			    	}
//			    	if(v.type == "SM"){
//			    		type = "[单例]"
//			    	}
//			    	if(v.type == "MM"){
//			    		type = "[多例]"
//			    	}
			    	time = v.lastModificationTime
			    	var data = time.substring(0,10)
			    	var img = v.icon
			    	if(img == null){
			    		img = "source://image/default.png"
			    	}else {
			    		img = v.icon
			    	}
			        datas.push({"Id":v.id,"areaMap":areaMap,MainDocUrl:v.MainDocUrl,"appicon": img, "apptype": type,"appname":v.name,"lastdate":data,"appdesc":v.description||""});
			    });
		    } else{
		    	nf.toast("暂无数据!");
		    }
		    listdata.removeAll();
		    listdata.addData(datas);
		    listview.bindItems(listdata);
		    listview.refreshItems();
			//数据缓存 缓存组件列表数据
			listcache.saveData({key: chchekey, value: datas});
		});
		pbar.visible = true;
		getmodule_http.url = $U.url.getModule+"?type="+areaMap+"&ownerId=&name=&page=1"
		deviceone.print(getmodule_http.url)
		getmodule_http.request();
	}
});


//下拉刷新
//var getmodule_http1 = mm("do_Http");
//getmodule_http1.method = "get";
//getmodule_http1.timeout = "60000";
//getmodule_http1.contentType = "application/json";
//getmodule_http1.on("fail", function(data){
//  pbar.visible = false;
//  nf.alert(data.message);
//}).on("success", function(data){
//  pbar.visible = false;
//  datas= [];
//  var type
//  var time 
//  if (data.items.length != 0) {
//	    data.items.forEach(function(v,k){
////	    	if(v.type == "UI"){
////	    		type = "[视图]"
////	    	}
////	    	if(v.type == "SM"){
////	    		type = "[单例]"
////	    	}
////	    	if(v.type == "MM"){
////	    		type = "[多例]"
////	    	}
//	    	time = v.lastModificationTime
//	    	var data = time.substring(0,10)
//	    	var img = v.icon
//	    	if(img == null){
//	    		img = "source://image/default.png"
//	    	}else {
//	    		img = v.icon
//	    	}
//	        datas.push({"Id":v.id,"appicon": img, "apptype": type,"appname":v.name,"lastdate":data,"appdesc":v.description||""});
//	    });
//  } else{
//  	nf.toast("暂无数据!");
//  }
//  listdata.addData(datas);
//  listview.bindItems(listdata);
//  listview.refreshItems();
//});
//
//listview.on("pull",function(data, e){
//	if(data.state==2){
//		pages = pages + 1 ;
//		getmodule_http1.url = $U.url.getModule+"?type="+areaMap+"&ownerId=&name=&page="+pages
//		deviceone.print(JSON.stringify(getmodule_http1.url))
//		getmodule_http1.request();
//		this.rebound();
//	}
//});

listview.on("touch",function(data, e){
    var list_data = listdata.getOne({index:data});
    if (list_data.areaMap == 0 || list_data.areaMap == 1 || list_data.areaMap == 2){
    	app.openPage({source:"source://view/follow/detail/view0.ui",data:list_data,animationType:"push_r2l_1"});
    }else {
    	app.openPage({source:"source://view/component/detail/view0.ui",data:list_data,animationType:"push_r2l_1"});
    }

});




