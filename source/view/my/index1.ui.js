var app = sm("do_App");
var page = sm("do_Page");
var nf = sm("do_Notification");
var global = sm("do_Global");
var rootview = ui("$");
var pbar = ui(rootview.add("progressbar", "source://view/kit/pbar.ui", 0, 128));

var back = ui("back");
back.on("touch",function(){
	app.closePage();
});

page.on("back", function() { // 监听android 的返回按钮;
    app.closePage();
});

var segmentview = ui("do_SegmentView");
var segment_listdata = mm("do_ListData");
segmentview.bindItems(segment_listdata);

var slideview = ui("do_SlideView"); 
var slide_listdata = mm("do_ListData");
slideview.bindItems(slide_listdata);

var addData= [];
addData.push({"title":"应用",fontColor: "DE3031FF",fontStyle : "bold",fontSize : "35",type : "0",color : "DE3031FF"})
var slideData = [];

segment_listdata.addData(addData)
segmentview.refreshItems();

addData.map(function(k, v) {
	slideData.push({template:0,areaMap:k.type});
})
slide_listdata.addData(slideData);
slideview.refreshItems();

segmentview.on("indexChanged", function(index){
    slideview.set({index: index});
});

//slideview绑定数据，绑定事件，滑动触发
slideview.on("indexChanged", function(index){
    for (var i = 0 ; i <addData.length ; i++ ){
    	if(index == i){
    		addData[i].fontColor = "DE3031FF"
    		addData[i].fontStyle = "bold"
    		addData[i].fontSize = "35"
    		addData[i].color = "DE3031FF"
    	} else {
    		addData[i].fontColor = "000000FF"
    		addData[i].fontStyle = "normal"
    		addData[i].fontSize = "30"
    	    addData[i].color = "00000000"
    	}
    }
    segment_listdata.removeAll();
	segment_listdata.addData(addData);
    segmentview.refreshItems();
    segmentview.set({index: index});
});
