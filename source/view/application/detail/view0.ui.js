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

var pageDate = page.getData();
var download_url = pageDate.DownLoad_file
var Id = pageDate.Id
var aname = pageDate.appname
var aicon = pageDate.appicon
var adesc = pageDate.appdesc
var adate = pageDate.lastdate

var device_info = Device.getInfo().OS
var chchekey_valuekey = "cache_value"+pageDate.Id
var appicon = ui("appicon");
var appname = ui("appname");
var ownername = ui("ownername")
var desc = ui("desc")
var lb_yunxing = ui("lb_yunxing")
var lb_version = ui("lb_version")
var lb_dx = ui("lb_dx")
var do_ALayout_collection = ui("do_ALayout_collection")
var do_ALayout_dis = ui("do_ALayout_dis")
var al_sj = ui("al_sj")
var do_Button_sj = ui("do_Button_sj")

var do_SegmentView = ui ("do_SegmentView")
var seg_listdata = mm("do_ListData")
do_SegmentView.bindItems(seg_listdata)


var seg_Data= [];

var startKey
var code_url
var dis_url 
var Installtype 
var ins_url =""
var verson =""
var cacache_verson =""
var URL = ""
//图片缓存
var datacache = listcache.loadData({key: chchekey});
if (datacache) {
	seg_listdata.removeAll();
	seg_listdata.addData(datacache);
	do_SegmentView.bindItems(seg_listdata);
	do_SegmentView.refreshItems();
}
//其它数据缓存
var datacache_valuekey = listcache.loadData({key: chchekey_valuekey});
if (datacache_valuekey) {
    appicon.source = datacache_valuekey.img
    appname.text = datacache_valuekey.appname 
    ownername.text = datacache_valuekey.ownername 
    desc.text = datacache_valuekey.desc
	lb_version.text = datacache_valuekey.lb_version
	cacache_verson = datacache_valuekey.lb_version
	lb_dx.text = datacache_valuekey.lb_dx
}

//获取应用列表
var gatappdetail_http = mm("do_Http");
gatappdetail_http.method = "get";
gatappdetail_http.timeout = "60000";
gatappdetail_http.contentType = "application/json";
gatappdetail_http.on("fail", function(data){
    pbar.visible = false;
    nf.alert(data.message);
}).on("success", function(data){
    pbar.visible = false;
	var img = data.AppIcon
	if(img == null){
		img = "source://image/default.png"
	}else {
		img = data.AppIcon
	}
    appicon.source = img
    appname.text = data.AppName ||""
    ownername.text = data.OwnerName ||"" 
    desc.text = data.AppDesc ||""
    startKey = data.StartKey
    code_url = data.CodeUrl
    dis_url = data.DiscussUrl
    InstallType = data.InstallType
    URL = data.URL
    data.Imgs.map(function(d,k){
    	seg_Data.push({"source":d.ImgUrl,"index":k})
    })
    data.OsList.map(function(d){
    	lb_version.text = d.Version ||""
    	verson = lb_version.text
//    	if(d.PackageSize >= 1){
//    		lb_dx.text = d.PackageSize + "M"||"" 
//    	}else {
//    		var number = (d.PackageSize)*1024
    	var al_dx = ui("al_dx")
    	if(InstallType == 0){
    		al_dx.visible = true
		    var number = d.PackageSize
    		var numsize = number.toFixed(1)
    		lb_dx.text = numsize+ "KB"||"" 
    	} else {
    		al_dx.visible = false
    	}

//    	}
    	
    		
    	var Os = d.Os
    	if(device_info == "android"){
        	if(d.Os == "android"){
        		ins_url = d.AndroidURL
        	}
    	}

    	if(device_info == "iPhone OS"){
        	if(d.Os == "ios"){
        		ins_url = d.IosURL
        	}
    	}
    })
    seg_listdata.removeAll();
    seg_listdata.addData(seg_Data)
    do_SegmentView.refreshItems();
    
    //升级
    if(cacache_verson != verson&&cacache_verson !="" && InstallType == 0){
    	do_Button_sj.visible = true
     }else {
    	do_Button_sj.visible = false
    }
    //升级
    al_sj.on("touch",function(k,v){
    	if(cacache_verson != verson&&cacache_verson !=""&& InstallType == 0){
    		do_Button_sj.visible = false
    	    nf.confirm("应用检测到最新版本是否升级?", function(state){
    	        if (state == 1) {
    	        	Install(InstallType)
    	        	listcache.saveData({key: chchekey_valuekey, value: {img:img,appname:data.AppName,ownername:data.OwnerName,desc:data.AppDesc,lb_version:lb_version.text,lb_dx:lb_dx.text}});
    	        	do_Button_sj.visible = false
    	        } else {
    	        	do_Button_sj.visible = true
    	        	listcache.saveData({key: chchekey_valuekey, value: {img:img,appname:data.AppName,ownername:data.OwnerName,desc:data.AppDesc,lb_dx:lb_dx.text}});
    	        }
    	    });
    	}else {
    		nf.toast("应用为最新版本无需升级")
    	}
    })
    
	//数据缓存 缓存图片
	listcache.saveData({key: chchekey, value: seg_Data});
	listcache.saveData({key: chchekey_valuekey, value: {img:img,appname:data.AppName,ownername:data.OwnerName,desc:data.AppDesc,lb_version:lb_version.text,lb_dx:lb_dx.text}});
    do_ALayout_dis.on("touch",function(){
    	app.openPage({source:"source://view/application/detail/web_view.ui",data:{"url":dis_url,"text":"讨论"},animationType:"push_r2l_1"});
    })
    
    if(InstallType == 0){
	    if(!storage.fileExist("data://"+startKey+".zip")){
	    	lb_yunxing.text = "下载"
	    }else {
	    	lb_yunxing.text = "运行"
	    }
    }
    if(InstallType == 1){
//	    if(!storage.fileExist("data://"+startKey+".txt")){
//	    	lb_yunxing.text = "下载"
//	    }else {
	    	lb_yunxing.text = "外部打开"
//	    }
    }
    //启动应用
    var start_app = ui("start_app")
    start_app.on("touch",function(){
    	Install(InstallType)
    }).on("touchDown", function(){
        this.animate(anim_button);
    });
});

