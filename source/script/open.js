var deviceone = require("deviceone");
var app = deviceone.sm("do_App");

module.exports.start = function(paras){
    paras.animationType = paras.animationType || "push_r2l";
    paras.statusBarState = paras.statusBarState || "transparent";
    paras.statusBarFgColor = paras.statusBarFgColor || "white";
    app.openPage(paras);
};
