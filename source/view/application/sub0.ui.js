var app = sm("do_App");
var page = sm("do_Page");
var nf = sm("do_Notification");

var listview, listdata;

listview = ui("do_ListView_1");
listdata = mm("do_ListData");

listview.bindItems(listdata);

var storage = sm("do_Storage");
storage.readFile("data://get_app_list.json", function(data){// 读取文件
    listdata.addData(data); // 给ListData添加数据
    listview.refreshItems(); // 刷新ListView 行数据;
});


/*
page.on("loaded",function(data, e){
	http.request();
});
*/

var http;
http = mm("do_Http");
http.method = "GET";
http.timeout = 30000;
http.contentType = "application/json";
http.url = "";
http.request();
http.on("success", function(data){
	listdata.removeAll();
	var arr=eval(data);
	var temp=["[推荐]","[示例demo]","[开源App]","[项目案例]"];
	var i;
	for(i=0;i<arr.result.length;i++)
	{
		if(arr.result[i].apptype == 0)
			listdata.addData([ { appicon:arr.result[i].appicon,apptype:temp[arr.result[i].apptype],appname:arr.result[i].appname,lastdate:arr.result[i].lastdate,appdesc:arr.result[i].appdesc}]);
	}
	listview.refreshItems();
});

listview.on("touch", function(index) {
	app.openPage({source:"source://view/application/detail/view0.ui",animationType:"push_r2l_1"});

});

listview.on("pull", function(data) {
    if (data.state !== 2) return;
    this.rebound();
});