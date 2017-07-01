/**
 * 演示程序当前的 “注册/登录” 等操作，是基于 “本地存储” 完成的
 * 当您要参考这个演示程序进行相关 app 的开发时，
 * 请注意将相关方法调整成 “基于服务端Service” 的实现。
 **/
(function($, owner) {
//	var  host = "http://h4fyk.ngrok.natapp.cn";
	var host = "http://andrew.s1.natapp.cc";
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo, callback) {
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		loginInfo.account = loginInfo.account || '';
		loginInfo.password = loginInfo.password || '';
		loginInfo.src = loginInfo.src || '';
		if (loginInfo.account.length < 5) {
			return callback('账号最短为 5 个字符');
		}
		if (loginInfo.password.length < 6) {
			return callback('密码最短为 6 个字符');
		}
//		var users = JSON.parse(localStorage.getItem('$users') || '[]');
		var url = host + "/user/login";
		mui.post(url,{
				name: loginInfo.account,
				password: loginInfo.password,
				src: loginInfo.src
			},function(data){
				//服务器返回响应，根据响应结果，分析是否登录成功；
				var info = data;
				if(info.status == 1){
					return owner.createState(loginInfo.account,loginInfo.src, callback);
				}else{
					return callback('用户名或密码错误');
				}
			},'json'
		);
	};
	/**
	 * 获取头像
	 **/
	owner.getAvatar = function(loginAccount, callback) {
		var url = host + "/user/get";
		mui.post(url,{
				name: loginAccount
			},function(data){
				//服务器返回响应，根据响应结果，分析是否登录成功；
				var info = data;
				if( info.status == 1){
//					console.log(info.data);
//					owner.createState(info.data, callback);
					return callback(host+info.data);
				}else{
					return callback('failed');
				}
			},'json'
		);
	};
	
	owner.gethost = function(){
		return host;
	}
	
	owner.createState = function(name,src, callback) {
		var state = owner.getState();
		state.account = name;
		state.img_src = src;
		owner.setState(state);
		return callback();
	};

	/**
	 * 新用户注册
	 **/
	owner.reg = function(regInfo, callback) {
		callback = callback || $.noop;
		regInfo = regInfo || {};
		regInfo.account = regInfo.account || '';
		regInfo.password = regInfo.password || '';
		if (regInfo.account.length < 5) {
			return callback('用户名最短需要 5 个字符');
		}
		if (regInfo.password.length < 6) {
			return callback('密码最短需要 6 个字符');
		}
		if (!checkEmail(regInfo.email)) {
			return callback('邮箱地址不合法');
		}

		var url = host + "/user/register";
		mui.post(url,{
				name: regInfo.account,
				password: regInfo.password,
				email: regInfo.email
			},function(data){
				//服务器返回响应，根据响应结果，分析是否登录成功；
				var info = data;
				if(info.status == 1){
					return callback(null);
				}else{
					var err = info.data;
					return callback(err);
				}
			},'json'
		);
	};

	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};
	
