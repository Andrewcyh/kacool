
			(function($, doc) {
				$.init();
				
				$.plusReady(function() {
					var addPage = $.preload({
						"id": 'add',
						"url": 'add.html'
					});
					//添加好友
					var addButton = document.getElementById('add');
					addButton.addEventListener('tap', function(event) {
						$.openWindow({
							id: 'add',
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
				});
			}(mui, document));
			
			mui('.mui-scroll-wrapper').scroll({
					deceleration: 0.0006 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
				});
				//
				//触发submit按钮的点击事件
//				var slider = mui("#slider");
//	
//				slider.slider({
//					interval: 1000
//				});
			
			//获得search值
			var search = document.getElementById('searchf');
			search.addEventListener('input',function(){
				console.log(this.value);
				var query = app.queryPerson(this.value);
			});
			
			var ab = document.getElementById('addBtn');
			ab.addEventListener("tap",function(){
				this.style.opacity=0.65;
				this.innerText="已添加";
			});
			
			var abs = document.getElementsByClassName('addBtn');
			mui("#content").on('tap','.addBtn',function(){
				if(this.innerText == '添加'){
					this.style.opacity=0.65;
					this.innerText="已添加";
					var result = this.parentNode.previousSibling.firstChild.firstChild;
					var data = app.addFriend(result.innerHTML);
					console.log(data);
				}else if(this.innerText="已添加"){
					this.style.opacity=1;
					this.innerText="添加";
				}
			})
			
			