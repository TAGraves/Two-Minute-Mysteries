$(function() {
	var number = 1000, inter;
	var vidName = $("#videoPlayer").attr("class");
	$('#videoPlayer').jPlayer({
		ready: function () {
			$(this).jPlayer("setMedia", {
       			m4v: "http://2minutemysteries.com/videos/bankrobberintro.m4v",
       			webmv: "http://2minutemysteries.com/videos/bankrobberintro.webmv"
      		});
		},
		supplied: "m4v, webmv",
		size: {
			width: "750px",
			height: "500px"
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
			$("#videoBox").addClass("readyToPlay");
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
	var currentScore = 1000;
	var actions = {
		showBankRobber: function () {
			$('#videoPlayer').jPlayer("play");
			window.setTimeout(function() {
				actions.bankRobberPoints();
			}, 68000);
		},
		updatePoints: function () {
			$("#pointsWrap h1").text(currentScore);
		},
		bankRobberPoints: function () {
			window.setTimeout(actions.bankRobberConclusion, 30000);
			$('#videoPlayer').jPlayer( "stop" ).jPlayer("setMedia", {
       			m4v: "http://2minutemysteries.com/videos/bankrobberintro_solution.m4v",
       			webmv: "http://2minutemysteries.com/videos/bankrobberintro_solution.webmv"
      		});
			$("#vidWrap").hide();
			$("#pointsWrap").show();
			currentScore = 1000;
			actions.interval = window.setInterval(function () {
				if (currentScore > 33) {
					currentScore = currentScore - 33;
					actions.updatePoints(currentScore);
				} else {
					currentScore = 0;
					actions.updatePoints(currentScore);
					window.clearInterval(actions.interval);
				}
			}, 1000);
		},
		bankRobberConclusion: function () {
			//window.setTimeout(actions.bankRobberScores, 45000);
			window.clearInterval(actions.interval);
			$("#vidWrap").show();
			$("#pointsWrap").hide();
			$('#videoPlayer').jPlayer("play");
			
		},
		bankRobberScores: function () {
			window.setTimeout(actions.ransomQuiz, 104000);
			$("#waiting_for_conclusion").hide();
			$("#pointUpdate").show();
		},
		ransomQuiz: function () {
			window.setTimeout(actions.ransomConclusion, 30000);
			finished = false;
			$("#pointUpdate").hide();
			$("#ransom_quiz").show();
			currentScore = 1000;
			actions.interval = window.setInterval(function () {
				if (currentScore > 0) {
					currentScore = currentScore - 33;
				}
			}, 1000);
		},
		ransomConclusion: function () {
			window.setTimeout(actions.ransomScores, 32000);
			if (finished === false) {
				window.clearInterval(actions.interval);
				currentScore = 0;
				$("#ransom_quiz").hide();
				$("#waiting_for_conclusion").show();
				actions.updatePoints();
			}
		},
		ransomScores: function () {
			window.setTimeout(actions.womQuiz, 80000);
			$("#waiting_for_conclusion").hide();
			$("#pointUpdate").show();
		},
		womQuiz: function () {
			window.setTimeout(actions.womConclusion, 30000);
			finished = false;
			$("#pointUpdate").hide();
			$("#wom_quiz").show();
			currentScore = 1000;
			actions.interval = window.setInterval(function () {
				if (currentScore > 0) {
					currentScore = currentScore - 33;
				}
			}, 1000);
		},
		womConclusion: function () {
			window.setTimeout(actions.womScores, 32000);
			if (finished === false) {
				window.clearInterval(actions.interval);
				currentScore = 0;
				$("#wom_quiz").hide();
				$("#waiting_for_conclusion").show();
				actions.updatePoints();
			}
		},
		womScores: function () {
			$("#waiting_for_conclusion").hide();
			$("#totalScore").show();
		}

	};

window.setTimeout(function() {
		actions.showBankRobber();
}, 5000);


});