//	/**
//	 * 更新当前状态
//	 **/
//	owner.changeState = function(image, callback) {
//		var state = owner.getState();
//		state.img_src = host + image;
//		mui.alert(state.log);
//		owner.setState(state);
//		return callback(host + image);
//	};
	
	/**
	 * 获取用户信息
	 */
	owner.getInfo = function(){
		var url = host + "/user/get";
		mui.ajax(url,{
			data:{},
			dataType:'jsonp',//服务器返回json格式数据
			type:'get',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			headers:{'Content-Type':'application/json'},	              
			success:function(result){
				//服务器返回响应，根据响应结果，分析是否登录成功；
				var info = JSON.parse(result);
				if( info.status == 1){
					return info.data;
				}else{
					return "error";
				}
			},
			error:function(xhr,type,errorThrown){
				//异常处理；
				return "error";
			}
		});
	};

	/**
	 * 添加好友
	 */
	owner.addFriend = function(FriName){
		var url = host + "/friend/add";
		mui.post(url,{
				FriName: FriName
			},function(data){
				//服务器返回响应，根据响应结果，分析是否登录成功；
				var info = data;
				if( info.status == 1){
					return "success";
				}else{
					return "error";
				}
			},'json'
		);
	};
	
	/**
	 * 删除好友
	 */
	owner.delFriend = function(FriName){
		var url = host + "/friend/delete";
		mui.post(url,{
				FriName: FriName
			},function(data){
				//服务器返回响应，根据响应结果，分析是否登录成功；
				var info = data;
				if( info.status == 1){
					return "success";
				}else{
					return "error";
				}
			},'json'
		);
	};
	
	
	/**
	 * 获取好友信息
	 */
	function fresh(headUrl, name, getn, postn){
		var result = '<li class="mui-table-view-cell friend-cell"><div class="mui-slider-cell"><div class="oa-contact-cell mui-table"><div class="oa-contact-avatar mui-table-cell"><img src='+headUrl+'style="width: 45px;height: 45px;"/></div><div class="oa-contact-content mui-table-cell""><div class="mui-clearfix"><h4 class="oa-contact-name">'+name+'</h4><span class="oa-contact-position mui-h6"></span></div><p class="oa-contact-email mui-h6">发出' + getn + '封&nbsp;&nbsp;&nbsp;&nbsp;收到'+postn+'封</p></div><div class="delete"><br/></div></div></div></li>';
		return result;
	}
	owner.getFriend = function(){
		var url = host + "/friend/show";
		mui.post(url,{
//				FriName: FriName
			},function(data){
				//服务器返回响应，根据响应结果，分析是否登录成功；
				var info = data;
				
//				console.log(document.getElementById('loop3').innerHTML);
				document.getElementById('hahaa').innerHTML = '<li class="mui-table-view-cell"style="height: 40px;"><div class="mui-slider-cell"><div class="oa-contact-cell mui-table"><div class="mui-input-row mui-search" style="margin-top: 2px;"><input id="search"type="search"class="mui-input-clear"placeholder="好友搜索"></input></div></div></div></li>';
				if( info.status == 1){
					for(var i in info.data){
						var result = fresh("\'"+"images/IMG_0022.jpg" + "\'", info.data[i].name,5,3);
						var content = document.getElementById('hahaa').innerHTML;
						content+=result;
//						content+='<div id="block"></div>';
						document.getElementById('hahaa').innerHTML=content;
					}
					document.getElementById('hahaa').innerHTML+='<div id="block"></div>';
					return info.data;
				}else{
					return "error";
				}
			},'json'
		);
		console.log("getFriend success.");
	};
	
	
	/**
	 * 查询信息
	 */
	function Query(headUrl, name, address){
		var result = '<div id="result"class="add-cell mui-input-group"><div class="mui-slider-cell mui-table-view-cell"><div class="oa-contact-cell mui-table"><div class="oa-contact-avatar mui-table-cell"><img src=' + headUrl +'style="width: 45px;height: 45px;"/></div><div class="oa-contact-content mui-table-cell"><div class="mui-clearfix"><h4 id="lame"class="oa-contact-name">' + name +'</h4><span class="oa-contact-position mui-h6"></span></div><p class="oa-contact-email mui-h6">' + address +'</p></div><div class="oa-contact-avatar mui-table-cell"><button id="addBtn"type="button"class="addBtn mui-btn-primary"onclick="return false;">添加</button></div></div></div></div>'
		return result;			
	}
	owner.queryPerson = function(name){
		var url = host + "/friend/query";
		var res;
		mui.post(url,{
				name: name
			},function(data){
				//服务器返回响应，根据响应结果，分析是否登录成功；
				var info = data;
				document.getElementById('content').innerHTML = '';
				if( info.status == 1){
//					console.log(info.data[0].name);
					for(var i in info.data){
						console.log(info.data[i].name);
						var result = Query("\'"+"images/IMG_0022.jpg" + "\'", info.data[i].name, '[西安]');
						var content = document.getElementById('content').innerHTML;
						content += result;
						document.getElementById('content').innerHTML = content;
					};
					return info.data;
				}else{
					return "error";
				}
			},'json'
		);
	};
	
	
	/**
	 * 查询音乐
	 */
	function CreateMusicCard(imageUrl, musicName, musicUrl,authorName){
		var result = '<div class="mui-card"><div class="mui-card-content"><img class="play-button"src="images/playBtn.jpg"/><img class="muisic-bg"src=' + imageUrl + ' alt=""/><audio class="audios" src=' + musicUrl + '></audio></div><div class="mui-card-footer"><div>' + musicName + '-' + authorName + '</div><a class="mui-card-link">添加</a></div></div>';
		return result;
	}
	owner.queryMusic = function(name){
		var url = host + "/music/query";
		var res;
		mui.post(url,{
				music: name
			},function(data){
				//服务器返回响应，根据响应结果，分析是否登录成功；
				var info = data;
				document.getElementById('musicResult').innerHTML = '';
				if( info.status == 1){
					for(var i in info.data){
						var result = CreateMusicCard("\'"+host + info.data[i].imageUrl+"\'", info.data[i].musicName,"\'"+ host+info.data[i].contentUrl + "\'",info.data[i].authName);
//						var result = CreateMusicCard("\'"+host + info.data[i].imageUrl+"\'", info.data[i].musicName,"\'"+ '/music/grude.mp3' + "\'",info.data[i].authName);
						var content = document.getElementById('musicResult').innerHTML;
						content += result;
						document.getElementById('musicResult').innerHTML = content;
					};
					return info.data;
				}else{
					return "error";
				}
			},'json'
		);
	};
	
	/**
	 * 获取音乐信息
	 */
	function hotMusic(imageUrl, musicUrl){
//		var result = '<li class="mui-table-view-cell friend-cell"><div class="mui-slider-cell"><div class="oa-contact-cell mui-table"><div class="oa-contact-avatar mui-table-cell"><img src='+headUrl+'style="width: 45px;height: 45px;"/></div><div class="oa-contact-content mui-table-cell""><div class="mui-clearfix"><h4 class="oa-contact-name">'+name+'</h4><span class="oa-contact-position mui-h6"></span></div><p class="oa-contact-email mui-h6">发出' + getn + '封&nbsp;&nbsp;&nbsp;&nbsp;收到'+postn+'封</p></div><div class="delete"><br/></div></div></div></li>';
		var result = '<div class="mui-slider-item" style="height:180px ;overflow: hidden;"><a href="#"><img style="width: 50px;" class="play-button" src="images/playBtn.jpg"/><img src=' + imageUrl + ' class="music-images"/><audio src=' + musicUrl + '></audio></a></div>';
		return result;
	}
	owner.getMusic = function(){
		var url = host + "/music/show";
		mui.post(url,{
//				
			},function(data){
				//服务器返回响应，根据响应结果，分析是否登录成功；
				var info = data;
				
				if( info.status == 1){
					var c = 1;
					var first = '';
					var last = '';
					
//					mui.alert(document.getElementById('musicContent').innerHTML);
					document.getElementById('loop').innerHTML = '';
					for(var i in info.data.hot){
						if(c == 1){
							last = '<div class="mui-slider-item mui-slider-item-duplicate" style="height:180px ;overflow: hidden;"><a href="#"><img style="width: 50px;" class="play-button" src="images/playBtn.jpg"/><img src=' + '\"' + host + info.data.hot[i].imageUrl + '\"' + 'class="music-images"/><audio src=' + '\"'+ host+info.data.hot[i].contentUrl + '\"' + '></audio></a></div>';
						}
						if(c == 4){
							first = '<div class="mui-slider-item mui-slider-item-duplicate" style="height:180px ;overflow: hidden;"><a href="#"><img style="width: 50px;" class="play-button" src="images/playBtn.jpg"/><img src=' + '\"' + host + info.data.hot[i].imageUrl + '\"' + 'class="music-images"/><audio src=' + '\"'+ host+info.data.hot[i].contentUrl + '\"' + '></audio></a></div>';
						}
						var result = hotMusic("\'"+host + info.data.hot[i].imageUrl+"\'","\'"+ host+info.data.hot[i].contentUrl + "\'");
						var content = document.getElementById('loop').innerHTML;
						content+=result;
						if(c < 4){
							document.getElementById('loop').innerHTML = content;
						}else if(c == 4){
							content += last;
							first += content;
							document.getElementById('loop').innerHTML = first;
						}
						c++;
					}
					
//					for(var i in info.data.normal){
//						
//						var musicCard = document.getElementById('musicCard0');
//						var result = musicCard.outerHTML;
////						var result = CreateMusicCard("\'"+host + info.data.normal[i].imageUrl+"\'", info.data.normal[i].musicName,"\'"+ host+info.data.normal[i].contentUrl + "\'",info.data.normal[i].authName);
//////						var result = freshMusic("\'"+"images/IMG_0022.jpg" + "\'", info.data[i].name,5,3);
////						var content = document.getElementById('musicStore').innerHTML;
//////						content+=result;
////						document.getElementById('musicStore').innerHTML=content;
////						$('#musicStore').append(CreateMusicCard("\'"+host + info.data.normal[i].imageUrl+"\'", info.data.normal[i].musicName,"\'"+ host+info.data.normal[i].contentUrl + "\'",info.data.normal[i].authName));
//						$('#musicStore').append('<button>123</button>');
//					}

					var box = document.getElementById('box');
					box.innerHTML = '';
					for(var i in info.data.normal){
						var result = CreateMusicCard("\'"+host + info.data.normal[i].imageUrl+"\'", info.data.normal[i].musicName,"\'"+ host+info.data.normal[i].contentUrl + "\'",info.data.normal[i].authName);
						var content = document.getElementById('box').innerHTML;
						content+=result;
						document.getElementById('box').innerHTML=content;
					}
					
					return info.data;
				}else{
					return "error";
				}
			},'json'
		);
		console.log("getMusic success.");
	};
	
	/**
	 * 查询好友信息
	 */
	owner.queryFriend = function(name){
		var url = host + "/friend/query";
		mui.post(url,{
				FriName: FriName
			},function(data){
				//服务器返回响应，根据响应结果，分析是否登录成功；
				var info = data;
				if( info.status == 1){
//					console.log(info.data[0].name);
					for(var i in info.data){
						console.log(info.data[i].name);
					};
					return info.data;
				}else{
					return "error";
				}
			},'json'
		);
	};
	
	/**
	 * 获取token是否存在
	 **/
	owner.getToken = function(name, callback) {
		var state = owner.getState();
//		console.log(state.account);
		if(!state.account){
			return callback("error");
		}else{
			var url = host + "/user/login/token";
			mui.post(url,{
				
			},function(data){
				//服务器返回响应，根据响应结果，分析是否登录成功；
				var info = data;
					if( info.status == 1){
//						owner.setState({});
//						console.log(info.data)
//						document.getElementById('img_src').src = info.data.src;
//						console.log(info.data.src);
						return owner.createState(info.data.name,(host + info.data.src), callback);
					}else{
						return callback("error");
					}
	//				return callback(JSON.parse(result).data);
			},'json'
		);
		}
	};
	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
	};

	var checkEmail = function(email) {
		email = email || '';
		return (email.length > 3 && email.indexOf('@') > -1);
	};

	/**
	 * 找回密码
	 **/
	owner.forgetPassword = function(email, callback) {
		callback = callback || $.noop;
		if (!checkEmail(email)) {
			return callback('邮箱地址不合法');
		}
		return callback(null, '新的随机密码已经发送到您的邮箱，请查收邮件。');
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
//		settings.autoLogin = true;
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
			var settingsText = localStorage.getItem('$settings') || "{}";
			return JSON.parse(settingsText);
		}
		/**
		 * 获取本地是否安装客户端
		 **/
	owner.isInstalled = function(id) {
		if (id === 'qihoo' && mui.os.plus) {
			return true;
		}
		if (mui.os.android) {
			var main = plus.android.runtimeMainActivity();
			var packageManager = main.getPackageManager();
			var PackageManager = plus.android.importClass(packageManager)
			var packageName = {
				"qq": "com.tencent.mobileqq",
				"weixin": "com.tencent.mm",
				"sinaweibo": "com.sina.weibo"
			}
			try {
				return packageManager.getPackageInfo(packageName[id], PackageManager.GET_ACTIVITIES);
			} catch (e) {}
		} else {
			switch (id) {
				case "qq":
					var TencentOAuth = plus.ios.import("TencentOAuth");
					return TencentOAuth.iphoneQQInstalled();
				case "weixin":
					var WXApi = plus.ios.import("WXApi");
					return WXApi.isWXAppInstalled()
				case "sinaweibo":
					var SinaAPI = plus.ios.import("WeiboSDK");
					return SinaAPI.isWeiboAppInstalled()
				default:
					break;
			}
		}
	}
}(mui, window.app = {}));