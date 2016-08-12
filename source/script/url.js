var deviceone = require("deviceone");
var global = deviceone.sm("do_Global");
var nf = deviceone.sm("do_Notification");

var test = "";// 测试地址
var user = ""// 用户
var admin = ""// 管理者
var dmodule = "" // 组件
var user_login = ""
var user_getcode = ""
var user_reg = ""
var sc = ""
var uploadImgUrl = "";
var ios_update_Url = ""

var api_domain, prefix, api_prefix;
api_domain = sc + "Api/";
prefix = "";
api_prefix = sc + "files";

var url = {
	getUrl : sc,
	getModule : dmodule,
	getToken : user_login,
	getCode : user_getcode,
	reg : user_reg,
	uploadImgUrl : uploadImgUrl,
	ios_update_url : ios_update_Url
}

var headCodeCheck = function(data) {
	if (data) {
		if (data.code == "200") {
			return true;
		} else {
			nf.alert(data.head.message);
			return false;
		}
	} else {
		nf.alert(data.message);
		return false;
	}
};

var Euc = encodeURIComponent;
var queryString = function(obj, sep, eq, name) {
	sep = sep || '&';
	eq = eq || '=';
	obj = obj === null ? undefined : obj;
	if (typeof obj === "object")
		return Object.keys(obj).map(function(k) {
			var ks = Euc(k) + eq;
			if (Array.isArray(obj[k]))
				return obj[k].map(function(v) {
					return ks + Euc(v)
				}).join(sep);
			else
				return ks + Euc(obj[k]);
		}).join(sep);
	if (!name)
		return "";
	return Euc(name) + eq + Euc(obj);
};

var minute = 1000 * 60;
var hour = minute * 60;
var day = hour * 24;

var time_format = function(createTime) {
	createTime = new Date(createTime).toISOString().replace(/T/g, ' ').replace(
			/\.[\d]{3}Z/, '');
	var strtoTime = Date.parse(createTime.replace(/-/gi, "/"));
	var diffTime = new Date().getTime() - strtoTime;
	var dayC = diffTime / day;
	var hourC = diffTime / hour;
	var minC = diffTime / minute;
	if (dayC >= 1) {
		dayC = parseInt(dayC);
		createTime = dayC == 1 ? "发表于昨天" : createTime;
	} else if (hourC >= 1) {
		createTime = "发表于" + parseInt(hourC) + "个小时前";
	} else if (minC >= 1) {
		createTime = "发表于" + parseInt(minC) + "分钟前";
	} else {
		createTime = "刚刚发表";
	}
	return createTime;
};

var time_ymd = function(time) {
	time = new Date(time).toISOString();
	time.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/-/gi, "/");
	return time.substr(0, 10);
};

var thumb_icon = function(icon) {
	var temp = icon.split("/");
	temp = temp[temp.length - 1];
	return icon.replace(temp, "Thumb/" + temp);
};

var work_format = function(data) {
	var img, imgsL, imgT, lines, sources;
	data = JSON.stringify(data).replace(/null/g, "\"\"");
	data = JSON.parse(data);
	data.forEach(function(v) {
		v.id = v.Id;
		v.UserId = v.UserId;
		// v.UserIcon = prefix + v.UserIcon;
		v.UserIcon = v.UserIcon;
		v.CreateTime = time_format(v.CreateTime);
		imgsL = v.Imgs.length;
		lines = Math.floor((imgsL / 3) + (imgsL % 3 == 0 ? 0 : 1));
		v.template = lines > 3 ? 3 : lines;
		v.btn_check = v.Message.length > 40;
		sources = [];
		for (var n = 0, nLen = lines * 3; n < nLen; n++) {
			if (n < imgsL) {
				// img = api_prefix + v.Imgs[n].Path;
				img = prefix + v.Imgs[n].Path;
				// imgT = thumb_icon(img);
				v["img" + n + "t"] = img;
				v["img" + n + "v"] = true;
				sources.push({
					source : img,
					init : img
				});
			} else
				v["img" + n + "v"] = false;
		}
		if (imgsL == 1) {
			v.img0w = v.Imgs[0].width;
			v.img0h = v.Imgs[0].height;
			v.template = 4;
		}
		v.sources = JSON.stringify(sources);
		if (v.WorkCircleComments.length > 0) {
			v.commentList = "";
			v.WorkCircleComments
					.forEach(function(comment) {
						v.commentList += (comment.UserName + "："
								+ comment.Message + "\r\n")
					});
			v.commentList = v.commentList
					.substring(0, v.commentList.length - 2);
			v.commentVis = true;
		} else
			v.commentVis = false;
		delete v.Imgs;
		delete v.WorkCircleComments;
	});
	return data;
};

var inform_format = function(data) {
	data.forEach(function(v) {
		if (v.icon) {
//			v.icon = prefix + thumb_icon(v.icon);
			v.icon = thumb_icon(v.icon);
			v.template = 0;
		} else {
			delete v.icon;
			v.template = 1;
		}
		v.describeVis = !!v.describe;
		if (v.describeVis)
			v.describe.replace(/&nbsp;/g, "").trim();
		else
			delete v.describe;
		if (v.inforTypeIcon){
//			v.inforTypeIcon = prefix + v.inforTypeIcon;
			v.inforTypeIcon = v.inforTypeIcon;
		}
			
		v.createTime = time_ymd(v.createTime);
	});
	return data;
};

var comment_format = function(data) {
	data.forEach(function(v) {
		v.createTime = time_format(v.createTime);
//		v.icon = prefix + v.icon;
		v.icon =  v.icon;
	});
	return data;
};

module.exports.url = url;
module.exports.queryString = queryString;
module.exports.headCodeCheck = headCodeCheck;
module.exports.time_format = time_format;
module.exports.work_format = work_format;
module.exports.inform_format = inform_format;
module.exports.comment_format = comment_format;
module.exports.thumb_icon = thumb_icon;
module.exports.time_ymd = time_ymd;
