/*
 * jQuery jMosaic plugin 0.1.3 
 * https://github.com/absentik/jMosaic
 * 
 * Author: Seleznev Alexander (ABSENT) 
 * Email: absenteg@gmail.com 
 * Website: http://whoisabsent.ru 
 *  
 * Licensed under the MIT license. 
 * http://www.opensource.org/licenses/mit-license.php 
 */

;(function($, window, document, undefined){

	var pluginName = "jMosaic";
	var defaults = {
		items_type: "img", // Type of elements in the selector 
		min_row_height: 150,  // Minimal row height 
		margin: 0, // Space between elements 
		is_first_big: false // First row - largest 
	}

	function jMosaic(element, options) {
		this.element = element;
		this._defaults = defaults;
		this._name = pluginName;
		this.options = $.extend({}, defaults, options);
		this.action = typeof options === "string" ? options : "default";
		
		this.init();
	}

	jMosaic.prototype.start = function() {
		var it = this;
		var numRow = 0;
		var classWidth = 0;
		var selectorLength = $(it.element).find(it.options.items_type).length;

		this.clear();
		
		if (it.options.is_first_big) {
			it.reverseItems();
		}

		$(it.element).addClass("jMosaic-selector");
		
		$(it.element).find(it.options.items_type).each(function(i) { 
			$(this).addClass("jMosaic-item");
			var newwidth = 	it.itemNewWidth(this, it.options.min_row_height);
			$(this).removeAttr("width").removeAttr("height").css({"width": newwidth+"px", "height": it.options.min_row_height+"px", "margin": it.options.margin+"px"});		
			if (i == 0 || $(this).position().top == $(this).prev().position().top) {
				classWidth += $(this).outerWidth(true);
			}
			else {
				it.stretchingRow(".jMosaic-row_" + numRow, classWidth);
				classWidth = $(this).outerWidth(true);
				numRow++;
			}
			$(this).addClass("jMosaic-row_" + numRow);
			if (i == selectorLength - 1) {
				it.stretchingRow(".jMosaic-row_" + numRow, classWidth);	
			}
		});
		
		if (it.options.is_first_big) {
			it.reverseItems();
		}

		$(it.element).append("<div class='jMosaic-clear'></div>");
	};

	jMosaic.prototype.clear = function() {
		var it = this;
		$(it.element).find(".jMosaic-item").each(function(i) { 
			$(this)[0].className = $(this)[0].className.replace(/\bjMosaic-row_.*?\b/g, '');
		});
		$(it.element).find(".jMosaic-item").removeClass("jMosaic-item");
		$(it.element).find(".jMosaic-clear").remove();
		$(it.element).removeClass("jMosaic-selector");
	};

	jMosaic.prototype.stretchingRow = function(className, classWidth) {
		var it = this;
		var classHeight = $(it.element).find(className).outerHeight(true);
		var requiredWidth = $(it.element).width() - 1; /* scrollbar fix (for relative selector width) */
		var requiredHeight = classHeight / classWidth * requiredWidth;
		var resultWidth = 0;
		var lastElementWidth = 0;

		$(it.element).find(className).each(function(i) {
			$(this).width(it.itemNewWidth(this, (requiredHeight - it.options.margin*2)));
			resultWidth += $(this).outerWidth(true);
		});
		$(it.element).find(className).height(requiredHeight - it.options.margin*2);
		
		lastElementWidth = $(it.element).find(className).last().outerWidth(true) + (requiredWidth - resultWidth) - it.options.margin*2;
		$(it.element).find(className).last().width(lastElementWidth);
	};

	jMosaic.prototype.itemNewWidth = function(item, newheight) {
		var width = typeof($(item).attr("width")) != 'undefined' ? $(item).attr("width") : $(item).width();
		var height = typeof($(item).attr("height")) != 'undefined' ? $(item).attr("height") : $(item).height();
		var prop = width / height;
		var newwidth = newheight * prop;
		return Math.round(newwidth);
	};

	jMosaic.prototype.reverseItems = function() {
		var it = this;
		var arr = $.makeArray($(it.element).find(it.options.items_type));
		arr.reverse();
		$(it.element).html(arr);
	};


	jMosaic.prototype.init = function() {
		switch (this.action) {
			case "clear":
				return this.clear();
			break;
			default:
				return this.start();
			break;
		}
	};


	$.fn[pluginName] = function(options) {
		return this.each(function () {
			$.data(this, 'plugin_' + pluginName, new jMosaic(this, options));
		});
	}


})(jQuery, window, document);