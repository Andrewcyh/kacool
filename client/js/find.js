			(function($, doc) {
				$.init();
			
				$.plusReady(function() {
					var addPage = $.preload({
						"id": 'findmusic',
						"url": 'findmusic.html'
					});
					//添加好友
					var findBtn = document.getElementById('findmusic');
					findBtn.addEventListener('tap', function(event) {
						$.openWindow({
							id: 'findmusic',
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
			
			//获得search值
			var search = document.getElementById('searchm');
			search.addEventListener('input',function(){
				var query = app.queryMusic(this.value);
			});
			
			mui('#musicResult').on('tap','.play-button',function(){
				var audio = this.nextElementSibling.nextElementSibling;
				var card = this.parentElement;
				if(audio.paused){
					$(this).parent().animate({
						height:'300px'
					},1000);
					audio.play();
					return;
				}
				audio.pause();
				$(this).parent().animate({
						height:'100px'
					},1000);
			})
			