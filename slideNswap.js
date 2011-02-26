/*!
 * slideNswap Plugin for jQuery
 *
 * @author Asaf Zamir
 * @link http://jquery.kidsil.net
 * @version 0.01
 * @date 26/02/2011
 *
 * Description:
 * get a really nice sliding effect (you have to see it to understand)
 * a one of a kind :)
 * 
 * Usage:
 * create a <div class="swapWrapper"> that holds the <img> (could be any class you want),
 * then just add	$(document).ready(function() {
 *						slidenswapprepare($(".swapWrapper"));
 *					});
 * an example is available at http://jquery.kidsil.net
 */

function slidenswapprepare(theobj) {
	$(theobj).children('img').hide();
	$(theobj).children('img').wrap(function() {
		return '<div class="swapMe" style="display:none;position:absolute;background-repeat:no-repeat;width:100%;height:100%;background-image:url('+$(this).attr('src')+')" />';
	});
	$(theobj).children('div.swapMe:first').show();
	$(window).load(function() {
		slidenswap($(".swapWrapper"),0);
	});	
	
}
function slidenswap(theobj,cont) {


	/*theobj.css('width:650px;height:240px;position:absolute;display:none;');*/
	theobj.attr('style','width:650px;height:240px;position:absolute;overflow:hidden;');
	theobj = theobj.children('div.swapMe:visible');
	movwidth = theobj.children('img').width()-theobj.width();
	movheight = theobj.children('img').height()-theobj.height();
	movheight = Math.abs(movheight)*(-1);
	movwidth = Math.abs(movwidth)*(-1);
	if (cont != 1) {
		theobj.css("background-position","0px 0px");
	}
	theobj.animate({backgroundPosition:movwidth+"px 0px"},3000, function() {
		$(this).animate({backgroundPosition:movwidth+"px "+movheight+"px"},2000, 
			function() {
				switchtonext($(this).parent(),false,1);
			});
		});
	/*return false;*/
}
/* theobj is the .swapWrapper, manual tells you if the call is done by the user or by slidenswap
   and direction is obvious.																		*/
function switchtonext(theobj,manual,direction) {
	hideme = theobj.children('div.swapMe:visible');
	if (direction == -1) {
		showme = theobj.children('div.swapMe:visible').prev('.swapMe');
	}
	else {
		showme = theobj.children('div.swapMe:visible').next('.swapMe');
	}
	if (showme.length == 0) {
		if (direction == -1) {
			showme = theobj.children('div.swapMe:last');
		}
		else {
			showme = theobj.children('div.swapMe:first');
		}
	}	
	showme.css("z-index", "9");
	showme.fadeIn(1500, function() {
		$(this).parent().children('div.swapMe:visible').not(this).hide().css("background-position","0px 0px");
		showme.css("z-index","");
		/* if manually called, don't call slidenswap */
		if (!manual) {
			slidenswap($(this).parent(),0);
		}
		return false;
		}
	);
	return false;
}
