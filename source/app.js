var d1 = require("deviceone");
var app = d1.sm("do_App");
var anim_button = d1.mm("do_Animation", "BUTTONTOUCHDOWN", "app");
var nf = d1.sm("do_Notification");
var $U = require("url");
var open = require("open");

anim_button.alpha({
	delay : 0,
	duration : 300,
	curve : "Linear",
	repeatCount : "",
	autoReverse : true,
	fillAfter : false,
	alphaFrom : 1,
	alphaTo : .5
});

anim_button.scale({
	delay : 0,
	duration : 300,
	curve : "Linear",
	repeatCount : "",
	autoReverse : true,
	fillAfter : false,
	scaleFromX : 1,
	scaleFromY : 1,
	scaleToX : .9,
	scaleToY : .9,
	pivotX : .5,
	pivotY : .5
});

var device = d1.sm("do_Device");
var storage = d1.sm("do_Storage");
var info_file = "data://security/info";
var info_body = {};
// 消息推送
var deviceOS = device.getInfo().OS;
var push = d1.sm("do_BaiduPush")
push.startWork();
push.setIconBadgeNumber(0);

var push = d1.sm("do_BaiduPush");

push.on("bind", function(data, e) {
	push.setIconBadgeNumber(0);
});

push.on("message", function(data, e) {
});

push.on("iOSMessage", function(data, e) {
	push.setIconBadgeNumber(1);
	if (data.message == "您有一条新的消息") {
	}
});

push.on("notificationClicked", function(data, e) {
	push.setIconBadgeNumber(0);
});

push.on("unbind", function(data, e) {
});

var initdata = d1.sm("do_InitData");
app.on("loaded", function() {
	initdata.copy([ "initdata://msg.wav" ], "data://", function() {
		open.start({
			source : "source://view/index.ui",
			animationType : "push_r2l_1"
		});
	})
});