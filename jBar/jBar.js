// jBar Plugin for jQuery
// by Angel Grablev for Enavu Web Development network (enavu.com)
// Dual license under MIT and GPL :) enjoy
/*

To use simply call .jBar() on the element you wish like so:
$("#content").jBar(); 

you can specify the following options:
specify
*/
(function($){
    $.fn.jBar = function(options) {
        var defaults = {
            open: "open"
        };
        var options = $.extend(defaults, options);

        return this.each(function() {
            // object is the selected pagination element list
            obj = $(this);
			$title = obj.find("h3.title");
			$open = obj.find(".open");
			$minimize = obj.find(".minimize");
			
			$open.each(function(){
				$(this).click(function(e){
					e.preventDefault();	
					if($(this).attr("name")) {
						var width = $(this).attr("name");
						$(this).parents("li").find("div").css({"width":width});
					}
					if(!$(this).parents("li").hasClass("active")) {
						obj.find("div.content:visible").hide();
						obj.find(".active").removeClass("active");
					}
					$(this).parents("li").toggleClass("active");
					$(this).parents("li").find("div").toggle();	
					
				});
			});
			$title.each(function(){
				$(this).click(function(e){
					e.preventDefault();				   
					$(this).parents("li").removeClass("active");
					$(this).parents("li").find("div").hide();
				});
			});
			$minimize.live("click", function(e){
				e.preventDefault();
				if ($(this).html() == "↓") {
					obj.css({"width":"22px", "left":"98%"});
					$(this).html("&uarr;").parents("li").siblings().hide();
					obj.find(".left").hide();
				} else {
					obj.css({"width":"", "left":""});
					$(this).html("&darr;").parents("li").siblings().show();
					obj.find(".left").show();
				}
			});
		});
    };
})(jQuery);