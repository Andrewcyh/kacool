
			(function($, doc) {
				$.init();
				
				$.plusReady(function() {
					var settingPage = $.preload({
						"id": 'writing',
						"url": 'writing.html'
					});
					//编辑
					var settingButton = doc.getElementById('writing');
					settingButton.addEventListener('tap', function(event) {
						$.openWindow({
							id: 'writing',
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
			
			// 获取节点
//		  var block = document.getElementById("block");
//		  var oW,oH;
//		  // 绑定touchstart事件
//		  block.addEventListener("touchstart", function(e) {
//			   console.log(e);
//			   var touches = e.touches[0];
//			   oW = touches.clientX - block.offsetLeft;
//			   oH = touches.clientY - block.offsetTop;
//			   //阻止页面的滑动默认事件
//			   document.addEventListener("touchmove",defaultEvent,false);
//		  },false)
//		 
//		  block.addEventListener("touchmove", function(e) {
//			   var touches = e.touches[0];
//			   var oLeft = touches.clientX - oW;
//			   var oTop = touches.clientY - oH;
//			   if(oLeft < 0) {
//			    oLeft = 0;
//			   }else if(oLeft > document.documentElement.clientWidth - block.offsetWidth) {
//			    oLeft = (document.documentElement.clientWidth - block.offsetWidth);
//			   }
//			   block.style.left = oLeft + "px";
//			   block.style.top = oTop + "px";
//		  },false);
//		   
//		  block.addEventListener("touchend",function() {
//		   		document.removeEventListener("touchmove",defaultEvent,false);
//		  },false);
//		  
//		  block.addEventListener("gesturechange",function(ev){
//		  	block.style.transform="scale(" + ev.scale  + ")" + " rotate(" + ev.rotation + "deg)";
//		  })
//		  
//		  function defaultEvent(e) {
//		   		e.preventDefault();
//		  }
			
		var pic = document.getElementById("newpic");
		pic.addEventListener("tap",function(){
			galleryImg();
		})
		
		var count = 0;
		var page = document.getElementById("color");
		
		function galleryImg() {
				plus.gallery.pick(function(a) {
					plus.io.resolveLocalFileSystemURL(a, function(entry) {
						plus.io.resolveLocalFileSystemURL("_doc/", function(root) {
							root.getFile("head.jpg", {}, function(file) {
								//文件已存在
								file.remove(function() {
									console.log("file remove success");
									entry.copyTo(root, 'head.jpg', function(e) {
											var e = e.fullPath + "?version=" + new Date().getTime();
											
											$(".active-page").append('<div ><a href="#choice' + count + '"><img class="block" src="' + e + '"/></a><div id="choice' + count + '" class="mui-popover popover"><ul class="mui-table-view"><li class="mui-table-view-cell delete-item" ><a href="#" >删除</a></li><li class="mui-table-view-cell" ><a href="#" >喝地</a></li></ul></div></div>');
											document.getElementById("choice" + count).firstChild.firstChild.addEventListener('tap',function(){
												var obj = this.parentNode.parentNode.parentNode.parentNode;
												obj.removeChild(this.parentNode.parentNode.parentNode);
												$('.mui-backdrop')[0].remove();
											})
											count++;
											
											//变更大图预览的src
											//目前仅有一张图片，暂时如此处理，后续需要通过标准组件实现
											document.querySelector("#__mui-imageview__group .mui-slider-item img").src = e + "?version=" + new Date().getTime();;
										},
										function(e) {
											console.log('copy image fail:' + e.message);
										});
								}, function() {
									console.log("delete image fail:" + e.message);
								});
							}, function() {
								//文件不存在
								entry.copyTo(root, 'head.jpg', function(e) {
										var path = e.fullPath + "?version=" + new Date().getTime();
										document.getElementById("head-img1").src = path;
										//变更大图预览的src
										//目前仅有一张图片，暂时如此处理，后续需要通过标准组件实现
										document.querySelector("#__mui-imageview__group .mui-slider-item img").src = path;
									},
									function(e) {
										console.log('copy image fail:' + e.message);
									});
							});
						}, function(e) {
							console.log("get _www folder fail");
						})
					}, function(e) {
						console.log("读取拍照文件错误：" + e.message);
					});
				}, function(a) {}, {
					filter: "image"
				})
			};
		
		// 获取节点
		var content = document.getElementById("page-content");
		var oW, oH;
		var dragging = true;
		var dragH = false;
		var hori = "right";
		var veti = "down";

 
		// 绑定touchstart事件
		mui('#writing').on('touchstart', '.block', function(e) {
			
			var touches = e.touches[0];
			oW = touches.clientX - this.offsetLeft;
			oH = touches.clientY - this.offsetTop;
			if(oW > 10 && oW < (this.offsetWidth - 10) && oH > 10 && oH < (this.offsetHeight - 10)) {
				dragging = true;
			} else {
				dragging = false;
				if(oH > 10 && oH < (this.offsetHeight - 10)) {
					dragH = true;
					if(oW <= 10) hori = "left";
					if(oW >= (this.offsetWidth - 10)) hori = "right";
				} else {
					dragH = false;
					if(oH <= 10) veti = "up";
					if(oH >= (this.offsetHeight - 10)) veti = "down";
				}
			}
			//阻止页面的滑动默认事件
			document.addEventListener("touchmove", defaultEvent, false);
		})

		mui('#writing').on('touchmove', '.block', function(e) {
			var touches = e.touches[0];
			var oLeft = touches.clientX - oW;
			var oTop = touches.clientY - oH;
			if(dragging) {
				if(oLeft < 0) {
					oLeft = 0;
				} else if(oLeft > document.documentElement.clientWidth - this.offsetWidth) {
					oLeft = (document.documentElement.clientWidth - this.offsetWidth);
				}
				this.style.left = oLeft + "px";
				this.style.top = oTop + "px";
			} else {
				if(dragH) {
					oW = touches.clientX - this.offsetLeft;
					if(hori == "right") this.style.width = oW + "px";
					else {
						this.style.width = this.offsetWidth - oW + "px";
						this.style.left = touches.clientX + "px";
					}
				} else {
					oH = touches.clientY - this.offsetTop;
					if(veti == "down") this.style.height = oH + "px";
					else {
						this.style.height = this.offsetHeight - oH + "px";
						this.style.top = touches.clientY + "px";
					}
				}
			}
		})

		mui('#writing').on('touchend', '.block', function() {
			var color = this.parentNode.parentNode.lastElementChild;
			color.style.marginLeft = this.offsetLeft + this.offsetWidth/2 + "px";
			color.style.marginTop = this.offsetTop + this.offsetHeight/2 + "px";
//			alert(this.id);
			document.removeEventListener("touchmove", defaultEvent, false);
		})
		

		mui('#writing').on('gesturechange', '.block', function(ev) {
			this.style.transform = "scale(" + ev.scale + ")" + " rotate(" + ev.rotation + "deg)";
		})

		function defaultEvent(e) {
			e.preventDefault();
		}
		 
		mui('.mui-popover').on('tap','.mui-table-view-cell',function(){
			var popover = this.parentNode.parentNode;
			mui(popover).popover('toggle');
		})
		
		mui('.mui-popover').on('tap','.thumb',function(){
			var popover = this.parentNode.parentNode.parentNode.parentNode;
			mui(popover).popover('toggle');
		})
		
		mui('.mui-popover').on('tap','.delete-item',function(){
			$(this).parent().parent().parent().remove();
		})
		
		mui('.mui-popover').on('longtap','.thumb',function(){
			alert("delete");
			var chosenPageNum = $(this).attr('id');
			$(document.getElementById("page"+chosenPageNum)).remove();
			$(document.getElementById(chosenPageNum)).remove();
		})
		
		mui('.mui-popover').on('tap','.thumb',function(){
			var chosenPageNum = $(this).attr('id');
			var before = $(".active-page").attr('id');
			var obj = document.getElementById("page"+$(this).attr('id'));
			$(".active-page").removeClass('active-page');
			$(obj).addClass('active-page');
			$('#writing').children(":last").after(obj);
			var temp = currentPage;
			
			html2canvas(document.getElementById("page" + temp), {
				allowTaint: true,
				taintTest: false,
				onrendered: function(canvas) {
					if(pageCount == temp) {
						//生成base64图片数据 
						var dataUrl = canvas.toDataURL();
						var newImg = document.createElement("img");
						newImg.src = dataUrl;
						if($(document.getElementById("page"+temp)).hasClass("video-page")) 
						newImg.src="images/play.jpg";
						newImg.style.width = "96px";
						newImg.style.height = "160px";
						newImg.style.display = "inline";
						newImg.style.float = "left";
						newImg.style.marginRight = "10px";
						$(newImg).addClass('thumb').attr('id', temp);
						if(pageCount > 2) {
							$(thumbnail).width((pageCount + 2) * $(newImg).width());
						}
						if(!document.getElementById(temp)){
							thumbnail.appendChild(newImg);
						}
					}else if(temp < pageCount){
						var dataUrl = canvas.toDataURL();
						document.getElementById(temp).src = dataUrl;
						if($(document.getElementById("page"+temp)).hasClass("video-page")) 
						document.getElementById(temp).src="images/play.jpg";
					}
				}
			});
			currentPage = chosenPageNum;
			
			if($(obj).hasClass('video-page') && btnTag == "txt"){
				$(cardadd).toggle();
				$(videoadd).toggle();
				btnTag = "vdo";
			}
			
			if($(obj).hasClass("card-page")&&btnTag == "vdo"){
				$(cardadd).toggle();
				$(videoadd).toggle();
				btnTag = "txt";
			}	
			
		})
		
		
		var txt = document.getElementById("newtxt");
		txt.addEventListener('tap',function(){
			$(".active-page").append('<div><a href="#choice' + count + '"><textarea class="block"></textarea></a><div id="choice' + count + '" class="mui-popover popover"><ul class="mui-table-view"><li class="mui-table-view-cell delete-item" ><a href="#" >删除</a></li><li class="mui-table-view-cell" ><a href="#" >喝地</a></li></ul></div></div>');
			document.getElementById("choice" + count).firstChild.firstChild.addEventListener('tap',function(){
				var obj = this.parentNode.parentNode.parentNode.parentNode;
				obj.removeChild(this.parentNode.parentNode.parentNode);
				$('.mui-backdrop')[0].remove();
			})
			count++;
		})
		
		
				
		