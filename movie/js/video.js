$(function() {
	var isiPad = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
	var number = 1000, inter;
	var vidName = $("#videoPlayer").attr("class");
	$('#videoPlayer').jPlayer({
		ready: function () {
			$(this).jPlayer("setMedia", {
       			m4v: "http://2minutemysteries.com/videos/" + vidName + ".m4v",
       			webmv: "http://2minutemysteries.com/videos/" + vidName + ".webmv"
      		});
		},
		supplied: "m4v, webmv",
		size: {
			width: "375px",
			height: "250px"
		},
		preload: "auto",
		backgroundColor: "#cccccc",
		cssSelector: {
			seekBar: ".videoSeek",
			playBar: ".playSeek",
			volumeBar: ".videoVolume",
			volumeBarValue: ".modVolume"
		},
		swfPath: "js/Jplayer.swf",
		cssSelectorAncestor: "#videoControls",
		canplaythrough: function () {
			$("#videoBox").css("background-image","none").removeClass("readyToLoad").addClass("readyToPlay")
		},
		loadstart: function () {
			if (!isiPad) {
				$("#videoBox").addClass("readyToLoad");
			} else {
				$("#videoBox").addClass("readyToPlay");
			}
		}
	}).toggle(function (target) {
		$(this).jPlayer("play");
		$("#videoBox").css("background-image","none").removeClass("readyToLoad").removeClass("readyToPlay");
		$(".videoPlay").addClass("videoIsPlaying");
	}, function () {
		$(this).jPlayer("pause");
		$(".videoPlay").removeClass("videoIsPlaying");
	}).bind('contextmenu', function(e){
    	e.preventDefault();
    	return false;
	});

	$(".videoPlay").click(function() {
		$("#videoPlayer").click();
	});

	$("#videoPlayer").bind($.jPlayer.event.ended, function () {
		$("#videoBox").css("background-image","none");
		$("#videoPlayer, #videoControls").fadeOut(400, function () {
			$("#choiceBox").fadeIn(400);
		});
	});

	$("#choiceSolve").click(function () {
		$("#choiceBox").fadeOut(400, function () {
			$("#quizBox").fadeIn(400, function () {
				$("#hint").show();
				number = 1000;
				inter = window.setInterval(function () {
					number = number - 25;
					$("#pointCounter").text(number + " points");
					if (number === 0) {
						window.clearInterval(inter);
					}
				}, 500);
			});
		});
	});

	$("#choiceReplay").click(function () {
		$("#choiceBox").fadeOut(400, function () {
			$("#videoPlayer, #videoControls").fadeIn(400, function () {
				$("#videoPlayer").jPlayer("setMedia", {
       				m4v: "http://2minutemysteries.com/videos/" + vidName + ".m4v",
       				webmv: "http://2minutemysteries.com/videos/" + vidName + ".webmv"
      			}).click();
      			$("#videoBox").css("background-image","none");
			});
		});
	});
	
	$("ul li").click(function () {
		$(this).parent().find(".selected").removeClass("selected");
		$(this).addClass("selected");
	});

	$("#submitQuiz").click(function () {
		var truths = [];
		if ($(".selected").length !== 2) {
			$(".error").text("You must select answers for both questions!");
			return false;
		} else {
			window.clearInterval(inter);
			if ($("#question1 li").eq(checker[0]).hasClass("selected")) {
				truths.push(true);
			}
			if ($("#question2 li").eq(checker[1]).hasClass("selected")) {
				truths.push(true);
			}
			if (truths.length === 2) {
				$(".twPost").attr("data-text","I just scored " + number + " points for solving http://www.2MinuteMysteries.com – " + wcase + ". Can you beat it?");
				$.getScript("http://platform.twitter.com/widgets.js");
      			$("#quizBox, #hint").fadeOut(400, function () {
      				$("#videoPlayer, #videoControls").fadeIn(400, function () {
						$("#videoPlayer").jPlayer("setMedia", {
       						m4v: "http://2minutemysteries.com/videos/" + vidName + "_solution.m4v",	
       						webmv: "http://2minutemysteries.com/videos/" + vidName + "_solution.webmv"
      					}).click();
      					$("#videoPlayer").unbind($.jPlayer.event.ended);
      					$("#videoPlayer").bind($.jPlayer.event.ended, initiateEnding);

					});
      			});
			} else {
				number = 0;
				$(".twPost").attr("data-text","I just scored " + number + " points for solving http://www.2MinuteMysteries.com – " + wcase + ". Can you beat it?");
				$.getScript("http://platform.twitter.com/widgets.js");
				$("#quizBox, #hint").fadeOut(400, function () {
      				$("#videoPlayer, #videoControls").fadeIn(400, function () {
						$("#videoPlayer").jPlayer("setMedia", {
       						m4v: "http://2minutemysteries.com/videos/incorrect.m4v",
       						webmv: "http://2minutemysteries.com/videos/incorrect.webmv"
      					}).click();
      					$("#videoPlayer").unbind($.jPlayer.event.ended);
      					$("#videoPlayer").bind($.jPlayer.event.ended, initiateEnding);
					});
      			});
			}
			return false;
		}
	});

	$(".revealer").click(function () {
		$(".revealed").css("display","block");
		$(this).hide();
	});

	$(".fbPost").click(postToFeed);

	var initiateEnding = function () {
		$("#videoPlayer, #videoControls").fadeOut(400, function () {
			$("#pointNumber").text(number);
			window.pointTotal = number;
			$("#endingBox").fadeIn(400)
					});
	};


});