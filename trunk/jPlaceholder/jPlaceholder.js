// jBar Plugin for jQuery - Version 0.1
// by Angel Grablev for Enavu Web Development network (enavu.com)
// Dual license under MIT and GPL :) enjoy
/*

To use simply call .jBar() on the element you wish like so:
$("#content").jBar(); 

you can specify the following options:
css_class = allows you to specify the class for the placeholder
*/
(function($) {
$.fn.placeholder = function(options) {
	var defaults = {css_class: "placeholder"};
	var options = $.extend(defaults, options);  
	this.each(function() {
		if ($(this).attr('placeholder') != undefined) {
			var phvalue = $(this).attr("placeholder");
			var currvalue = $(this).attr("value");
			if (phvalue == currvalue) {
				$(this).addClass(options.css_class);
			}
			if (currvalue == "") {
				$(this).addClass(options.css_class);
				$(this).val(phvalue);
			}
			$(this).focus(function(){
				var ph = $(this).attr("placeholder");
				if (ph == $(this).val()) {
					$(this).val("").removeClass(options.css_class);
				}
			});
			
			$(this).blur(function(){
				var ph = $(this).attr("placeholder");
				if ($(this).val() == "") {
					$(this).val(ph).addClass(options.css_class);
				}
			});
		}
	});
	return this;
	};
})(jQuery);

