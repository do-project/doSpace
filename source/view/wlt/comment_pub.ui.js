var app = sm("do_App");
var page = sm("do_Page");
var nf = sm("do_Notification");
var global = sm("do_Global");
var rootview = ui("$");
var pbar = ui(rootview.add("progressbar", "source://view/kit/pbar.ui", 0, 128));
var shade = ui(rootview.add("shade", "source://view/kit/shade.ui", 0, 128));
var $U = require("url");

page.on("back", function(data){
    app.closePage(data);
});

ui("action_back").on("touch", function(){
    app.closePage();
});
var token = global.getMemory("user_token");

var add_http = mm("do_Http");
add_http.method = "post";
add_http.timeout = "60000";
add_http.contentType = "application/json";
add_http.on("fail", function(data){
	pbar.visible = false;
	deviceone.print("comment add fail:" + data)
}).on("success", function(data){
    pbar.visible = false;
    if (data){
    	nf.alert("评论成功", function(){
            page.fire("back", {work_reply: true});
        });
    }
});

var action_ok = ui("action_ok");
var tb_comment = ui("tb_comment");

tb_comment.on("focusIn", function(){
    shade.visible = true;
});
var pagedata = page.getData();
action_ok.on("touch", function(){
	nf.confirm("确定是否发布评论?", function(state){
		if (state != 1) return;
	    page.hideKeyboard();
	    deviceone.print("Message:"+tb_comment.text.trim()+"//workCircleID:"+pagedata.id+"//UserId:"+ 	global.getMemory("userID"))
	    var body = {
	        Message: tb_comment.text.trim(),
	        WorkCircleId: pagedata.id,
	        UserId:	global.getMemory("userID")
	    };
	    if (body.Message == "") return nf.toast("请输入评论内容");
	    pbar.visible = true;
	    add_http.body = body;
	    add_http.url = $U.url.getUrl+"workCircleComment"
	    add_http.request();
	});
});
