$(function() {
	if (parseInt(GetQueryString('apiType')) == 0) {
		window.__api = 'https://dev.jeezero.com:18980/jeezero-boblbee-app/';
	} else if (parseInt(GetQueryString('apiType')) == 1) {
		window.__api = ' http://beta.jeezero.com/jeezero-boblbee-app/';
	} else {
		window.__api = 'https://boblbee.superpapa.com.cn/jeezero-boblbee-app/';
	}
	window.__api = 'https://dev.jeezero.com:18980/jeezero-boblbee-app/';

	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	}
	$('.close').click(function() {
		$('.download-app').hide()
		$('.pad-bottom').css({
			height:"1rem"
		})
	})
	var question_id = GetQueryString('question_id');
	var question_id = 21;

	function getimgsrc(htmlstr) {
		var reg = /<img.+?src=('|")?([^'"]+)('|")?(?:\s+|>)/gim;
		var imgsrcArr = [];
		while (tem = reg.exec(htmlstr)) {
			imgsrcArr.push(tem[2]);
		}
		return imgsrcArr;
	}

	function size() {
		var html = document.querySelector('html');
		html.style.fontSize = document.body.clientWidth / 7.5 + 'px';
	}
	size();
	window.onresize = size;
	setTimeout(function() {
		document.querySelector("body").style.visibility = "visible"
		document.querySelector("html").style.visibility = "visible"
	}, 100);
	var res = {
		"code": 0,
		"message": "成功",
		"data": {
			"answerReplayList": [],
			"hitsCnt": 0,
			"oauthIntro": "",
			"userAvatar": "http://thirdqq.qlogo.cn/g?b=oidb&k=9NF4SpIC4xZHD3zncY1UhA&s=100",
			"weight": 0,
			"collectCnt": 0,
			"updateTime": 0,
			"title": "5张图啊是大实打实大撒大师的请问请问恶趣味请问请问恶趣味啊是大啊是大啊是大",
			"type": "",
			"userName": "T-.-Eric",
			"userId": 2834,
			"content": "",
			"attachment": [{
				"duration": 0,
				"thumbnail": "http://cdn.boblbee.superpapa.com.cn/8D4CF775D7DA6B982115F1FA91BE557D?imageMogr2/format/jpg/size-limit/10k!",
				"size": 197623,
				"id": 293081,
				"type": 1,
				"url": "http://cdn.boblbee.superpapa.com.cn/8D4CF775D7DA6B982115F1FA91BE557D"
			}, {
				"duration": 0,
				"thumbnail": "http://cdn.boblbee.superpapa.com.cn/13D07539E53BF62688E186A0CCED4822?imageMogr2/format/jpg/size-limit/10k!",
				"size": 176588,
				"id": 293082,
				"type": 1,
				"url": "http://cdn.boblbee.superpapa.com.cn/13D07539E53BF62688E186A0CCED4822"
			}, {
				"duration": 0,
				"thumbnail": "http://cdn.boblbee.superpapa.com.cn/E2943247F2A17F96CC1A8308DF619441?imageMogr2/format/jpg/size-limit/10k!",
				"size": 367696,
				"id": 293083,
				"type": 1,
				"url": "http://cdn.boblbee.superpapa.com.cn/E2943247F2A17F96CC1A8308DF619441"
			}, {
				"duration": 0,
				"thumbnail": "http://cdn.boblbee.superpapa.com.cn/FF391BC1FF387478BC35D50CDA868DEC?imageMogr2/format/jpg/size-limit/10k!",
				"size": 366668,
				"id": 293084,
				"type": 1,
				"url": "http://cdn.boblbee.superpapa.com.cn/FF391BC1FF387478BC35D50CDA868DEC"
			}, {
				"duration": 0,
				"thumbnail": "http://cdn.boblbee.superpapa.com.cn/67DA5998651D408B34DF39AB791849C3?imageMogr2/format/jpg/size-limit/10k!",
				"size": 317260,
				"id": 293085,
				"type": 1,
				"url": "http://cdn.boblbee.superpapa.com.cn/67DA5998651D408B34DF39AB791849C3"
			}],
			"isAnswered": true,
			"ctime": 1563841834919,
			"stick": "",
			"answerCnt": 2,
			"id": 21
		}
	}
	$('.head-portrait').attr('src', res.data.userAvatar)
	$('.name').html(res.data.userName)
	$('.oauth-desc').html(res.data.oauthIntro)
	$('.question-text').html(res.data.title)
	var imgHtml = '';
	res.data.attachment.forEach(function(el) {
		imgHtml += `<img src=${el.url} class='img'>`
	})
	console.log(imgHtml)
	var imgsWidth = res.data.attachment.length * 1.8
	$('.imgs-box').css({
		width: imgsWidth + 'rem'
	})
	$('.question-box .imgs-box').html(imgHtml)
	$('.answer-count').html(res.data.answerCnt+'个回答')
	// $.ajax({
	// 	async: false,
	// 	type: 'get',
	// 	url: __api + 'v1/questionReplay/getQuestionDetail',
	// 	header: {
	// 		// Authorization: token,
	// 		appname: "boblbee",
	// 		"Access-Control-Allow-Origin": "*"
	// 	},
	// 	data: {
	// 		questionId: question_id
	// 	},
	// 	success: function(res) {
	// 		console.log(res)
	// 	},
	// 	error: function(err) {
	// 		console.log(err)
	// 		$('#app').hide()
	// 	}
	// })


})
