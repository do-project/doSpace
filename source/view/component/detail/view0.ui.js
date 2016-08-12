var app = sm("do_App");
var page = sm("do_Page");
var nf = sm("do_Notification");
var global = sm("do_Global");
var external = sm("do_External");
var rootview = ui("$");
var pbar = ui(rootview.add("progressbar", "source://view/kit/pbar.ui", 0, 128));
var $U = require("url");

page.on("back", function() { // 监听android 的返回按钮;
    app.closePage();
});

//ios手势关闭页面
page.supportPanClosePage({support:"true"})

var do_ALayout_collection = ui("do_ALayout_collection")

var back = ui("back")
back.on("touch",function(){
	app.closePage();
});

//获取segmentview，绑定listdata
var segmentview = ui("do_SegmentView");
var segment_listdata = mm("do_ListData");
segmentview.bindItems(segment_listdata);

//获取slideview，绑定listdata
var slideview = ui("do_SlideView");
var slide_listdata = mm("do_ListData");
slideview.bindItems(slide_listdata);

var addData= [];
addData.push({"title":"帮助文档",fontColor: "0080FFFF",fontStyle : "bold",fontSize : "32"},{"title":"历史版本",fontColor: "000000FF",fontStyle : "normal",fontSize : "27"})
var slideData = [];

segment_listdata.addData(addData)
segmentview.refreshItems();

var pageDate = page.getData();
var Id = pageDate.Id
var appname = pageDate.appname
var appdesc = pageDate.appdesc
var appicon = pageDate.appicon
var cDate = pageDate.lastdate

var moduleicon = ui("moduleicon")
var modulename = ui("modulename")
var ownername = ui("ownername")
var mainDocUrl
var helpDocUrl
//获取组件详情
var gatmoduledetail_http = mm("do_Http");
gatmoduledetail_http.method = "get";
gatmoduledetail_http.timeout = "60000";
gatmoduledetail_http.contentType = "application/json";
gatmoduledetail_http.on("fail", function(data){
    pbar.visible = false;
    nf.alert(data.message);
}).on("success", function(data){
    pbar.visible = false;
	var img = data.icon
	if(img == null){
		img = "source://image/default.png"
	}else {
		img = data.icon
	}
    moduleicon.source = img
    modulename.text = data.name + "("+(data.id)+")"||"" 
    ownername.text = data.creatorName ||"" 
    mainDocUrl = data.mainDocUrl
    helpDocUrl = data.helpDocUrl
    slideData.push({template:0,url:helpDocUrl},{template:1,areaMap:Id});
    slide_listdata.addData(slideData);
    slideview.refreshItems();
});

var is_login = global.getMemory("is_login");

//pbar.visible = true;
gatmoduledetail_http.url = $U.url.getModule+"/"+Id
deviceone.print(JSON.stringify(gatmoduledetail_http.url))
gatmoduledetail_http.request();

segmentview.on("indexChanged", function(index){
    slideview.set({index: index});
});

//slideview绑定数据，绑定事件，滑动触发
slideview.on("indexChanged", function(index){
    for (var i = 0 ; i <addData.length ; i++ ){
    	if(index == i){
    		addData[i].fontColor = "0080FFFF"
    		addData[i].fontStyle = "bold"
    		addData[i].fontSize = "32"
    	} else {
    		addData[i].fontColor = "000000FF"
    		addData[i].fontStyle = "normal"
    		addData[i].fontSize = "27"
    	}
    }
    segment_listdata.removeAll();
	segment_listdata.addData(addData);
    segmentview.refreshItems();
    segmentview.set({index: index});
});


var is_login = global.getMemory("is_login");
var userid = global.getMemory("user_id");
var do_ALayout_collection = ui("do_ALayout_collection")
var coll_image = ui("coll_image")
var imgchange = true
var token =  global.getMemory("user_token");

page.on("result",function(){
    token =  global.getMemory("user_token");
	is_login =  global.getMemory("is_login");
    userid = global.getMemory("user_id");
    isFavorites_http.url = $U.url.getUrl+"collectionApp?id="+Id+"&userid="+userid+"&type="+1
    isFavorites_http.setRequestHeader("Authorization","Bearer "+token);
    isFavorites_http.request();
})

//判断是否已经收藏
var isFavorites_http = mm("do_Http");
isFavorites_http.method = "get";
isFavorites_http.timeout = "60000";
isFavorites_http.contentType = "application/json";
isFavorites_http.on("fail", function(data){
    pbar.visible = false;
}).on("success", function(data){
	if(data.IsCollection  == 1){
		coll_image.source = "source://image/bb_@change.png";
		imgchange = false
    } else {
    	coll_image.source = "source://image/soucang.png";
    	imgchange = true
    } 
});
isFavorites_http.url = $U.url.getUrl+"collectionApp?id="+Id+"&userid="+userid+"&type="+1
isFavorites_http.setRequestHeader("Authorization","Bearer "+token);
deviceone.print(JSON.stringify(isFavorites_http.url))
isFavorites_http.request();

//添加一条的收藏
var addFavorites_http = mm("do_Http");
addFavorites_http.method = "post";
addFavorites_http.timeout = "60000";
addFavorites_http.contentType = "application/json";
addFavorites_http.on("fail", function(data){
    pbar.visible = false;
}).on("success", function(data){
    nf.toast("收藏成功");
});


//删除一条收藏
var removeFavorites_http = mm("do_Http");
removeFavorites_http.method = "DELETE";
removeFavorites_http.timeout = "60000";
removeFavorites_http.contentType = "application/json";
removeFavorites_http.on("fail", function(data){
    pbar.visible = false;
}).on("success", function(data){
    nf.toast("取消收藏");
});

do_ALayout_collection.on("touch",function(){
	if (is_login == "true"){
	    if (imgchange) {
	    	coll_image.source = "source://image/bb_@change.png";
	    	var body = {
	    			UserId : userid,
	    			UserName : appname,
	    			Type : 1,
	    			CollectId :Id,
	    			CIcon : appicon,
	    			CDescription : appdesc,
	    			Ctype : "",
	    			CName : appname,
	    			CCreateDate : cDate
	    	}
			addFavorites_http.url = $U.url.getUrl+"myCollection"
			addFavorites_http.setRequestHeader("Authorization","Bearer "+token);
			addFavorites_http.body = body
			addFavorites_http.request();
	    	imgchange = false
	    } else {
	    	coll_image.source = "source://image/soucang.png";
			removeFavorites_http.url = $U.url.getUrl+"myCollection?userid="+userid+"&CollectId="+Id
			removeFavorites_http.setRequestHeader("Authorization","Bearer "+token);
			removeFavorites_http.request();
	    	imgchange = true
	    }
	} else {
		app.openPage({source:"source://view/my/login.ui",animationType:"push_r2l_1"});
	}
})