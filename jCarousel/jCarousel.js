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
            auto_slide: false,
			key_slide: false,
			hover_pause: false,
			auto_slide_seconds: 4000
        };
        var options = $.extend(defaults, options);

        return this.each(function() {
            // object is the selected pagination element list
            obj = $(this);
			var item_width = obj.find("li").outerWidth() + 10;
			
			
			$(".next").live("click", function(e){
				e.preventDefault();
				slide("next");
			});
			$(".prev").live("click", function(e){
				e.preventDefault();
				slide("previous");
			});
			
			function slide(where) {
				
				if(where == 'previous'){
					//...calculating the new previous indent of the unordered list (ul) for left sliding
					var left_indent = parseInt(obj.css('left')) + item_width;
				} else {
					//...calculating the new left indent of the unordered list (ul) for right sliding
					var left_indent = parseInt(obj.css('left')) - item_width;
			
				}
				
				//make the sliding effect using jQuery's animate function... '
				obj.animate({'left' : left_indent},500,function(){
			
					/* when the animation finishes use the if statement again, and make an ilussion
					of infinity by changing place of last or first item*/
					if (where == 'previous'){
						//...and if it slided to previous we put the last item before the first item
						obj.find('li:first').before(obj.find('li:last')).end().css({'left' : "0"});
					}else{
						//...and if it slided to right we put the first item after the last item
						obj.find('li:last').after(obj.find('li:first')).end().css({'left' : "0"});
					}
				});
			
			} // end function slide
			
		});
    };
})(jQuery);
