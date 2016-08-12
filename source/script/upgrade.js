var deviceone = require("deviceone");
var global = deviceone.sm("do_Global");
var nf = deviceone.sm("do_Notification");
var device = deviceone.sm("do_Device");
var external = deviceone.sm("do_External");
var $U = require("url");

var os = device.getInfo().OS == "android" ? 1 : 0;
var version = global.getVersion().ver;

var request = function(pbar){
    var http = deviceone.mm("do_Http");
    if(os == 1){
        http.url = $U.url.getUrl+"versionUpdate" + "?" + $U.queryString({type: os});
    }
    if(os == 0){
    	http.url = "https://developer.z012.com/d1protalVersion/user/versionUpdate?"+ $U.queryString({type: os});
    }
    deviceone.print(http.url)
    http.method = "get";
    http.timeout = "60000";
    http.contentType = "application/json";
    http.on("fail", function(data){
        if (pbar) $U.fail(data, pbar);
    }).on("success", function(data){
        if (pbar) pbar.visible = false;
        if (data.VersionNum != version) {
            nf.confirm("检测到新版本，是否升级？", function(state){
                if (state != 1) return;
                external.openURL(data.Path);
            });
        } else if (pbar) nf.alert("已是最新版本");
    });
    if (pbar) pbar.visible = true;
    http.request();
};

module.exports.request = request;