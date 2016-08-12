var app, page, nf;
nf = sm("do_Notification");
app = sm("do_App");
page = sm("do_Page");
var global = sm("do_Global");
var rootview = ui("$");
var pbar = ui(rootview.add("progressbar", "source://view/kit/pbar.ui", 0, 128));
var $U = require("url");

page.on("back", function() { // 监听android 的返回按钮;
    app.closePage();
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
var type =""
//combox_type.on("selectChanged",function(data, e){
//	type = combox_type.items.split(",")[data]
//	if(type == "推荐"){
//		type = ""
//	}
//})

var app_name = ui("app_name")
var name = ""
app_name.on("textChanged",function(data, e){
	name = app_name.text
});

var datas = []
var getmodule_http = mm("do_Http");
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
//	    	if(v.type == "UI"){
//	    		type = "[视图]"
//	    	}
//	    	if(v.type == "SM"){
//	    		type = "[单例]"
//	    	}
//	    	if(v.type == "MM"){
//	    		type = "[多例]"
//	    	}
	    	time = v.lastModificationTime
	    	var data = time.substring(0,10)
	    	var img = v.icon
	    	if(img == null){
	    		img = "source://image/default.png"
	    	}else {
	    		img = v.icon
	    	}
	        datas.push({"Id":v.id,"appicon": img, "apptype": type,"appname":v.name,"lastdate":data,"appdesc":v.description||""});
	    });
    } else{
    	nf.toast("暂无数据!");
    }
    listdata.removeAll();
    listdata.addData(datas);
    listview.bindItems(listdata);
    listview.refreshItems();
});

var find = ui ("find")
find.on("touch",function(){
	pbar.visible = true;
	pages = 1                    
	getmodule_http.url = $U.url.getModule+"?type="+type+"&ownerId=&key="+encodeURIComponent(name)+"&page=1"
	deviceone.print(JSON.stringify(getmodule_http.url))
	getmodule_http.request();
	page.hideKeyboard();
})

//下拉刷新
var getmodule_http1 = mm("do_Http");
getmodule_http1.method = "get";
getmodule_http1.timeout = "60000";
getmodule_http1.contentType = "application/json";
getmodule_http1.on("fail", function(data){
    pbar.visible = false;
    nf.alert(data.message);
}).on("success", function(data){
	  pbar.visible = false;
	  datas= [];
	  var type
	  var time 
	  if (data.items.length != 0) {
		    data.items.forEach(function(v,k){
//		    	if(v.type == "UI"){
//		    		type = "[视图]"
//		    	}
//		    	if(v.type == "SM"){
//		    		type = "[单例]"
//		    	}
//		    	if(v.type == "MM"){
//		    		type = "[多例]"
//		    	}
		    	time = v.lastModificationTime
		    	var data = time.substring(0,10)
		    	var img = v.icon
		    	if(img == null){
		    		img = "source://image/default.png"
		    	}else {
		    		img = v.icon
		    	}
		        datas.push({"Id":v.id,"appicon": img, "apptype": type,"appname":v.name,"lastdate":data,"appdesc":v.description||""});
		    });
	  } else{
	  	nf.toast("暂无数据!");
	  }
	  listdata.addData(datas);
	  listview.bindItems(listdata);
	  listview.refreshItems();
});

listview.on("pull",function(data, e){
//	if(datas.length == 0) {
//		nf.toast("暂无数据!")
//		this.rebound();
//	}else{
		if(data.state==2){
			pages = pages + 1 
			getmodule_http1.url = $U.url.getModule+"?type="+type+"&ownerId=&key"+encodeURIComponent(name)+"&page="+pages
			deviceone.print(JSON.stringify(getmodule_http1.url))
			getmodule_http1.request();
			this.rebound();
		}
//	}
});

listview.on("touch",function(data, e){
    var list_data = listdata.getOne({index:data});
	app.openPage({source:"source://view/component/detail/view0.ui",data:list_data,animationType:"push_r2l_1"});
});

