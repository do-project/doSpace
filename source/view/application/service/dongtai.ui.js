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

page.on("back", function() { // 监听android 的返回按钮;
    app.closePage();
});

var back = ui("back");
back.on("touch", function(data) {
	app.closePage();
});
var servicelist = ui("do_ListView_1")
var do_ListView_data = mm("do_ListData");
servicelist.bindItems(do_ListView_data);
do_ListView_data.addData([
                  { template : 0,Title : "RSA组件发布", Brief : "RSA是一个收费组件，用于加密使用！",Time : "2016-06-01 10:58:11" },
                  { template : 0,Title : "IDE 3.2强势来袭", Brief : "更多UI优化等你来战！",Time :"2016-06-01 10:58:11" }, 
          ]);

servicelist.refreshItems();