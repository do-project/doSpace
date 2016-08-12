var app = sm("do_App");
var page = sm("do_Page");
var nf = sm("do_Notification");
var global = sm("do_Global");
var imgbrowser = sm("do_ImageBrowser");
var rootview = ui("$");
var pbar = ui(rootview.add("progressbar", "source://view/kit/pbar.ui", 0, 128));
var $U = require("url");
var open = require("open");

page.on("back", function(){
    app.closePage();
});

ui("action_back").on("touch", function(){
    app.closePage();
});

var token = global.getMemory("user_token");
var isMore = false;
var pagedata = page.getData();
var id = global.getMemory("user_id")

var listview = ui("do_listview");
var listdata = mm("do_ListData");
listview.bindItems(listdata);
var listcache = sm("do_DataCache");
var chchekey = "cache_work_emp_" + pagedata.id;

var work_http = mm("do_Http");
work_http.method = "get";
work_http.timeout = "60000";
work_http.contentType = "application/json";
work_http.on("fail", function(data){
}).on("success", function(data){
	deviceone.print(JSON.stringify(data))
    data = $U.work_format(data);
    if (isMore) {
        if (!data.length) nf.toast("暂无更多");
    } 
    listdata.removeAll();
    listdata.addData(data);
    listview.refreshItems();
    listcache.saveData({key: chchekey, value: listdata.getRange(0)});
});

work_http.url = $U.url.getUrl+"user/workCircle&page=1"+"&PageSize=20"
deviceone.print(work_http.url)
work_http.request();

var datacache = listcache.loadData({key: chchekey});
if (datacache && datacache.length) {
    listdata.addData(datacache);
    listview.refreshItems();
} else {
    pbar.visible = true;
}


page.on("imgs-listen", function(data){
    imgbrowser.show(data.s, data.i);
});


page.on("icon-listen", function(data){
	open.start({source: "source://view/wlt/employer.ui", data: data});
});

page.on("comment-listen", function(data){
    open.start({source: "source://view/wlt/comment_pub.ui", data: data, keyboardMode: "visible"});
});

