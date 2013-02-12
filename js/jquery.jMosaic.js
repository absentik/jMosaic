/*
 * jQuery jMosaic plugin 1.0.2 
 * 
 * Author: Seleznev Alexander (ABSENT) 
 * Email: absenteg@gmail.com 
 * Website: http://whoisabsent.ru 
 *  
 * Licensed under the MIT license. 
 * http://www.opensource.org/licenses/mit-license.php 
 */

(function($){
	$.fn.jMosaic = function(options) {

		var settings = $.extend( {
			items_type: "img", // Type of elements in the selector 
			min_row_height: 150,  // Minimal row height 
			margin: 0, // Space between elements 
			is_first_big: false // First row - largest 
		}, options);

		
		var make = function() {
			clear($(this));
			start($(this), settings.items_type, settings.min_row_height, settings.margin, settings.is_first_big);
		}
		return this.each(make);
		
		
		function start(selector, items_type, min_row_height, margin, is_first_big) {
			var numRow = 0;
			var classWidth = 0;
			var selectorLength = selector.find(items_type).length;
			
			if (is_first_big) reverseItems(selector, selector.find(items_type));
			selector.addClass("jMosaic-selector");
			
			selector.find(items_type).each(function(indx) { 
				$(this).addClass("jMosaic-item");
				var newwidth = 	itemNewWidth($(this), min_row_height);
				$(this).removeAttr("width").removeAttr("height").css({"width": newwidth+"px", "height": min_row_height+"px", "margin": margin+"px"});		
				if (indx == 0) {
					classWidth += $(this).outerWidth(true);
					numRow++;
				}
				else if ($(this).position().top != $(this).prev().position().top) {
					stretchingRow(selector, ".jMosaic-row_" + numRow, margin, classWidth);
					classWidth = $(this).outerWidth(true);
					numRow++;
				}
				else {
					classWidth += $(this).outerWidth(true);
				}
				$(this).addClass("jMosaic-row_" + numRow);	
				if (indx == selectorLength - 1) {
					stretchingRow(selector, ".jMosaic-row_" + numRow, margin, classWidth);	
				}
			});
			
			if (is_first_big) reverseItems(selector, selector.find(items_type));
			selector.append("<div style='clear:both;'></div>");
		}
		
		function stretchingRow(selector, className, margin, classWidth) {
			var classHeight = selector.find(className).outerHeight(true);
			var requiredWidth = selector.width() - 1; /* scrollbar fix */
			var requiredHeight = 0;
			var resultWidth = 0;
			var lastElementWidth = 0;

			requiredHeight = classHeight/classWidth * requiredWidth;
			selector.find(className).each(function(indx) {
				$(this).width(itemNewWidth($(this), (requiredHeight - margin*2)));
				resultWidth += $(this).outerWidth(true);
			});
			selector.find(className).height(requiredHeight - margin*2);
			
			lastElementWidth = selector.find(className).last().outerWidth(true) + (requiredWidth - resultWidth) - margin*2;
			selector.find(className).last().width(lastElementWidth);
		}
		
		function itemNewWidth(item, newheight) {
			var width = typeof(item.attr("width")) != 'undefined' ? item.attr("width") : item.width();
			var height = typeof(item.attr("height")) != 'undefined' ? item.attr("height") : item.height();
			var prop = width / height;
			var newwidth = newheight*prop;
			return Math.round(newwidth);
		}
				
		function reverseItems(selector, elems) {
			var arr = $.makeArray(elems);
			arr.reverse();
			$(selector).html(arr);
		}
		
		
		function clear(selector) {
			selector.find(".jMosaic-item").each(function(indx) { 
				$(this)[0].className = $(this)[0].className.replace(/\bjMosaic-row_.*?\b/g, '');
			});
			selector.find(".jMosaic-item").removeClass("jMosaic-item");
			selector.removeClass("jMosaic-selector");
		}
	};
})(jQuery);