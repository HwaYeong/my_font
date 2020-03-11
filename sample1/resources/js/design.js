$(function(){

	// HTTP프로토콜 HTTPS로 변경
    if (location.protocol == 'http:') {
//        location.replace(location.href.replace('http:', 'https:'));
    }
    
	//gnb & lnb
	var gnbCrt1 = $("#gnb>li:nth-child(" + (gnbDep1) + ")");
	var lnbCrt1 = $("#lnb>li:nth-child(" + (lnbDep1) + ")>a");
	var lnbCrt2 = $("#lnb>li:nth-child(" + (lnbDep1) + ")>ul>li:nth-child(" + (lnbDep2) + ")>a");
	var lnbCrt3 = $("#lnb>li:nth-child(" + (lnbDep1) + ")>ul>li:nth-child(" + (lnbDep2) + ") ul li:nth-child(" + (lnbDep3) + ") a" );
	if(gnbCrt1) gnbCrt1.addClass("on");
	if(lnbCrt1) lnbCrt1.addClass("on").next("ul").slideDown(0);
	if(lnbCrt2) lnbCrt2.addClass("on");
	if(lnbCrt3) lnbCrt3.addClass("on");
	$("#lnb ul").siblings("a").parent().addClass("child");
	$("#lnb a").click(function(){
		if($(this).parent().hasClass("child")){
			$(this).toggleClass("on").next("ul").slideToggle(200);
			$("#lnb>.child>a").not(this).removeClass("on").next("ul").slideUp(200);
			return false;
		};
	});
	$("nav").mouseleave(function(){
		if(lnbCrt1) lnbCrt1.addClass("on").next("ul").slideDown(200);
		$("#lnb>.child>a").not(lnbCrt1).removeClass("on").next("ul").slideUp(200);
	});

	//title
	if(title == 0) {
		if(gnbDep1 == 0) {
		} else{
			$("hgroup p").append("<span>"+ gnbCrt1.text() +"</span>");
		}
		if(lnbDep1 == 0) {
		} else{
			$("hgroup h3").text(lnbCrt1.text());
			$("hgroup p").append("<span>"+ lnbCrt1.text() +"</span>");
		}
		if(lnbDep2 == 0) {
		} else{
			$("hgroup h3").text(lnbCrt2.text());
			$("hgroup p").append("<span>"+ lnbCrt2.text() +"</span>");
		}
		if(lnbDep3 == 0) {
		} else{
			$("hgroup h3").text(lnbCrt3.text());
			$("hgroup p").append("<span>"+ lnbCrt3.text() +"</span>");
		}
	} else {
		$("hgroup h3").text(title);
		$("hgroup p").append("<span>"+ title +"</span>");
	}
/*
	if ($("#contents").offset()) {
		$(window).scroll(function() {
			var fix = $("#contents").offset().top - $(window).scrollTop();
			if(fix <= 15) {
				$("nav").addClass("fixed");
			} else{
				$("nav").removeClass("fixed");
			};
		});
	}
*/
	//pop
	$(".pop_close").click(function(){
		$(this).parents(".pop_wrap").fadeOut(200);
		return false;
	});

	// 트리메뉴
	$(".tree_list>button").click(function(){
		$(".tree_list").fadeOut(100);
		return false;
	});
	
	FuncSetNotifyTreeList();
});

//트리메뉴
function FuncSetNotifyTreeList() {
	$(".tree_list li:last-child").addClass("last");
	$(".tree_list li ul").addClass("depth2").parent("li").addClass("child").children("a").after("<button>열림</button>");
	$(".tree_list li.child>button").click(function(){
		$(this).toggleClass("on").next("ul").slideToggle(200);
		if($(this).parents("ul").hasClass("depth2")) {
		} else {
			$(".tree_list li.child>button").not(this).removeClass("on").next("ul").slideUp(200);
		}
		return false;
	});
}

/**
 * 레이어 팝업 표시
 * 
 * @param id			레이어 ID
 * @param url			호출할 URL(GET)
 * @param callback	콜백함수명(ex : "FuncPopCallback"), 레이어에서 callback 함수 호출 시 json 으로 결과를 전달
 */
function FuncPopShow(id, url, callback) {
	// 파라미터에 레이어 ID 와 callback 을 자동으로 추가
	url = url + ((url.indexOf("?") > 0)?  "&pLID=" : "?pLID=") + id;
	if (callback != "" && callback != undefined) {
		url = url + "&pCallback=" + callback;
	}
	
	MF_ShowLoading();
	
	MF_RequestByURL(url, null, function(response) {
		MF_HideLoading();
		
		$("#" + id).html(response);
		$("#" + id).show();

		pop_margin(id);
	}, MF_ErrorAlert);
}

/**
 * 레이어 팝업 표시
 * 
 * @param id			레이어 ID
 * @param form		실행할 FORM(POST)
 * @param callback	콜백함수명(ex : "FuncPopCallback"), 레이어에서 callback 함수 호출 시 json 으로 결과를 전달
 */
function FuncPopShowByForm(id, form, callback) {
	// 파라미터에 레이어 ID 와 callback 을 자동으로 추가
	var url = $(form).attr("action");
	url = url + ((url.indexOf("?") > 0)?  "pLID=" : "?pLID=") + id;
	if (callback != "" && callback != undefined) {
		url = url + "&pCallback=" + callback;
	}
	$(form).attr("action", url);
	
	MF_ShowLoading();
	
	MF_RequestByForm($(form), null, function(response) {
		MF_HideLoading();
		
		$("#" + id).html(response);
		$("#" + id).show();

		pop_margin(id);
	}, MF_ErrorAlert);
}

// 레이어 팝업 숨김
function FuncPopHide(id) {
	$("#" + id).fadeOut(100);
}

// 팝업 사이즈 조절
function pop_margin(id) {
	$("#" + id + " .pop_ct").each(function(){
		var mt = $(this).outerHeight();
		$(this).css("margin-top",-mt/2);
	});
}