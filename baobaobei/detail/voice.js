$(function () {
	if (parseInt(GetQueryString('apiType')) == 0) {
		window.__api = 'https://dev.jeezero.com:8980/jeeplus-boblbee-app/'; //开发
	} else if (parseInt(GetQueryString('apiType')) == 2) {
		window.__api = 'https://boblbee.superpapa.com.cn/jeeplus-boblbee-app/'; //正式
	}
	// window.__api = 'https://dev.jeezero.com:8980/jeeplus-boblbee-app/';

	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	}

	if (GetQueryString('request_type')) {
		$('.fixed-bottom').css({
			'display': 'flex'
		})
		$('.pad-bottom').css({
			'display': 'flex'
		})
	}
	$('.close').click(function () {
		$('.fixed-bottom').hide()
	})
	var voice_id = GetQueryString('voice_id');
	// var voice_id = "32ef7e4721954894b9291997e0288085";


	function size() {
		var html = document.querySelector('html');
		html.style.fontSize = document.body.clientWidth / 7.5 + 'px';
	}
	size();
	window.onresize = size;
	setTimeout(function () {
		document.querySelector("body").style.visibility = "visible"
		document.querySelector("html").style.visibility = "visible"
	}, 100);
	$.ajax({
		async: false,
		type: 'get',
		url: __api + 'v1/sound/get',
		header: {
			appname: "boblbee",
			"Access-Control-Allow-Origin": "*"
		},
		data: {
			id: voice_id
		},
		success: function (res) {
			console.log(res)
			if (res.code == -1) {
				$('#app').hide()
				return
			}
			$('.sound-thumb').css({
				"background-image": `url(${res.data.audioInfo.thumbnail})`
			})
			$('.sound-name').text(res.data.soundName)
			$('.sound-audio').html(`<audio src="${res.data.audioInfo.url}" controls>
				  您的浏览器不支持音频播放。
					</audio>`)
			// 分享功能
			$.ajax({
				async: false,
				type: 'get',
				url: 'https://boblbee.superpapa.com.cn/jeezero-boblbee-app/v1/other/getWechatH5Config',
				data: {
					url: window.location.href.split('#')[0]
				},
				success: function (ds) {
					var result = ds.data;
					if (!!result) {
						wx.config({
							debug: false,
							appId: result.appid,
							timestamp: result.timestamp,
							nonceStr: result.nonceStr,
							signature: result.signature,
							jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
						});
						var shareData = {
							title: "发现一个启蒙好工具",
							desc: "宝宝声音启蒙，简直是宝宝早教的声音博物馆，快点来听听～～",
							link: window.location.href,
							imgUrl: "https://s1.ax1x.com/2020/04/18/JedMmF.png"
						}
						wxShare(shareData)
					}
				},
				error: function (e) {
					console.log(e)
				}
			});
		},
		error: function (err) {
			console.log(err)
			$('#app').hide()
		}
	})


})