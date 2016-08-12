var nf = sm("do_Notification");
var app = sm("do_App");
var page = sm("do_Page");
var global = sm("do_Global");
var rootview = ui("$");
var pbar = ui(rootview.add("progressbar", "source://view/kit/pbar.ui", 0, 128));
var share = ui(rootview.add("share", "source://view/kit/share.ui", 0, 0));
var symenu = ui(rootview.add("progressbar1", "source://view/kit/symenu.ui", 0, 0));

var $U = require("url");
var anim_button = mm("do_Animation", "BUTTONTOUCHDOWN", "app");
var listcache = sm("do_DataCache");
var qq = sm("do_TencentQQ");
var wb = sm("do_SinaWeiBo");
var wx = sm("do_TencentWX");

var device = sm("do_Device");
var storage = sm("do_Storage");
var info_file = "data://security/info";
var info_body = {};
var flag_index = 0;

var slideview, slide_listdata;
slideview = ui("slv");
slide_listdata = mm("do_ListData");
slideview.bindItems(slide_listdata);
var _datas = [];
//轮播图片缓存
var chche_imgkey = "cache_img_list";
var datacacheimg = listcache.loadData({key: chche_imgkey});
if (datacacheimg) {
	slide_listdata.removeAll();
	slide_listdata.addData(datacacheimg);
	slideview.bindItems(slide_listdata);
	slideview.refreshItems();
}

//(轮播图片展示)
var getSyImg_http = mm("do_Http");
getSyImg_http.method = "get";
getSyImg_http.timeout = "60000";
getSyImg_http.contentType = "application/json";
getSyImg_http.on("fail", function(data){
    pbar.visible = false;
}).on("success", function(data){
    pbar.visible = false;
    data.result.forEach(function(v,k){
        _datas.push ({"path":v.Icon,"url":v.Url,"id":v.Id}) 
    })
    
    _datas.map(function(v,k){
    	v.dd_path = "source://image/yuan_"+k+".png"
    })
    slide_listdata.removeAll();
    slide_listdata.addData(_datas);
    slideview.bindItems(slide_listdata);
    slideview.refreshItems();
    listcache.saveData({key: chche_imgkey, value: _datas});
});


pbar.visible = true;
getSyImg_http.url = $U.url.getUrl+"banner"
deviceone.print(getSyImg_http.url)
getSyImg_http.request();

var mTimer = mm("do_Timer");
mTimer.delay = 0;
mTimer.interval = 3500;
var maxVal = 0;
mTimer.start();
mTimer.on("tick", function(data, e) {
	maxVal++;
	if (maxVal == 3 ) {
		slideview.index = flag_index + 1;
		slideview.refreshItems();
		maxVal = 0;
	}
	slideview.index = maxVal
});

/*******************************************************************************
 * Author :
 * 
 * @Author Timestamp :
 * @Timestamp
 ******************************************************************************/
//扫码
var do_scan = ui("do_scan")
do_scan.on("touch",function(k,v){
	app.openPage({source:"source://view/application/scan.ui",animationType:"push_r2l_1"});
})


//搜索
var search = ui("search")
search.on("touch",function(k,v){
	app.openPage({source:"source://view/application/search.ui",animationType:"push_r2l_1"});
})

//精品展示
var do_ALayout_13 = ui("do_ALayout_13")
do_ALayout_13.on("touch",function(k,v){
	page.fire("openDoR")
})

//合作伙伴
var do_ALayout_15 = ui("do_ALayout_15")
do_ALayout_15.on("touch",function(k,v){
	app.openPage({source:"source://view/application/partner/partner.ui",animationType:"push_r2l_1"});
})

//交流社区
var do_ALayout_37 = ui("do_ALayout_37")
do_ALayout_37.on("touch",function(k,v){
	app.openPage({source:"source://view/application/service/jiaoliu.ui",animationType:"push_r2l_1"});
})

//最新动态
var do_ALayout_14 = ui("do_ALayout_14")
do_ALayout_14.on("touch",function(k,v){
	app.openPage({source:"source://view/application/service/dongtai.ui",animationType:"push_r2l_1"});
})

//苹果证书
var do_ALayout_24 = ui("do_ALayout_24")
do_ALayout_24.on("touch",function(k,v){
	app.openPage({source:"source://view/application/business/appid.ui",animationType:"push_r2l_1"});
})

//企业培训
var do_ALayout_25 = ui("do_ALayout_25")
do_ALayout_25.on("touch",function(k,v){
	app.openPage({source:"source://view/application/business/training.ui",animationType:"push_r2l_1"});
})

//专线打包
var do_ALayout_26 = ui("do_ALayout_26")
do_ALayout_26.on("touch",function(k,v){
	app.openPage({source:"source://view/application/business/zhuanxian.ui",animationType:"push_r2l_1"});
})

//编译项目
var do_ALayout_27 = ui("do_ALayout_27")
do_ALayout_27.on("touch",function(k,v){
	app.openPage({source:"source://view/application/business/project.ui",animationType:"push_r2l_1"});
})


var servicelist = ui("servicelist")
var do_ListView_data = mm("do_ListData");
servicelist.bindItems(do_ListView_data);
do_ListView_data.addData([
                  { template : 0,Title : "山东易科德股份软件有限公司", Content : "服务范围：App开发、网站开发、定制开发",Type : "企业" , Pic :  "source://image/ecode.png" },
                  { template : 0,Title : "北京中兴汇智计算机系统技术有限公司", Content : "服务范围：App开发、软件开发、定制开发",Type : "企业" , Pic :  "source://image/default.png" }, 
          ]);

servicelist.refreshItems();

var fx = ui("fx")
fx.on("touch",function(k,v){
	symenu.visible = true
})

//page.on("share-listen", shareTo);
page.on("symenu-fx", function(data){
	share.visible = true;
	symenu.visible = true;
});
page.on("symenu-yj", function(data){
	symenu.visible = false;
	app.openPage({source:"source://view/my/suggest.ui",animationType:"push_r2l_1"});
});

page.on("symenu-listen", function(data){
	symenu.visible = false;
});

