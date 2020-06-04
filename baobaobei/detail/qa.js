$(function () {
	if (parseInt(GetQueryString('apiType')) == 0) {
		window.__api = 'https://dev.jeezero.com:18980/jeezero-boblbee-app/';//开发
	} else if (parseInt(GetQueryString('apiType')) == 1) {
		window.__api = 'https://beta.jeezero.com:18980/jeezero-boblbee-app/';//仿真
	} else {
		window.__api = 'https://boblbee.superpapa.com.cn/jeezero-boblbee-app/';//正式
	}

	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	}
	$('.close').click(function () {
		$('.download-app').hide()
		$('.pad-bottom').css({
			height: "1rem"
		})
	})
	var question_id = GetQueryString('question_id');
	// var question_id = 21;

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
	setTimeout(function () {
		document.querySelector("body").style.visibility = "visible"
		document.querySelector("html").style.visibility = "visible"
	}, 100);
	$.ajax({
		async: false,
		type: 'get',
		url: __api + 'v1/questionReply/getQuestionDetail',
		headers: {
			appname: "boblbee",
			"Access-Control-Allow-Origin": "*",
			'devicePlatform': 3
		},
		data: {
			questionId: question_id
		},
		success: function (res) {
			console.log(res)
			$('.head-portrait').attr('src', res.data.userAvatar)
			$('.name').html(res.data.userName)
			$('.oauth-desc').html(res.data.oauthIntro)
			$('.question-text').html(res.data.title)
			var imgHtml = '';
			res.data.attachment.forEach(function (el) {
				imgHtml += `<img src=${el.url} onclick="download()" class='img'>`
			})
			var imgsWidth = res.data.attachment.length * 1.8
			$('.imgs-box').css({
				width: imgsWidth + 'rem'
			})
			$('.question-box .imgs-box').html(imgHtml)
			$('.answer-count').html(res.data.answerNum + '个回答')
		},
		error: function (err) {
			console.log(err)
			$('#app').hide()
		}
	})
	$.ajax({
		async: false,
		type: 'get',
		url: __api + 'v1/questionReply/getOneQuestionReplyList',
		headers: {
			appname: "boblbee",
			"Access-Control-Allow-Origin": "*"
		},
		data: {
			questionId: question_id,
			ctime: parseInt(Date.now()),
			offset: 0,
			total: 20
		},
		success: function (res) {
			console.log(res)
			var commentHtml = '';
			res.data.forEach(function (el) {
				commentHtml +=
					`<div class="comment-box" onclick="download()">
				<div class="flex" style="margin-bottom: .2rem;">
					<img src="${el.userAvatar}" class="head-portrait">
					<div>
						<div class="name bold">${el.userName}</div>
						<div class="oauth-desc">${el.oauthIntro}</div>
					</div>
				</div>
				<div>
					<div class="sigle-line-text-2">
						${el.content}
					</div>
				</div>
			</div>`
			})
			$('.comments').html(commentHtml)
		},
		error: function (err) {
			console.log(err)
			$('#app').hide()
		}
	})

})
