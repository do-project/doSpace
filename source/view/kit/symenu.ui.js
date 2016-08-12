var app = sm("do_App");
var page = sm("do_Page");
var nf = sm("do_Notification");
var global = sm("do_Global");

var al_fx = ui("al_fx")
var al_yj = ui("al_yj")

al_fx.on("touch", function(){
    page.fire("symenu-fx", {state: 2});
});

al_yj.on("touch", function(){
    page.fire("symenu-yj", {state: 1});
});

ui("$").on("touch", function(){
    page.fire("symenu-listen", {state: 0});
});
