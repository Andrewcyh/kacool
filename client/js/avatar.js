			(function($, doc) {
				$.init();
			
				$.plusReady(function() {
					var addPage = $.preload({
						"id": 'avatar',
						"url": 'avatar.html'
					});
					//添加好友
					var avatarBtn = document.getElementById('img_src');
					avatarBtn.addEventListener('tap', function(event) {
						$.openWindow({
							id: 'avatar',
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
			
			
			
			setTimeout(function() {
				defaultImg();
			}, 500);
			
			
			
			function defaultImg() {
				if(mui.os.plus) {
					plus.io.resolveLocalFileSystemURL("_doc/head.jpg", function(entry) {
						var s = entry.fullPath + "?version=" + new Date().getTime();;
						document.getElementById("head-img0").src = s;
					}, function(e) {
						document.getElementById("head-img0").src = './images/kenan.png';
					})
				} else {
					document.getElementById("head-img0").src = './images/kenan.png';
				}
				document.getElementById("head-img0").style.marginLeft = "-60px";
			}
			
			var canvas = document.createElement("canvas");
			var ctx = canvas.getContext('2d');
			
			//    瓦片canvas
			var tCanvas = document.createElement("canvas");
			var tctx = tCanvas.getContext("2d");
			
			var maxsize = 100 * 1024;
			
			var filechooser = document.getElementById("addpic");
			
			var url = app.gethost() + "/user/head/upload";
			
//			function cutImg(){  
			var cutImg = function(){ 
				 $("#showEdit").fadeIn();
			    var $image = $('#report > img');
//				var $image = $('#head-img0');
//				var bgsrc = document.getElementById("ok").style.backgroundImage;
//				document.getElementById("head-img1").style.src = bgsrc.substring(4,bgsrc.length - 5);
			    $image.cropper({
			      aspectRatio: 1 / 1,
			      autoCropArea: 0.8
			    });
			    $("#ok").show();
			    document.getElementById("showEdit").style.marginTop = "150px";
			}
			
			function confirm(){
				 $("#showEdit").fadeOut();
			    var $image = $('#report > img');
			    var dataURL = $image.cropper("getCroppedCanvas").toDataURL();
			     var img1 = document.getElementById("head-img0");
			     img1.src = dataURL;
			     img1.style.width = "140px";
			     document.getElementById("glass").style.backgroundImage = "url(" + dataURL + ")";
			     $("#ok").hide();
			     $("#glass").show();
				 $("#report").remove();
				 document.getElementById('head-img0').style.display = "block";
				 document.getElementById('head-img0').style.marginLeft = "28%";
				 document.getElementById('a-upload').style.display = "block";
				 document.getElementById("showEdit").style.marginTop = "0px";
				 var img = new Image();
				 img.src = dataURL;
				 if(img.complete){
				 	callback();
				 }else{
				 	img.onload = callback;
				 }
				 function callback() {
					var data = compress(img);
			
					upload(data, objFile.type, $(li));
			
					img = null;
				}
			}
			
			var li = document.createElement("li");
			
			var objFile = null;
			
			filechooser.onchange = function() {
				var files = Array.prototype.slice.call(this.files);
				files.forEach(function(file, i) {
					var reader = new FileReader();
					objFile = file;
					
					reader.onload = function() {
						$.fn.cropper();
						var result = this.result;
						
//						var img = new Image();
//						img.src = result;
						
						if(document.getElementById("report")){
							document.getElementById('head-img1').src = result;
							document.getElementById('head-img1').style.height = "200px";
						}else{
							document.getElementById("showEdit").innerHTML += '<div id="report" class="cropper-container"><img id="head-img1" src=""/></div>';
							document.getElementById('head-img1').src = result;
							document.getElementById('head-img1').style.height = "200px";
						}
						
						$("#glass").hide();
						document.getElementById('a-upload').style.display = "none";
						document.getElementById('head-img0').style.display = "none";
//						var $image = $('#report > img');
//						$image.attr("src", result);
						document.getElementById("glass").style.backgroundImage = "url(" + result + ")";
						$(li).css("background-image", "url(" + result + ")");
						cutImg();
//						if(img.complete) {
//							callback();
//						} else {
//							img.onload = callback;
//						}
			
						function callback() {
//							var data = compress(img);
			
//							upload(data, file.type, $(li));
			
							img = null;
						}
			
					};
			
					reader.readAsDataURL(file);
				})
			
			};
			//      )();
			
			function compress(img) {
				var initSize = img.src.length;
				var width = img.width;
				var height = img.height;
			
				//如果图片大于四百万像素，计算压缩比并将大小压至400万以下
				var ratio;
				if((ratio = width * height / 4000000) > 1) {
					ratio = Math.sqrt(ratio);
					width /= ratio;
					height /= ratio;
				} else {
					ratio = 1;
				}
			
				canvas.width = width;
				canvas.height = height;
			
				//        铺底色
				ctx.fillStyle = "#fff";
				ctx.fillRect(0, 0, canvas.width, canvas.height);
			
				//如果图片像素大于100万则使用瓦片绘制
				var count;
				if((count = width * height / 1000000) > 1) {
					count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
			
					//            计算每块瓦片的宽和高
					var nw = ~~(width / count);
					var nh = ~~(height / count);
			
					tCanvas.width = nw;
					tCanvas.height = nh;
			
					for(var i = 0; i < count; i++) {
						for(var j = 0; j < count; j++) {
							tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
			
							ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
						}
					}
				} else {
					console.log("未压缩的");
					ctx.drawImage(img, 0, 0, width, height);
				}
			
				//进行最小压缩
				var ndata = canvas.toDataURL('image/jpeg', 0.1);
			
				console.log('ndata: '+ndata);
				console.log('压缩前：' + initSize);
				console.log('压缩后：' + ndata.length);
				console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
			
				tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
			
				return ndata;
			}
			
			//    图片上传，将base64的图片转成二进制对象，塞进formdata上传
			function upload(basestr, type, $li) {
				var text = window.atob(basestr.split(",")[1]);
				var buffer = new Uint8Array(text.length);
				var pecent = 0,
					loop = null;
			
				for(var i = 0; i < text.length; i++) {
					buffer[i] = text.charCodeAt(i);
				}
			
				var blob = getBlob([buffer], type);
			
				var xhr = new XMLHttpRequest();
			
				var formdata = getFormData();
			
				formdata.append('imagefile', blob);
			
				//xhr.open('post', 'http://30b51117.ngrok.natapp.cn/user/head/upload');
				xhr.open('post',url);
			
				xhr.onreadystatechange = function() {
					if(xhr.readyState == 4 && xhr.status == 200) {
						var jsonData = JSON.parse(xhr.responseText);
						console.log(jsonData.status);
						var imagedata = jsonData || {};
						var text = imagedata.path ? '上传成功' : '上传失败';
			
						console.log(text + '：' + imagedata.data);
//						console.log(jsonData.path);
						clearInterval(loop);
			
						//当收到该消息时上传完毕
						$li.find(".progress span").animate({
							'width': "100%"
						}, pecent < 95 ? 200 : 0, function() {
							$(this).html(text);
						});
			
						if(!imagedata.path) return;
			
						$(".pic-list").append('<a href="' + imagedata.path + '">' + imagedata.name + '（' + imagedata.size + '）<img src="' + imagedata.path + '" /></a>');
					}
				};
			
				//数据发送进度，前50%展示该进度
				xhr.upload.addEventListener('progress', function(e) {
					if(loop) return;
			
					pecent = ~~(100 * e.loaded / e.total) / 2;
					$li.find(".progress span").css('width', pecent + "%");
			
					if(pecent == 50) {
						mockProgress();
					}
				}, false);
			
				//数据后50%用模拟进度
				function mockProgress() {
					if(loop) return;
			
					loop = setInterval(function() {
						pecent++;
						$li.find(".progress span").css('width', pecent + "%");
			
						if(pecent == 99) {
							clearInterval(loop);
							alert("99");
						}
					}, 100)
				}
			
				xhr.send(formdata);
			}
			
			/**
			 * 获取blob对象的兼容性写法
			 * @param buffer
			 * @param format
			 * @returns {*}
			 */
			function getBlob(buffer, format) {
				try {
					return new Blob(buffer, {
						type: format
					});
				} catch(e) {
					var bb = new(window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder);
					buffer.forEach(function(buf) {
						bb.append(buf);
					});
					return bb.getBlob(format);
				}
			}
			
			/**
			 * 获取formdata
			 */
			function getFormData() {
				var isNeedShim = ~navigator.userAgent.indexOf('Android') &&
					~navigator.vendor.indexOf('Google') &&
					!~navigator.userAgent.indexOf('Chrome') &&
					navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop() <= 534;
			
				return isNeedShim ? new FormDataShim() : new FormData()
			}