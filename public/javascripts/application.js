var toHHMMSS = function (sec_num) {
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
}


var startTimer = function(){
	var startTime = Date.now();
	var timerEl = $('.timer');
	setInterval(function(){
		var time = Date.now() - startTime;
		var seconds = time / 1000;
		timerEl.text(toHHMMSS(Math.floor(time/1000)));
	}, 10)
}

var startAudio = function(){
	$("audio")[0].play();
}

var hideLoading = function(){
	$('.content').show();
	$(".loading").fadeOut();
}

var isMobile = function(){
	return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}

var showMobileScreen = function(){
	$('.mobileScreen').show().on('click', function(){
		$('.mobileScreen').fadeOut();
		startLoading();
	});
	$(".loading").hide();
}

var startShouting = function(){
	startAudio();
	startTimer();
	hideLoading();
}

var addSpinner = function(){
	var opts = {
	  lines: 14, // The number of lines to draw
	  length: 40, // The length of each line
	  width: 9, // The line thickness
	  radius: 40, // The radius of the inner circle
	  corners: 0.5, // Corner roundness (0..1)
	  rotate: 0, // The rotation offset
	  direction: 1, // 1: clockwise, -1: counterclockwise
	  color: '#fff', // #rgb or #rrggbb or array of colors
	  speed: 0.6, // Rounds per second
	  trail: 40, // Afterglow percentage
	};
	var target = $('.loading')[0];
	var spinner = new Spinner(opts).spin(target);
}

var isReady = function(){
	return ($("audio")[0].readyState == 4);
}

var startLoading = function(){
  $(".loading").show();
  addSpinner();
  var audioElement = $("audio")[0];
  audioElement.addEventListener("loadeddata", function() {
    startShouting();
  }, true);
  audioElement.load();
}
$(document).ready(function() {
  if (isMobile()){
    showMobileScreen();
  } else {
    startLoading();
  }

});
