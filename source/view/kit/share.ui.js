var app = sm("do_App");
var page = sm("do_Page");
var nf = sm("do_Notification");
var rootview = ui("$");

rootview.on("touch", function(){
    this.visible = false;
});

var action_alys = [
    ui("action_qq"),
    ui("action_wx"),
    ui("action_wb")
];

for (var i = 0; i < action_alys.length; i++) {
    action_alys[i].on("touch", function(){
        rootview.visible = false;
        page.fire("share-listen", this.id.substr(7));
    })
}

ui("do_actions").on("touch", function(){
    return false;
});