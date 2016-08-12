var app = sm("do_App");
var page = sm("do_Page");
var nf = sm("do_Notification");
var global = sm("do_Global");
var do_progressbar = ui("do_progressbar")
var lb_bfh = ui("lb_bfh")
ui("$").on("touch", function(){
    return false;
});
page.on("pro_size", function(data, e) {
	do_progressbar.progress = data.size
	lb_bfh.text = (data.bfh).toFixed(0) + "%"
})