

			(function($, doc) {
				$.init(
					{
		              pullRefresh: {  
		                  container: '#offCanvasContentScroll',  
		                  down: {  
		                      callback: function pulldownRefresh() {  
					              setTimeout(function () {  
					                  app.getFriend();//实现更新页面的操作  
					                  img_src.src = state.img_src;//
									  img_src1.src = state.img_src;//
					                  mui('#offCanvasContentScroll').pullRefresh().endPulldownToRefresh(); //refresh completed  
					              }, 1500);  
					          }   
		                  } 
		              }  
		          }
				);
				var settings = app.getSettings();
//				var account = doc.getElementById('account');
				var name = doc.getElementById('user_name');
				var img_src = doc.getElementById('img_src');
				var img_src1 = doc.getElementById('img_src1');
				var state = app.getState();
//				console.log(state.account);
				name.innerText = state.account;
				img_src.src = state.img_src;
				img_src1.src = state.img_src;
				
				mui('.mui-scroll-wrapper').scroll({
					deceleration: 0.0006 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
				});
				//
				//触发submit按钮的点击事件
				var slider = mui("#slider");
	
				slider.slider({
					interval: 1000
				});

				window.addEventListener('show', function() {
//					var info = app.getInfo();
					var state = app.getState();
					console.log(state.account);
					name.innerText = state.account;
					img_src.src = state.img_src;
					img_src1.src = state.img_src;
//					account.innerText = state.account;
				}, false);
				$.plusReady(function() {
					var settingPage = $.preload({
						"id": 'setting',
						"url": 'setting.html'
					});
					//设置
					var settingButton = doc.getElementById('setting');
					settingButton.addEventListener('tap', function(event) {
						$.openWindow({
							id: 'setting',
							show: {
								aniShow: 'pop-in'
							},
							styles: {
								popGesture: 'hide'
							},
							waiting: {
								autoShow: false
							}
						});
					});
					
					var infoPage = $.preload({
						"id": 'info',
						"url": 'info.html'
					});
					//个人信息
					var infoButton = doc.getElementById('info');
					infoButton.addEventListener('tap', function(event) {
						$.openWindow({
							id: 'info',
							show: {
								aniShow: 'pop-in'
							},
							styles: {
								popGesture: 'hide'
							},
							waiting: {
								autoShow: false
							}
						});
					});
					
					var collectPage = $.preload({
						"id": 'collect',
						"url": 'collect.html'
					});
					//个人信息
					var collectButton = doc.getElementById('collect');
					collectButton.addEventListener('tap', function(event) {
						$.openWindow({
							id: 'collect',
							show: {
								aniShow: 'pop-in'
							},
							styles: {
								popGesture: 'hide'
							},
							waiting: {
								autoShow: false
							}
						});
					});

					//--
					$.oldBack = mui.back;
					var backButtonPress = 0;
					$.back = function(event) {
						backButtonPress++;
						if (backButtonPress > 1) {
							plus.runtime.quit();
						} else {
							plus.nativeUI.toast('再按一次退出应用');
						}
						setTimeout(function() {
							backButtonPress = 0;
						}, 1000);
						return false;
					};
				});
			}(mui, document));
			//退出
			document.getElementById('exit').addEventListener('tap', function() {
			if (mui.os.ios) {
				app.setState({});
				mui.openWindow({
					url: 'login.html',
					id: 'login',
					show: {
						aniShow: 'pop-in'
					},
					waiting: {
						autoShow: false
					}
				});
				return;
			}
			var btnArray = [{
				title: "注销当前账号"
			}, {
				title: "直接关闭应用"
			}];
			plus.nativeUI.actionSheet({
				cancel: "取消",
				buttons: btnArray
			}, function(event) {
				var index = event.index;
				switch (index) {
					case 1:
						app.setState({});
						mui.openWindow({
							url: 'login.html',
							id: 'login',
							show: {
								aniShow: 'pop-in'
							},
							waiting: {
								autoShow: false
							}
						});
						break;
					case 2:
						plus.runtime.quit();
						break;
				}
			});
		}, false);
			
			var btn = document.getElementById("submit1");
			//监听点击事件
			btn.addEventListener("tap",function () {
				var title=document.getElementById('title');
				title.innerHTML="卡包";	
				document.getElementById('icon-plus').style.display="none";
				mui('#offCanvasContentScroll').scroll({
					deceleration: 0.0006
				}).scrollTo(0,0,100);
			});
			mui.trigger(btn,'tap');
			//触发submit按钮的点击事件
			var btn = document.getElementById("submit2");
			//监听点击事件
			btn.addEventListener("tap",function () {
				var title=document.getElementById('title');
				title.innerHTML="仓库";
				document.getElementById('icon-plus').style.display="none";
				mui('#offCanvasContentScroll').scroll({
					deceleration: 0.0006
				}).scrollTo(0,0,100);				
			});
			//触发submit按钮的点击事件
			var btn = document.getElementById("submit3");
			//监听点击事件
			btn.addEventListener("tap",function () {
				var title=document.getElementById('title');
				title.innerHTML="好友";
				var plus=document.getElementById('icon-plus');
				plus.style.display="block";				
				mui('#offCanvasContentScroll').scroll({
					deceleration: 0.0006
				}).scrollTo(0,0,100);				
				var v = app.getFriend();
			});
			
