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
			animation: "fade",
			speed: 700,
			navi: true,
			navi_active_class: "active",
			navi_class: "navi",
			auto_slide: false,
			auto_slide_interval: 8000,
			auto_pause_hover: true,
			click_next: false,
			infinite: false,
			images: false
        };
        var options = $.extend(defaults, options);

        return this.each(function() {
            // object is the selected pagination element list
            obj = $(this);
			var objChildren = obj.children(options.elem);
			var number_of_items = obj.children(options.elem).size();
			var prev = $("."+options.previous_class);
			var next = $("."+options.next_class);
			var items = [];
			var curr = 1;
			
			// create array of items
			for (i=1;i<=number_of_items;i++) { items[i] = obj.find(options.elem+":nth-child("+i+")"); }
			
			// initiate first slide
			slider(1, "", 1);
			
			// if auto slide is enabled
			if(options.auto_slide){
				//timer = setInterval("slider()", options.auto_slide_interval);
				var timer = setInterval(function(){ 
					if (curr < number_of_items) {	
						slider(++curr, "next"); 
					} else {
						slider(1);
						curr = 1;
					}
				}, options.auto_slide_interval);
			}
			
			// if auto pause on hover
			if(options.auto_slide && options.auto_pause_hover) {
				obj.children().hover(function(){
					clearInterval(timer);
				},function(){
					timer = setInterval(function(){ 
						if (curr < number_of_items) {	
							slider(++curr, "next"); 
						} else {
							slider(1);
							curr = 1;
						}
					}, options.auto_slide_interval);
				});
			}
			
			// if click_next is enabled
			if(options.click_next) {
				objChildren.click("click", function(e){
					e.preventDefault();
					if(curr < number_of_items) { curr++; slider(curr, "next"); } 
					else {
						if (options.infinite) {
							curr = 1;
							slider(curr);
						}
					}
				});
			}
			
			// changing the item to be displayed
			function slider(page, direction, from) {
				if (direction == "next") { ++page; curr = page; }
				if (direction == "prev") { --page; curr = page; }
				obj.children(options.elem).hide();
				// custom animatoin library
				show(page, from);
				if (options.navi) createPagination(page);
				if (!options.infinite) {
					if (page == 1) {prev.addClass(options.inactive).css({"cursor":"default"});} else { prev.removeClass(options.inactive).css({"cursor":"pointer"}); }
					if (page == number_of_items) { next.addClass(options.inactive).css({"cursor":"default"}); } else { next.removeClass(options.inactive).css({"cursor":"pointer"}); }
				}
			}
			
			// create a navigation 
			function createPagination(curr) {
                $("."+options.navi_class).remove();
				var start, items = "", nav = "";
                start = "<ul class='"+options.navi_class+"'>";
                var end = "</ul>"
				for (i=1;i<=number_of_items;i++)
                {
					if (i == curr) { items += '<li><a class="'+options.navi_active_class+'" title="'+i+'">'+i+'</a></li>';} 
					else { items += '<li><a href="#" class="goto" title="'+i+'">'+i+'</a></li>';}
                }
                nav = start + items + end;
				obj.append(nav);
            }
			
			// custom animation library
			function show(page, from) {
				if (options.images) {
					var img = items[from].find("img").attr("src");
					obj.css({"background":"url("+img+") center center"});
				}
				switch (options.animation) {
					case "fade":
						items[page].stop().fadeIn(options.speed);
						break;
					case "slide":
						items[page].stop().slideDown(options.speed);
						break;
					default:
						items[page].show();
						break;
				}
			}
			// controls
			$("."+options.next_class).live("click", function(e){
				e.preventDefault();
				if(curr < number_of_items) {
					slider(curr, "next", curr);
				} else {
					if (options.infinite) {
						slider(1, curr);
						curr = 1;
					}
				}
			});
			$("."+options.previous_class).live("click", function(e){
				e.preventDefault();
				if(curr > 1) {
					slider(curr, "prev", curr);
				 }else {
					if (options.infinite) {
						slider(number_of_items, curr);
						curr = number_of_items;
					}
				}
			});
			$(".goto").live("click", function(e){
				e.preventDefault();
				var newy_curr = $(this).attr("title");
				if (newy_curr > curr) { slider(newy_curr, "", curr); } else { slider(newy_curr, "", curr); }
				curr = newy_curr;
			});
		});
    };
})(jQuery);