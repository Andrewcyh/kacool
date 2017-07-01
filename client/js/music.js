
			(function($, doc) {
				$.init();
				$.plusReady(function() {
					var addPage = $.preload({
						"id": 'music',
						"url": 'music.html'
					});
					//添加好友
					var musicButton = document.getElementById('music');
					musicButton.addEventListener('tap', function(event) {
						$.openWindow({
							id: 'music',
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
				
				$.plusReady(function() {
					var addPage = $.preload({
						"id": 'moremusic',
						"url": 'moremusic.html'
					});
					
					var moremusicButton = document.getElementById('moremusic');
					moremusicButton.addEventListener('tap', function(event) {
						$.openWindow({
							id: 'moremusic',
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
			
			mui('.mui-card').on('tap','.play-button',function(){
				alert("paly");
				var audio = this.nextElementSibling.nextElementSibling;
				if(audio.paused){
					audio.play();
					$(this).parent().animate({
						height:'300px'
					},1000);
					return;
				}
				audio.pause();
				$(this).parent().animate({
						height:'100px'
					},1000);
			})
			
			mui('#slider2').on('tap','.play-button',function(){
				var audio = this.nextElementSibling.nextElementSibling;
				if(audio.paused){
					audio.play();
					return;
				}
				audio.pause();
			})
			
