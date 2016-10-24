var dy;
var y;
var tt;
$(function() {
	if(isIE()){
		return
	}
	//document.documentElement.style.overflowY = 'hidden';
	tt = 0;
	// console.log(isIE());
	$('html,body').mousewheel(function(event, delta, deltaX, deltaY) {
		dy = $(window).scrollTop() - delta * 200;
		if (dy > $(document).height() - $(window).height()) {
			dy = $(document).height() - $(window).height();
		}
		if (dy < 0) {
			dy = 0;
		}
		if (tt == 0) {
			tt = setInterval(timefunction, 40);
			// console.log(tt);
		}
		return false;
	});
});

function isIE() { //ie?
      if (!!window.ActiveXObject || "ActiveXObject" in window)
        return true;
      else
        return false;
    }

function timefunction() {
	var ty = dy - $(window).scrollTop();
	y = $(window).scrollTop() + (dy - $(window).scrollTop()) / 4;
	if (Math.abs(ty) < 4) {
		y = dy;
		clearInterval(tt);
		tt = 0;
	}
	$('html,body').scrollTop(y);
	// console.log(ty, tt);
}