/**
 * related to partner.ui
 * 
 * @Author : felix
 * @Timestamp : 2016-06-01
 */

var nf = sm("do_Notification");
var app = sm("do_App");
var page = sm("do_Page");
var global = sm("do_Global");
var rootview = ui("$");
var pbar = ui(rootview.add("progressbar", "source://view/kit/pbar.ui", 0, 128));
var share = ui(rootview.add("share", "source://view/kit/share.ui", 0, 0));
var symenu = ui(rootview.add("progressbar1", "source://view/kit/symenu.ui", 0, 0));

var $U = require("url");

var servicelist = ui("partner")
var do_ListView_data = mm("do_ListData");
servicelist.bindItems(do_ListView_data);
do_ListView_data.addData([
				{ template : 0,Title : "广州市爱码电子有限公司", Content : "中国最大的高铁服务商",Type : "企业" , Pic :  "source://image/ayma.jpg" },
				{ template : 0,Title : "良心网文化传播有限公司", Content : "中国最大的国学网站",Type : "企业" , Pic :  "source://image/liangxin.png" },
				{ template : 0,Title : "山东易科德股份软件有限公司", Content : "山东最大的软件服务公司",Type : "企业" , Pic :  "source://image/ecode.png" },
				{ template : 0,Title : "锡林浩特市昭鑫网络科技有限公司", Content : "内蒙古首家订餐、在线预订平台",Type : "企业" , Pic :  "source://image/nadou.png" },
                { template : 0,Title : "北京嗨码科技有限公司", Content : "新的垂直女性社区",Type : "企业" , Pic :  "source://image/haima.jpg" },
                { template : 0,Title : "北京中兴汇智计算机系统技术有限公司", Content : "北京软件服务公司",Type : "企业" , Pic :  "source://image/default.png" },
                { template : 0,Title : "深圳市三丰鑫合投资管理有限公司", Content : "专业从事金融交易软件以及金融投资管理",Type : "企业" , Pic :  "source://image/default.png" },
                { template : 0,Title : "深圳尺子科技有限公司", Content : "全球首家开发者服务商店",Type : "企业" , Pic :  "source://image/chizi.png" },
                { template : 0,Title : "北京华祺汇通科技有限公司", Content : "主攻旅游",Type : "企业" , Pic :  "source://image/huaqi.png" }, 
          ]);

servicelist.refreshItems();

page.on("back", function() { // 监听android 的返回按钮;
    app.closePage();
});

var back = ui("back");
back.on("touch", function(data) {
	app.closePage();
});