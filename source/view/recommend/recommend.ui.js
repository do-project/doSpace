/**
 * related to partner.ui
 * 
 * @Author : felix
 * @Timestamp : 2016-06-01
 */

var nf = sm("do_Notification");
var app = sm("do_App");
var page = sm("do_Page");
var global = sm("do_Global");
var rootview = ui("$");
var pbar = ui(rootview.add("progressbar", "source://view/kit/pbar.ui", 0, 128));
var share = ui(rootview.add("share", "source://view/kit/share.ui", 0, 0));
var symenu = ui(rootview.add("progressbar1", "source://view/kit/symenu.ui", 0, 0));

var $U = require("url");

var servicelist = ui("do_ListView_1")
var do_ListView_data = mm("do_ListData");
servicelist.bindItems(do_ListView_data);
do_ListView_data.addData([
                  { template : 0,Name : "纳豆", Brief : "在家中、公司，提前选择要去的餐厅，提前选好菜支付后，到点即可就餐，全城美食、中餐、快餐、小吃等！动动手指即可送达您的手中。",Image : "source://image/nadoupic.jpg" },
                  { template : 0,Name : "慧影时间流", Brief : "由慧影Cydow团队精心打造的一款独特的时间管理应用，它的独特主要体现在以下3点：1.对时间显示更加符合人自然感受的设计。2.对日程安排的灵活性。3.他不是一个独立一个应用，未来将与慧影个人智能信息系统同步，有效的个人智能信息库。",Image : "source://image/shijianliu.png" }, 
                  { template : 0,Name : "易经造命", Brief : "良心网推出的一款学习《易经》并灵活运用《易经》的使用教学工具。App提供多套学习的方法和多种《易经》的占卜玩法。！",Image : "source://image/yijing.jpg" },
                  { template : 0,Name : "移动OA", Brief : "主要是用于办公的OA系统，增加了添加好友和即时通信等主流功能。用户在5000以上。",Image : "source://image/OA.png" }, 
          ]);

servicelist.refreshItems();
servicelist.on("touch", function(index) {
    nf.alert(do_ListView_data.getOne(index), "touch");
    app.openPage({source:"source://view/recommend/recommend_detail.ui",animationType:"push_r2l_1"});
});

var listcache = sm("do_DataCache");
datas= [];
datas.push("source://image/nadoulogo.png","纳豆","在家中、公司，提前选择要去的餐厅，提前选好菜支付后，到点即可就餐，全城美食、中餐、快餐、小吃等！动动手指即可送达您的手中。","内蒙古","source://image/nadoupic.jpg");
listcache.saveData({key: "nadou", value: datas});