var app, page, nf;
nf = sm("do_Notification");
app = sm("do_App");
page = sm("do_Page");
var global = sm("do_Global");
var listcache = sm("do_DataCache");

var rootview = ui("$");
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
var getapp_http = mm("do_Http");
var getXlSectionNews_http = mm("do_Http");
var areaMap
var type
rootview.on("dataRefreshed", function(){
    areaMap = rootview.tag
    var chchekey = "cache_app_list"+areaMap;
	var datacache = listcache.loadData({key: chchekey});
	if (datacache) {
		listdata.removeAll();
	    listdata.addData(datacache);
	    listview.bindItems(listdata);
	    listview.refreshItems();
	}
    //获取应用列表
    getapp_http.method = "get";
    getapp_http.timeout = "60000";
    getapp_http.contentType = "application/json";
    getapp_http.on("fail", function(data){
	    pbar.visible = false;
	    nf.alert(data.message);
	}).on("success", function(data){
	    pbar.visible = false;
		datas= [];
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

	    listdata.removeAll();
	    listdata.addData(datas);
	    listview.bindItems(listdata);
	    listview.refreshItems();
		//数据缓存 缓存应用列表数据
		listcache.saveData({key: chchekey, value: datas});
	});
	pbar.visible = true;
	getapp_http.url = $U.url.getUrl+"d1apps?IsRecommend="+areaMap+"&ownerId=&appName=&page=1"
	deviceone.print(getapp_http.url)
	getapp_http.request();
	
});


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

listview.on("pull",function(data, e){
	if(data.state==2){
		pages = pages + 1 ;
		getapp_http1.url = $U.url.getUrl+"d1apps?IsRecommend="+areaMap+"&ownerId=&appName=&page="+pages
		deviceone.print(JSON.stringify(getapp_http1.url))
		getapp_http1.request();
		this.rebound();
	}
});

listview.on("touch",function(data, e){
    var list_data = listdata.getOne({index:data});
	app.openPage({source:"source://view/application/detail/view0.ui",data:list_data,animationType:"push_r2l_1"});
});




