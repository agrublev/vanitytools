// jCounter Plugin for jQuery - Version 0.1
// by Angel Grablev for Enavu Web Development network (enavu.com)
// Dual license under MIT and GPL :) enjoy
/*

To use simply call .jCounter() on the element you wish to limit the count or just display it like so:
$(".countme").jCounter(); 

you can specify the following options:
specify :D

*/
(function($) {

$.fn.extend({
    jCounter: function(givenOptions) {
        return this.each(function() {
            var $this = $(this), interval, prev_char_diff, $el,
                options = $.extend({
                    threshold: .5,
                    appendMethod: 'insertAfter', // insertBefore || insertAfter || prependTo || appendTo
                    target: $this, // relative element with which to place the counter
                    startOpacity: .25,
                    maxLength: parseInt( $this.attr('maxlength'), 10 ) || 0,
                    maxClassName: 'maxed',
                    className: 'counter',
                    tagName: 'span',
                    interval: 750,
                    positiveCopy: 'You have {n}&nbsp;characters left.',
                    negativeCopy: 'You are {n}&nbsp;characters over.',
                    fadeDuration: 'normal',
                    defaultText: '' // text to disregard in the character count
                }, givenOptions);
            
            // create counter element
            $el = $('<'+options.tagName+'/>')
                .html( options.positiveCopy.replace('{n}', '<span class="num"></span>') )
                .addClass( options.className );
            
            // set initial opacity to 0 if opacity is supported
            if ( $.support.opacity ) $el.css({ opacity: 0 }); // don't set opacity for IE to avoid clear text issues.
            
            // sppend counter element to the DOM
            $el[options.appendMethod](options.target);
            
            // hook up events for the input/textarea being monitored
            $this
                .bind('keyup', check)
                .bind('focus blur', function(event) {
                    if ( event.type == 'blur' ) clearInterval( interval );
                    if ( event.type == 'focus' && !interval ) setInterval(check, options.interval);
                });
            
            // actual function to do the character counting and notification
            function check() {
                var val = $this.val(), 
                    length = (val == options.defaultText ? 0 : val.length), 
                    percentage_complete = length/options.maxLength,
                    char_diff = options.maxLength - length,
                    opacity;

                // return if we haven't made any progress
                if ( prev_char_diff != undefined && char_diff == prev_char_diff ) return;
                
                // if counter element is hidden and we are past the given threshold, show it
                if ( $el.is(':hidden') && percentage_complete >= options.threshold )
                    $el.show();
                // if the counter element is visible and we are now under the given threshold, hide it
                if ( $el.is(':visible') && percentage_complete < options.threshold )
                    $el.hide();
                
                if ( $.support.opacity ) { // don't set opacity for IE to avoid clear type issues.
                    // calculate the correct opacity
                    opacity = options.startOpacity + ((options.threshold - percentage_complete) * ((options.startOpacity * 2) - 2));
                    // animate to the correct opacity
                    $el.stop().fadeTo( options.fadeDuration, percentage_complete >= options.threshold ? opacity : 0 );
                }
                
                // set the correct copy if under or over the max number of characters
                if ( char_diff >= 0 ) {
                    if ( $el.is( '.'+options.maxClassName ) )
                        $el.html( options.positiveCopy.replace('{n}', '<span class="num"></span>') );
                } else {
                    if ( !$el.is( '.'+options.maxClassName ) )
                        $el.html( options.negativeCopy.replace('{n}', '<span class="num"></span>') );
                }
                
                // add or remove the max class name
                $el[ (char_diff < 0 ? 'add' : 'remove') + 'Class' ]( options.maxClassName );
                
                // set the number of characters left or number of characters over the limit
                $el.find('.num').text( Math.abs(char_diff) );
                
                // make sure the plural is necessary or not
                if ( char_diff == -1 || char_diff == 1 )
                    $el.html( $el.html().replace(/characters\b/, 'character') );
                else
                    $el.html( $el.html().replace(/character\b/, 'characters') );
                    
                prev_char_diff = char_diff;
            };
            // run an initial check
            check();
        });
    }
});

})(jQuery);