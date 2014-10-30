/**
 * jQuery SubBtn plugin
 * This plugin replaces input submit buttons with an anchor tag that has the same behaviour. An achor tag is better stylable cross-browser.
 * 
 * Requirements
 * 	- jQuery library version >= 1.4
 * 
 * @author Robin van Baalen <robin@neverwoods.com>
 * @link http://neverwoods.com
 * 
 * @version 1.1.0
 * 
 * CHANGELOG
 * 	1.0		First release
 * 	1.0.1	Anchor now inherits the submit button's class.
 * 	1.0.2	Changed default class of replacement button
 * 	1.0.3	Random ID generator if original element has no preset ID attribute.
 *  1.0.4   Replaced 'content' option for 'contentBefore' and 'contentAfter'
 *  1.0.5   Added .data('subbtn') after initialization to check if this element is already touched by .subbtn()
 *  1.1.0   Converted plugin to bower package
 */

(function($){
    $.fn.extend({
    	subbtn: function(options) {
    		var opts = $.extend({}, $.fn.subbtn.defaults, options);
    		
            return this.each(function() {
        		var $anchor = $("<a href=\"#\" class=\"" + opts.btnClass + "\"></a>");
        		var $__this = $(this);
        		var strId	= (typeof $__this.attr("id") == "undefined") ? "subbtn__" + Math.floor(Math.random() * 999) : $__this.attr("id");
        		
        		if ($__this.data("subbtn") === true) return; // Don't re-initialize.
        		
        		$anchor
        			.attr("id", strId + "_btn")
        			.bind("click", function () {
        				$__this.trigger("click");
        				return false;
        			})
        			.addClass($__this.attr("class"))
        			.html(opts.contentBefore + $(this).attr("value") + opts.contentAfter);
        		
        		$__this.after($anchor);
        		if (typeof opts.after === "function") {
        			opts.after($__this, strId + "_btn");
        		}
        		
        		$__this.data("subbtn", true);
        		$__this.hide();
            });
            
        }
    });
    
    $.fn.subbtn.defaults = {
		btnClass: "subbtn_replaced",
        contentBefore: "",
        contentAfter: "",
		after: null
    };
})(jQuery);