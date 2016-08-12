var nf = sm("do_Notification");
var app = sm("do_App");
var page = sm("do_Page");
var $U = require("url");
var rootview = ui("$");
var pbar = ui(rootview.add("progressbar", "source://view/kit/pbar.ui", 0, 128));
var hash = require("hash");
var verify = require("verify");
var global = sm("do_Global");

var anim_button = mm("do_Animation", "BUTTONTOUCHDOWN", "app");

var  phone = ui("phone")
var  idcode = ui("idcode")
var  pass = ui("pass")
var  name = ui("name")
var  bn_idcode = ui("bn_idcode");
var  register_ok = ui("register_ok")

var browse = ui("browse");
browse.on("touch",function(){
	app.closePage();
});

var page = sm("do_Page");
page.on("back", function() { // 监听android 的返回按钮;
    app.closePage();
});


var delay3 = mm("do_Timer");
delay3.delay = 0;
delay3.interval = 1000;
delay3.DURATION = 3;
delay3.on("tick", function(){
    if(this.DURATION <= 0){
        this.stop();
        return page.fire("back");
    }
    this.DURATION--;
});

//注册
var register_http = mm("do_Http");
register_http.method = "post";
register_http.timeout = "60000";
register_http.contentType = "application/json";
register_http.on("result", function(data){
    pbar.visible = false;
    var msg = JSON.parse(data.data)
    nf.alert(msg.message)
    if(data.status == 204){
    	global.setMemory("phone", phone.text.trim());
    	global.setMemory("pass", pass.text.trim());
        nf.toast("注册成功");
        delay3.start();
    }
}).on("success", function(data){

});


var checkCode_http = mm("do_Http");
checkCode_http.method = "get";
checkCode_http.timeout = "60000";
checkCode_http.contentType = "application/json";
checkCode_http.on("result", function(data){
    pbar.visible = false;
    var msg = JSON.parse(data.data)
    nf.alert(msg.message)
    if(data.status == 204){
        pbar.visible = false;
        nf.toast("验证码已发送");
    }
}).on("success", function(data){

});

timer = mm("do_Timer");
timer.delay = 0;
timer.interval = 1000;
timer.DURATION = 60;
timer.on("tick", function(){
    if(this.DURATION <= 0){
        bn_idcode.text = "获取验证码";
        bn_idcode.enabled = true;
        this.DURATION = 60;
        return this.stop();
    }
    bn_idcode.text = this.DURATION-- + "秒";
});

bn_idcode.enabled = true;

register_ok.on("touch", function(){
    var a = phone.text.trim()
    var b = name.text.trim();
    var c = pass.text.trim();
    var d = idcode.text.trim();
    var cell = [
                [ a, "!:mphone", "手机号不可为空:请输入正确的手机号" ]
            ];
    var i,l;
	l = cell.length;
	for(i = 0;i<l;i++){
		var ver = verify.Run(cell[i]);
		if (! ver[0])   return nf.toast(ver[1]);
	};
    if(b === "" ) return nf.alert("昵称不能为空");
    if(c === "" ) return nf.alert("密码不能为空");
    if(d === "" ) return nf.alert("验证码不能为空");
//    c = hash.hex_md5(c);
	var body = {
			userName:b,
			phoneNumber : a,
			password : c,
			code : d
	}

    pbar.visible = true;
	register_http.url = $U.url.reg;
	register_http.body = body
    register_http.request();
	deviceone.print(register_http.url)
	deviceone.print(register_http.body)
}).on("touchDown", function(){
    this.animate(anim_button);
});


bn_idcode.on("touch",function(data, e){
	var myphone = phone.text.trim()
    var cell = [
                [ myphone, "!:mphone", "手机号不可为空:请输入正确的手机号" ]
               ];
    var i,l;
	l = cell.length;
	for(i = 0;i<l;i++){
		var ver = verify.Run(cell[i]);
		if (! ver[0])   return nf.toast(ver[1]);
	};
    checkCode_http.url = $U.url.getCode+"?phoneNumber="+myphone;
    deviceone.print(JSON.stringify(checkCode_http.url))
    checkCode_http.request();
    bn_idcode.enabled = false;
    timer.start();
});

var  xy = ui("xy")
xy.on("touch",function(data, e){
	app.openPage({source:"source://view/application/detail/web_view.ui",data:{"url":"","text":"DeviceOne-用户协议"},animationType:"push_r2l_1"});
});
