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

var token =  global.getMemory("user_token");
var userid = global.getMemory("user_id");
var listview = ui("do_ListView");
var listdata = mm("do_ListData");
listview.bindItems(listdata);
var pages = 1

var datas = [];
var getcollection_http = mm("do_Http");
var getXlSectionNews_http = mm("do_Http");
var areaMap
rootview.on("dataRefreshed", function(){
    areaMap = rootview.tag
    var token =  global.getMemory("user_token");
    var chchekey = "cache_my_list"+areaMap;
    var datacache = listcache.loadData({key: chchekey});
	if (datacache) {
		listdata.removeAll();
	    listdata.addData(datacache);
	    listview.bindItems(listdata);
	    listview.refreshItems();
	}
    //获取组件列表
    getcollection_http.method = "get";
    getcollection_http.timeout = "60000";
    getcollection_http.contentType = "application/json";
    getcollection_http.on("fail", function(data){
	    pbar.visible = false;
	    nf.toast(data.message);
	}).on("success", function(data){
	    pbar.visible = false;
	    datas= [];
	    var type
	    var time
		if (data.result != 0) {
		    data.result.forEach(function(v,k){
		    	if(v.Type == 0){
		    		type = "[应用]"
		    	}
		    	if(v.Type == 1){
		    		type = "[组件]"
		    	}
		    	if(v.Type == 2){
		    		type = "[教程]"
		    	}
		    	time = v.CCreateDate
		    	var collection_time = time.substring(0,10)
		    	var img = v.CIcon
		    	if(img == null){
		    		img = "source://image/default.png"
		    	}else {
		    		img = v.CIcon
		    	}
		        datas.push({"Id":v.CollectId,"appicon": img,"videourl":v.CType, "apptype": type,"appname":v.CName,"lastdate":collection_time,"appdesc":v.CDescription||"","MainDocUrl":v.CType});
		    });
	    } 
		else{
	    	nf.toast("暂无数据!");
	    }
	    listdata.removeAll();
	    listdata.addData(datas);
	    listview.bindItems(listdata);
	    listview.refreshItems();
		//数据缓存 缓存我的列表数据
		listcache.saveData({key: chchekey, value: datas});
	});
	pbar.visible = true;
	getcollection_http.url = $U.url.getUrl+"myCollection?userid="+userid+"&Type="+areaMap+"&page=1"
	getcollection_http.setRequestHeader("Authorization","Bearer "+token);
	deviceone.print(token)
	getcollection_http.request();
	deviceone.print(JSON.stringify(getcollection_http.url))
});

page.on("indexChanged",function(data, e){
	if(data.index == "view3"){
		pbar.visible = true;
		getcollection_http.url = $U.url.getUrl+"myCollection?userid="+userid+"&Type="+areaMap+"&page=1"
		getcollection_http.request();
	}
});
//
//
////下拉刷新
//var getcollection_http1 = mm("do_Http");
//getcollection_http1.method = "get";
//getcollection_http1.timeout = "60000";
//getcollection_http1.contentType = "application/json";
//getcollection_http1.on("fail", function(data){
//  pbar.visible = false;
//  nf.alert(data.message);
//}).on("success", function(data){
//    pbar.visible = false;
//	datas= [];
//	var type
//	var time
//if (data.result != 0) {
//    data.result.forEach(function(v,k){
//    	if(v.Type == 0){
//    		type = "[应用]"
//    	}
//    	if(v.Type == 1){
//    		type = "[组件]"
//    	}
//    	if(v.Type == 2){
//    		type = "[教程]"
//    	}
//    	time = v.CCreateDate
//    	var collection_time = time.substring(0,10)
//		var img = v.CIcon
//		if(img == null){
//			img = "source://image/default.png"
//		}else {
//			img = v.CIcon
//		}
//        datas.push({"Id":v.CollectId,"appicon": img, "apptype": type,"appname":v.CName,"lastdate":collection_time,"appdesc":v.CDescription||"","MainDocUrl":v.CType});
//    });
//} else{
//	nf.toast("暂无数据!");
//}
//	listdata.removeAll();
//	listdata.addData(datas);
//	listview.bindItems(listdata);
//	listview.refreshItems();
//});
//
//listview.on("pull",function(data, e){
//	if(data.state==2){
//		pages = pages + 1 ;
//		getcollection_http1.url = $U.url.getUrl+"myCollection?userid="+userid+"&Type="+areaMap+"&page="+pages
//		deviceone.print(JSON.stringify(getcollection_http1.url))
//		getcollection_http1.request();
//		this.rebound();
//	}
//});

page.on("result",function(){
	pbar.visible = true;
	var token =  global.getMemory("user_token");
	getcollection_http.url = $U.url.getUrl+"myCollection?userid="+userid+"&Type="+areaMap+"&page=1"
	getcollection_http.setRequestHeader("Authorization","Bearer "+token);
	deviceone.print(JSON.stringify(getcollection_http.url))
	getcollection_http.request();
})

//var delete_http = mm("do_Http");
////删除组件列表
//delete_http.method = "DELETE";
//delete_http.timeout = "60000";
//delete_http.contentType = "application/json";
//delete_http.on("fail", function(data){
//    pbar.visible = false;
//    nf.alert(data.message);
//}).on("success", function(data){
//    pbar.visible = false;
//    var all_data = listdata.getRange()
//    all_data.forEach(function(k,v){
//	    if(k.Id==data.Id){
//	    	all_data.splice(v, 1)
//	    }
//    })
//    listdata.removeAll();
//    listdata.addData(all_data);
//    listview.bindItems(listdata);
//    listview.refreshItems();
//});

	


listview.on("touch",function(data, e){
    var list_data = listdata.getOne({index:data});
    if(list_data.apptype == "[应用]"){
//		pbar.visible = true;
//		delete_http.url = $U.url.getUrl+"myCollection/"+list_data.Id
//		deviceone.print(JSON.stringify(delete_http.url))
//		delete_http.request();
    	app.openPage({source:"source://view/application/detail/view0.ui",data:list_data,animationType:"push_r2l_1"});
    }
    if(list_data.apptype == "[组件]"){
    	if(list_data.MainDocUrl == ""){
    		app.openPage({source:"source://view/component/detail/view0.ui",data:list_data,animationType:"push_r2l_1"});
    	}else {
    		app.openPage({source:"source://view/follow/detail/view0.ui",data:list_data,animationType:"push_r2l_1"});
    	}
    }
    if(list_data.apptype == "[教程]"){
    	app.openPage({source:"source://view/follow/detail/video_detail.ui",data:list_data,animationType:"push_r2l_1"});
    }
});


