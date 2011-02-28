/*!
 * Controllers Plugin for SlideNSwap
 *
 * @author Asaf Zamir
 * @link http://jquery.kidsil.net
 * @version 0.01
 * @date 28/02/2011
 *
 * Description:
 * Add controllers to SlideNSwap
 * 
 * 
 * Usage:
 * just add the script file & css file to your html and add
 * 												slidenswapControllers($(".swapWrapper");
 * right after the call for slidenswapprepare
 * an example is available at http://jquery.kidsil.net
 */

function slidenswapControllers(theobj) {
		theobj.append('<div id="slide-n-swap-controllers"><div id="back_cont"> &larr; </div><div id="pause_cont"> || </div><div id="forward_cont"> &rarr; </div>');
		theobj.hover(function() {
			$(this).children('#slide-n-swap-controllers').fadeIn();
		},function () {
			$(this).children('#slide-n-swap-controllers').fadeOut();
			
		});
		stopped = false;
		/*Back Controller */
		theobj.find('#slide-n-swap-controllers #back_cont').click( function() {
			/* only enable forward while 1 picture is shown (not while fading) */
			swapwrap = $(this).parent().parent()
			if (swapwrap.children('.swapMe:visible').length <= 1) {
				swapwrap.children('.swapMe').stop();
				switchtonext(swapwrap,false,-1);
				/* disable pause if paused */
				$(this).siblings('#pause_cont').text('||');
				stopped = false;
			}
			
		});

		/* Pause Controller */
		theobj.find('#slide-n-swap-controllers #pause_cont').click( function() {
			/* only enable pause while 1 picture is shown (not while fading) */
			swapwrap = $(this).parent().parent()
			if (swapwrap.children('.swapMe:visible').length <= 1) {
				if (stopped) {
					slidenswap(swapwrap,1);
					$(this).text('||');
				}
				else {
					swapwrap.children('.swapMe').stop();
					$(this).text('>');
				}
				stopped = !stopped;
			}
		});

		/* Forward Controller */
		theobj.find('#slide-n-swap-controllers #forward_cont').click( function() {
			/* only enable forward while 1 picture is shown (not while fading) */
			swapwrap = $(this).parent().parent()
			if (swapwrap.children('.swapMe:visible').length <= 1) {
				swapwrap.children('.swapMe').stop();
				switchtonext(swapwrap,false,1);
				$(this).siblings('#pause_cont').text('||');
				stopped = false;

			}
		});

	}
