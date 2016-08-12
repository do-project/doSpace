var nf = sm("do_Notification");
var app = sm("do_App");
var page = sm("do_Page");
var storage = sm("do_Storage");
var jwt = require("jwt");
var hash = require("hash");
var global = sm("do_Global");
var rootview = ui("$");
var $U = require("url");
var pbar = ui(rootview.add("progressbar", "source://view/kit/pbar.ui", 0, 128));
var listcache = sm("do_DataCache");

page.on("back", function() { // 监听android 的返回按钮;
    app.closePage();
});

var tf_userID = ui("tf_username");
var tf_password = ui("tf_password");
var img_jzpw = ui("img_jzpw");
var anim_button = mm("do_Animation", "BUTTONTOUCHDOWN", "app");

page.on("result",function(){
	var phone = global.getMemory("phone");
	var pass = global.getMemory("pass");
	tf_userID.text = phone
	tf_password.text = pass
})

//登录http的配置
var login_body = {};
var login_http = mm("do_Http");
login_http.method = "post";
login_http.timeout = "60000";
login_http.contentType = "application/json";
login_http.on("fail", function(data){
    pbar.visible = false;
    nf.alert("登录失败，请稍后尝试！")
}).on("success", function(data){
    pbar.visible = false;
    global.setMemory("user_token", data.access_token);//缓存token
    deviceone.print("____________"+data.access_token);
    global.setMemory("is_login", "true");//是否登录
    global.setMemory("user_id", tf_userID.text.trim());//缓存用户名
	login_body.jzpw_sign = jzpw_sign;//记住密码图片标识
	storage.writeFile(login_file, login_body);//缓存用户名和密码
	page.fire("getTokenFinish_getInfo", {});
});
//获取个人信息的http配置
var getUserInfo_http = mm("do_Http");
getUserInfo_http.method = "get";
getUserInfo_http.timeout = "60000";
getUserInfo_http.contentType = "application/json";
getUserInfo_http.on("fail", function(data){
    pbar.visible = false;
}).on("success", function(data){
    pbar.visible = false;
    global.setMemory("userID", data.Id);
    datas= [];
	datas.push(data.Name,data.Email,data.MobilePhone,data.Icon,data.QQ,data.WeiXin,data.WeiBo,data.Integral);
	global.setMemory("person_info", data.Name);
	listcache.saveData({key: "cache_img", value: datas});
    app.closePage();
});

//绑定一个获取token之后获取个人信息的事件，在完成获取之后调用这个
page.on("getTokenFinish_getInfo", function(data) {
	pbar.visible = true;
	getUserInfo_http.url = $U.url.getUrl+"myInformation?accessToken=";
	getUserInfo_http.setRequestHeader("Authorization","Bearer "+ global.getMemory("user_token"));
	getUserInfo_http.request();
});

//点击登录需要完成两个动作，一个是登录的token，一个是获取用户的个人信息的userid
var login = ui("login");
login.on("touch", function(){
	page.hideKeyboard();
	login_body = {
		   	username: tf_userID.text.trim(),
		    password: tf_password.text.trim(),
	};
	var userID = tf_userID.text.trim()
	if (userID == "") return nf.toast("登录名不可为空");
	var password =  tf_password.text.trim()
	if (password == "") return nf.toast("密码不可为空");
	pbar.visible = true;
	login_http.url = $U.url.getToken
	login_http.body = "grant_type=password&username="+userID+"&password="+password+"&client_id=deviceone-portal";
	login_http.request();
}).on("touchDown", function(){
    this.animate(anim_button);
});

var register = ui("register");
register.on("touch",function(){
	app.openPage({source:"source://view/my/register.ui",animationType:"push_r2l_1"});
}).on("touchDown", function(){
    this.animate(anim_button);
});

var browse = ui("browse");
browse.on("touch",function(){
	app.closePage();
});

//记住密码
var ly_jzpw = ui("ly_jzpw");
ly_jzpw.on("touch",function(data, e){
	if (jzpw_sign){
		img_jzpw.source = "source://image/jz.png";
		jzpw_sign = false;
	}else{
		img_jzpw.source = "source://image/jz_d.png";
		jzpw_sign = true;
	}
});

var login_file = "data://security/login";
var jzpw_sign = false;
if (storage.fileExist(login_file)) {
  	storage.readFile(login_file, function(login_body){
	    jzpw_sign = login_body.jzpw_sign;
	    if (login_body.jzpw_sign){
			img_jzpw.source = "source://image/jz_d.png";
    		tf_userID.text = login_body.username;
    		tf_password.text = login_body.password;
    	}else {
            img_jzpw.source = "source://image/jz.png";
        }
  	});
}
