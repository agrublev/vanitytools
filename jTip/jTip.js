// jTip Plugin for jQuery
// by Angel Grablev for Enavu Web Development network (enavu.com)
// Dual license under MIT and GPL :) enjoy
/*

To use simply call .jTip() on the element you wish like so:
$("#content").jTip(); 

you can specify the following options:
specify
*/
(function($){
    $.fn.jTip = function(options) {
        var defaults = {
            attr: "title",
			tip_class: "tip_window",
			y_coordinate: 0,
			x_coordinate: 0
        };
        var options = $.extend(defaults, options);

        return this.each(function() {
            // object is the selected pagination element list
            obj = $(this);
			obj.css({"position":"relative"});
			var title_value = obj.attr(options.attr);
			var title_dom_element = '<div class="'+options.tip_class+'" style="display:none; position:absolute; bottom:0px; right:0px; z-index:999;">'+title_value+'</div>';
			obj.append(title_dom_element); 
			tObj = obj.find("."+options.tip_class);
			
			
			
			obj.mouseover(function(e) {	
				obj.attr('title','');
					
				
				//Set the X and Y axis of the tooltip
				tObj.css('top', e.pageY + options.y_coordinate );
				tObj.css('left', e.pageX + options.y_coordinate );
				
				//Show the tooltip with faceIn effect
				tObj.fadeIn('500');
				tObj.fadeTo('10',0.8);
				
			}).mousemove(function(e) {
			
				//Keep changing the X and Y axis for the tooltip, thus, the tooltip move along with the mouse
				tObj.css('top', e.pageY + 10 );
				tObj.css('left', e.pageX + 20 );
				
			}).mouseout(function() {
			
				//Put back the title attribute's value
				obj.attr('title',title_value);
			
				//Remove the appended tooltip template
				tObj.hide();
				
			});

			
		});
    };
})(jQuery);