//			var friendView = document.getElementById('offCanvasContentScroll');
//			friendView.addEventListener('swipedown',function(){
//				mui.alert("乡下");
//				var v = app.getFriend();
//			})
			
			mui('#hahaa').on('swipeleft','.friend-cell',function(){
				$(this).find('.delete').css('background-color','red');
				if(this.firstChild.firstChild.lastChild.tag!="1"){
					this.firstChild.firstChild.lastChild.innerHTML+='<h4 style="color: white;font-weight:300;">&nbsp;&nbsp;删除</h4>';
					this.firstChild.firstChild.lastChild.tag=1;
				}
//				$(this).find('.mui-table-cell').css('left','-17%');
				$(this).find('.mui-table-cell').animate({left:'-17%'},500);
			})
			
			mui('#hahaa').on('swiperight','.friend-cell',function(event){
//				var offCanvasInner = offCanvasWrapper[0].querySelector('.mui-inner-wrap');
//				offCanvasInner.addEventListener('drag', function(event) {
//				    event.stopPropagation();
//				});
				$(this).find('.delete').css('background-color','transparent');
				if(this.firstChild.firstChild.lastChild.tag!="0"){
					this.firstChild.firstChild.lastChild.lastChild.remove();
					this.firstChild.firstChild.lastChild.tag=0;
				}
				$(this).find('.mui-table-cell').animate({left:''},500);
//				
//				offCanvasInner.addEventListener('drag', function(event) {
//				    var c = event.detail,
//				    	j = "mui-active",
//				    	l = ".mui-inner-wrap";
//				    this.startX ? this.lastX = c.center.x : (this.startX = c.center.x, this.lastX = this.startX), !this.isDragging && Math.abs(this.lastX - this.startX) > this.options.dragThresholdX && ("left" === c.direction || "right" === c.direction) && (this.slideIn ? (this.scroller = this.wrapper.querySelector(l), this.classList.contains(j) ? this.offCanvasRight && this.offCanvasRight.classList.contains(j) ? (this.offCanvas = this.offCanvasRight, this.offCanvasWidth = this.offCanvasRightWidth) : (this.offCanvas = this.offCanvasLeft, this.offCanvasWidth = this.offCanvasLeftWidth) : "left" === c.direction && this.offCanvasRight ? (this.offCanvas = this.offCanvasRight, this.offCanvasWidth = this.offCanvasRightWidth) : "right" === c.direction && this.offCanvasLeft ? (this.offCanvas = this.offCanvasLeft, this.offCanvasWidth = this.offCanvasLeftWidth) : this.scroller = null) : this.classList.contains(j) ? "left" === c.direction ? (this.offCanvas = this.offCanvasLeft, this.offCanvasWidth = this.offCanvasLeftWidth) : (this.offCanvas = this.offCanvasRight, this.offCanvasWidth = this.offCanvasRightWidth) : "right" === c.direction ? (this.offCanvas = this.offCanvasLeft, this.offCanvasWidth = this.offCanvasLeftWidth) : (this.offCanvas = this.offCanvasRight, this.offCanvasWidth = this.offCanvasRightWidth), this.offCanvas && this.scroller && (this.startX = this.lastX, this.isDragging = !0, a.gestures.session.lockDirection = !0, a.gestures.session.startDirection = c.direction, this.offCanvas.classList.remove(k), this.scroller.classList.remove(k), this.offsetX = this.getTranslateX(), this._initOffCanvasVisible())), this.isDragging && (this.updateTranslate(this.offsetX + (this.lastX - this.startX)), c.gesture.preventDefault(), b.stopPropagation());		
//				});
			})
			
			mui('#hahaa').on('tap','.delete',function(){
				this.parentNode.parentNode.parentNode.style.display="none";
				var name = this.previousSibling.firstChild.firstChild.innerHTML;
				var v = app.delFriend(name);
			})
			
			mui('#hahaa').on('input','.mui-input-clear',function(){
				mui(".friend-cell").each(function(){
					var obj = this;
					obj.style.display="block";
				})
				var content = this.value;
				var len = content.length;
				mui(".friend-cell").each(function(){
					var obj = this;
					if(obj.innerText.trim().substring(0,len) != content){
						obj.style.display="none";
					}
				})
			})
			
			mui('#hahaa').on('blur','.mui-input-clear',function(){
				mui(".friend-cell").each(function(){
					var obj = this;
					obj.style.display="block";
				})
			})
			
			document.getElementById('pigu').addEventListener('tap',function(){
				mui.openWindow({
				    url: 'high1.html', 
				    id:'high1'
				  });
				  plus.screen.lockOrientation("landscape-primary");
				  plus.navigator.setFullscreen(true);
			})
			
			