// jCarousel Plugin for jQuery - Version 0.1
// by Angel Grablev for Enavu Web Development network (enavu.com)
// Dual license under MIT and GPL :) enjoy
/*

To use simply call .jCarousel() on the element you wish like so:
$(".carousel").jCarousel(); 

you can specify the following options:
auto_slide = whether the carousel slides automatically
key_slide = enable/disable whether you can use left and right arrows to navigate
hover_pause = enable/disable the pausing of the auto_slide when hovering over the carousel
auto_slide_seconds = the pause in miliseconds for the automatic rotation (4000 = 4seconds)
*/
(function($){
    $.fn.jCarousel = function(options) {
        var defaults = {
            auto_slide: true,
			key_slide: true,
			hover_pause: true,
			auto_slide_seconds: 4000
        };
        var options = $.extend(defaults, options);

        return this.each(function() {
            // object is the selected pagination element list
            obj = $(this);
			/*move the last list item before the first item. The purpose of this is
			if the user clicks to slide left he will be able to see the last item.*/
			obj.find('li:first').before(obj.find('li:last'));
	
			//check if auto sliding is enabled
			if(options.auto_slide){
				/*set the interval (loop) to call function slide with option 'right'
				and set the interval time to the variable we declared previously */
				var timer = setInterval('slide("next")', options.auto_slide_seconds);
			}
	
			//check if hover pause is enabled
			if(options.hover_pause){
				//when hovered over the list
				obj.hover(function(){
					//stop the interval
					clearInterval(timer)
				},function(){
					//and when mouseout start it again
					timer = setInterval('slide("next")', options.auto_slide_seconds);
				});
	
			}
	
			//check if key sliding is enabled
			if(options.key_slide){
	
				//binding keypress function
				$(document).bind('keypress', function(e) {
					//keyCode for left arrow is 37 and for next it's 39 '
					if(e.keyCode==37){
							//initialize the slide to left function
							slide('previous');
					}else if(e.keyCode==39){
							//initialize the slide to next function
							slide('next');
					}
				});
			}//end of check for key sliding
			
			
			$(".next").live("click", function(e){
				e.preventDefault();
				slide("next");
			});
			$(".prev").live("click", function(e){
				e.preventDefault();
				slide("previous");
			});
			
			function slide(where) {
			
				//get the item width
				var item_width = obj.find("li").outerWidth() + 10;
			
				/* using a if statement and the where variable check
				we will check where the user wants to slide (previous or next)*/
				if(where == 'previous'){
					//...calculating the new previous indent of the unordered list (ul) for left sliding
					var left_indent = parseInt(obj.css('left')) + item_width;
				}else{
					//...calculating the new left indent of the unordered list (ul) for right sliding
					var left_indent = parseInt(obj.css('left')) - item_width;
			
				}
			
				//make the sliding effect using jQuery's animate function... '
				obj.animate({'left' : left_indent},500,function(){
			
					/* when the animation finishes use the if statement again, and make an ilussion
					of infinity by changing place of last or first item*/
					if(where == 'previous'){
						//...and if it slided to previous we put the last item before the first item
						obj.find('li:first').before(obj.find('li:last'));
					}else{
						//...and if it slided to right we put the first item after the last item
						obj.find('li:last').after(obj.find('li:first'));
					}
			
					//...and then just get back the default left indent
					obj.css({'left' : '-210px'});
				});
			
			} // end function slide
			
		});
    };
})(jQuery);
