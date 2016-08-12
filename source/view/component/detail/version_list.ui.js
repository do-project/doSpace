var app, page, nf;
nf = sm("do_Notification");
app = sm("do_App");
page = sm("do_Page");
var global = sm("do_Global");
var rootview = ui("$");
var pbar = ui(rootview.add("progressbar", "source://view/kit/pbar.ui", 0, 128));
var $U = require("url");

rootview.setMapping({
    "tag": "areaMap"    
});

var listview = ui("do_ListView");
var listdata = mm("do_ListData");
listview.bindItems(listdata);

var datas = [];
var gatmodulehistories_http = mm("do_Http");
var Id
rootview.on("dataRefreshed", function(){
	Id = rootview.tag
    //获取历史版本
    gatmodulehistories_http.method = "get";
    gatmodulehistories_http.timeout = "60000";
    gatmodulehistories_http.contentType = "application/json";
    gatmodulehistories_http.on("fail", function(data){
	    pbar.visible = false;
	    nf.alert(data.message);
	}).on("success", function(data){
	    pbar.visible = false;
	    datas= [];
		if (data.length != 0) {
		    data.forEach(function(v,k){
		    time = v.createTime
		    var data = time.substring(0,10)
	    	var img = v.icon
	    	if(img == null){
	    		img = "source://image/default.png"
	    	}else {
	    		img = v.icon
	    	}
		    datas.push({id:Id,icon:img,os:v.os,version:v.version,createTime:data,description:v.description});
		    });
	    } else{
	    	nf.toast("暂无数据!");
	    }
	    listdata.removeAll();
	    listdata.addData(datas);
	    listview.bindItems(listdata);
	    listview.refreshItems();
	});
	
	pbar.visible = true;
	gatmodulehistories_http.url = $U.url.getModule+"/"+Id+"/histories"
    deviceone.print(gatmodulehistories_http.url)
	gatmodulehistories_http.request();
	
});


