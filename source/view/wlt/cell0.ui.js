var rootview = ui("$");
var page = sm("do_Page");
var nf = sm("do_Notification");

rootview.setMapping({
    "icon.tag": "UserId",
    "icon.source": "UserIcon",
    "name.text": "UserName",
    "message.text": "Message",
    "message.visible": "msgVis",
    "message_all.text": "Message",
    "message_all.visible": "msgAllVis",

    "btn_check.visible": "btn_check",
    "lb_check.text": "lb_check",

    "createTime.text": "CreateTime",
    "actionTips.tag": "id",

    "commentList.text": "commentList",
    "commentList.visible": "commentVis"
});

var icon = ui("icon");
var img_icon = ui("img_icon")
var actionTips = ui("actionTips");
var btn_check = ui("btn_check");
var lb_check = ui("lb_check");
var message = ui("message");

icon.on("touch", function(){
    page.fire("icon-listen", {itcode: this.tag});
});

actionTips.on("touch", function(){
    page.fire("comment-listen", {id: this.tag});
});

btn_check.on("touch", function(){
    page.fire("check-all-listen", {id: actionTips.tag, vis: message.visible});
}).on("touchDown", function(){
    this.bgColor = "D5D5D5FF";
}).on("touchUp", function(){
    this.bgColor = "00000000";
});