page.on("browser_view",function(data){
	imageBrowser.show(seg_Data,data.index);
})

pbar.visible = true;
gatappdetail_http.url = $U.url.getUrl+"d1apps/"+Id
gatappdetail_http.request();
deviceone.print(gatappdetail_http.url)

function Install(inType){
	if(inType == 0){
    	if(!storage.fileExist("data://"+startKey+".zip")){
    		var file_downloadhttp = mm("do_Http");
    		file_downloadhttp.method = "post";
    		file_downloadhttp.timeout = "60000";
    		file_downloadhttp.contentType = "application/json";
    		file_downloadhttp.on("fail", function(data){
    		    pbar.visible = false;
    		    nf.alert(data.message);
    		}).on("success", function(data){
    		    pbar.visible = false;
    		}).on("progress", function(data){
    			//进度条页面传值
    			var jindu = Math.round(data.currentSize / data.totalSize * 10000) / 100.00;
    			page.fire("pro_size",{size:jindu,bfh:jindu})
    	        if (data.currentSize == data.totalSize) {
    	           pbar1.visible = false
    	           lb_yunxing.text = "运行"
    	          //解压文件
    	          storage.unzip("data://"+startKey+".zip", "data://", function(data, e) {
    	          })
    	          nf.toast("下载成功")
    	        }
    	    });
  			pbar1.visible = true
    		file_downloadhttp.url = download_url
    		file_downloadhttp.download("data://"+startKey+".zip");
    	} else {
			//把data目录下的do_Button目录下的data和source分别拷贝到对应的门户app的data和source根目录
            storage.copy(["data://"+startKey+"/data"], "data://", function(data, e) {
 
            })
	        app.update([ "data://"+startKey+"/source"],"source://",function(data){
	        	if(data){
	                	app.openPage({
	            		source : "source://"+startKey+"/view/index.ui",
	            		statusBarState : "transparent"
	            	});
	        	}
	        });
    	}
	} 
	else {
		if(ins_url == ""){
			nf.alert("不支持此平台")
		}else{
			external.openURL(ins_url)
		}
	}
}

var is_login = global.getMemory("is_login");
var userid = global.getMemory("user_id");
var do_ALayout_collection = ui("do_ALayout_collection")
var coll_image = ui("coll_image")
var imgchange = true
var token =  global.getMemory("user_token");

//判断是否已经收藏
var isFavorites_http = mm("do_Http");
isFavorites_http.method = "get";
isFavorites_http.timeout = "60000";
isFavorites_http.contentType = "application/json";
isFavorites_http.on("fail", function(data){
    pbar.visible = false;
}).on("success", function(data){
	deviceone.print(JSON.stringify(data))
	if(data.IsCollection  == 1){
		coll_image.source = "source://image/bb_@change.png";
		imgchange = false
    } else {
    	coll_image.source = "source://image/soucang.png";
    	imgchange = true
    } 
});

isFavorites_http.url = $U.url.getUrl+"collectionApp?id="+Id+"&userid="+userid+"&type="+0
isFavorites_http.setRequestHeader("Authorization","Bearer "+token);
deviceone.print(JSON.stringify(isFavorites_http.url))
isFavorites_http.request();

page.on("result",function(){
	token =  global.getMemory("user_token");
	is_login =  global.getMemory("is_login");
    userid = global.getMemory("user_id");
    isFavorites_http.url = $U.url.getUrl+"collectionApp?id="+Id+"&userid="+userid+"&type="+0
    isFavorites_http.setRequestHeader("Authorization","Bearer "+token);
    deviceone.print(JSON.stringify(isFavorites_http.url))
    isFavorites_http.request();
})

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
	    			UserName : aname,
	    			Type : 0,
	    			CollectId :Id,
	    			CIcon : aicon,
	    			CDescription : adesc,
	    			Ctype : "",
	    			CName : aname,
	    			CCreateDate : adate
	    	}
			addFavorites_http.url = $U.url.getUrl+"myCollection"
			addFavorites_http.setRequestHeader("Authorization","Bearer "+token);
			addFavorites_http.body = body
			addFavorites_http.request();
	    	deviceone.print(JSON.stringify(addFavorites_http.url))
	    	deviceone.print(JSON.stringify(addFavorites_http.body))
	    	imgchange = false
	    } else {
	    	coll_image.source = "source://image/soucang.png";
			removeFavorites_http.url = $U.url.getUrl+"myCollection?userid="+userid+"&CollectId="+Id
			removeFavorites_http.setRequestHeader("Authorization","Bearer "+token);
			removeFavorites_http.request();
			deviceone.print(JSON.stringify(removeFavorites_http.url))
	    	imgchange = true
	    }
	} else {
		app.openPage({source:"source://view/my/login.ui",animationType:"push_r2l_1"});
	}
})
