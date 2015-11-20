var prepareSubscription = function () {
	$("#facebookConfirmer").click(function () {
    	FB.login(function (response) {
    		if (response.authResponse) {
    			subscription()
    		} else {
    			alert("If you don't want to authorize our application, then click the like button on this page to dislike our page, then click to like it again");
			}
    	}, {scope: 'user_likes'});
    	return false;
    });
};

var createLikeCookie = function () {
	document.cookie = '2mm_fbliked=true; expires=Fri, 27 Jul 2021 02:47:11 UTC; path=/'
};

var readLikeCookie = function () {
	var nameEQ = "2mm_fbliked=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

$(function () {
	$("a.showtime").click(function () {
		var href = $(this).attr("href");
		$("a").removeClass("selected");
		$(this).addClass("selected");
		$("a.button").attr("href",href);
		return false;
	})

});