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
var external = sm("do_External");
var telephone = ui("telephone");
telephone.on("touch", function(data) {
	external.openDial("15101610079");
});
