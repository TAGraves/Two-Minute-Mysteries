$(function () {
	var i = 0;
	window.setInterval(function (){
		console.log(i+= 2)
	}, 2000)
	var time = 5000;
	var currentScore = 0;
	var totalScore = 0;
	var finished = true;
	var actions = {
		updatePoints: function () {
			$(".thisPoints").text(currentScore);
			$(".totalPoints").text(totalScore);
		},
		bankRobberQuiz: function () {
			window.setTimeout(actions.bankRobberConclusion, 30000);
			finished = false;
			$("#waiting_for_film").hide();
			$("#bank_robber_quiz").show();
			currentScore = 1000;
			actions.interval = window.setInterval(function () {
				if (currentScore > 0) {
					currentScore = currentScore - 33;
				}
			}, 1000);
		},
		bankRobberConclusion: function () {
			window.setTimeout(actions.bankRobberScores, 45000);
			if (finished === false) {
				window.clearInterval(actions.interval);
				currentScore = 0;
				$("#bank_robber_quiz").hide();
				$("#waiting_for_conclusion").show();
				actions.updatePoints();
			}
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

	window.setTimeout(actions.bankRobberQuiz, time);

	$("ul li").click(function () {
		$(this).parent().find(".selected").removeClass("selected");
		$(this).addClass("selected");
	});

	$(".getClue").click(function () {
		$(this).parent().parent().find(".revealed").show();
		return false;
	});

	$(".submitQuiz").click(function () {
		var which       = $(this).parent().parent().attr("id"),
			$this       = $(this),
			answerArray = [];

		$this.parent().parent().find(".quiz ul li.selected").each(function (i) {
				answerArray[i] = $(this).attr("id").split("answer__")[1];
		});
		window.clearInterval(actions.interval);
		$("#waiting_for_conclusion").show();
		$(".quizBox").hide();
		finished = true;

		if (which === "bank_robber_quiz") {
			if (answerArray[0] !== "No" || answerArray[1] !== "Gunshot") {
				currentScore = 0;
			}
		} else if (which === "ransom_quiz") {
			if (answerArray[0] !== "BillyFagan" || answerArray[1] !== "Coat") {
				currentScore = 0;
			}
		} else if (which === "wom_quiz") {
			if (answerArray[0] !== "Murderer" || answerArray[1] !== "Lights") {
				currentScore = 0;
			}
		}

		totalScore += currentScore;
		actions.updatePoints();
		return false;
	});
});