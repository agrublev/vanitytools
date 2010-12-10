// jSlider Plugin for jQuery - Version 0.1
// by Angel Grablev for Enavu Web Development network (enavu.com)
// Dual license under MIT and GPL :) enjoy
/*

To use simply call .jSlider() on the element you wish like so:
$("ul.hovered").jSlider(); 

you can specify the following options:
specify :)

*/
(function($){
    $.fn.jSlider = function(options) {
        var defaults = {
            previous_class: "prev",
			next_class: "next",
			inactive: "inactive",
			elem: "div",
			speed: 700,
			navi: true,
			navi_active_class: "active",
			navi_class: "navi"
        };
        var options = $.extend(defaults, options);

        return this.each(function() {
            // object is the selected pagination element list
            obj = $(this);
			var number_of_items = obj.children(options.elem).size();
			var prev = $("."+options.previous_class);
			var next = $("."+options.next_class);
			var items = [];
			var curr = 1;
			
			// create array of items
			for (i=1;i<=number_of_items;i++) { items[i] = obj.find(options.elem+":nth-child("+i+")"); }
			
			// initiate first slide
			slider(1);
			
			// changing the item to be displayed
			function slider(page, direction) {
				if (options.navi) createPagination(page);
				if (direction == "next") var old = page - 1;
				if (direction == "prev") var old = page + 1;
				obj.children(options.elem).hide();
				items[page].stop().fadeIn(options.speed);
				if (page == 1) {prev.addClass(options.inactive);} else { prev.removeClass(options.inactive); }
				if (page == number_of_items) { next.addClass(options.inactive); } else { next.removeClass(options.inactive); }
			}
			
			// create a navigation 
			function createPagination(curr) {
                var start, items = "", nav = "";
                start = "<ul class='"+options.navi_class+"'>";
                var end = "</ul>"
				for (i=1;i<=number_of_items;i++)
                {
					if (i == curr) { items += '<li><a class="'+options.navi_active_class+'" title="'+i+'">'+i+'</a></li>';} 
					else { items += '<li><a href="#" class="goto" title="'+i+'">'+i+'</a></li>';}
                }
                nav = start + items + end;
               
				obj.append(nav)
                
            }
			
			
			$("."+options.next_class).live("click", function(e){
				e.preventDefault();
				if(curr < number_of_items) {
					curr++;
					slider(curr, "next");
				}
			});
			$("."+options.previous_class).live("click", function(e){
				e.preventDefault();
				if(curr > 1) {
					curr--;
					slider(curr, "prev");
				}
			});
			$(".goto").live("click", function(e){
				e.preventDefault();
				new_curr = $(this).attr("title");
				if(new_curr > curr) {
					slider(new_curr, "next");
				} else {
					slider(new_curr, "prev");
				}
				curr = new_curr;
			});
		});
    };
})(jQuery);