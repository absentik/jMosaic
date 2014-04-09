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

;(function(b,m,n,p){function d(a,e){this.element=a;this._defaults=k;this._name=f;this.options=b.extend({},k,e);this.action="string"===typeof e?e:"default";this.init()}var f="jMosaic",k={items_type:"img",min_row_height:150,margin:0,is_first_big:!1};d.prototype.start=function(){var a=this,e=0,c=0,l=b(a.element).find(a.options.items_type).length;this.clear();a.options.is_first_big&&a.reverseItems();b(a.element).addClass("jMosaic-selector");b(a.element).find(a.options.items_type).each(function(d){b(this).addClass("jMosaic-item");
var g=a.itemNewWidth(this,a.options.min_row_height);b(this).removeAttr("width").removeAttr("height").css({width:g+"px",height:a.options.min_row_height+"px",margin:a.options.margin+"px"});0==d||b(this).position().top==b(this).prev().position().top?c+=b(this).outerWidth(!0):(a.stretchingRow(".jMosaic-row_"+e,c),c=b(this).outerWidth(!0),e++);b(this).addClass("jMosaic-row_"+e);d==l-1&&a.stretchingRow(".jMosaic-row_"+e,c)});a.options.is_first_big&&a.reverseItems();b(a.element).append("<div class='jMosaic-clear'></div>")};
d.prototype.clear=function(){b(this.element).find(".jMosaic-item").each(function(a){b(this)[0].className=b(this)[0].className.replace(/\bjMosaic-row_.*?\b/g,"")});b(this.element).find(".jMosaic-item").removeClass("jMosaic-item");b(this.element).find(".jMosaic-clear").remove();b(this.element).removeClass("jMosaic-selector")};d.prototype.stretchingRow=function(a,e){var c=this,d=b(c.element).find(a).outerHeight(!0),f=b(c.element).width()-1,g=d/e*f,h=0,d=0;b(c.element).find(a).each(function(a){b(this).width(c.itemNewWidth(this,
g-2*c.options.margin));h+=b(this).outerWidth(!0)});b(c.element).find(a).height(g-2*c.options.margin);d=b(c.element).find(a).last().outerWidth(!0)+(f-h)-2*c.options.margin;b(c.element).find(a).last().width(d)};d.prototype.itemNewWidth=function(a,d){var c="undefined"!=typeof b(a).attr("width")?b(a).attr("width"):b(a).width(),f="undefined"!=typeof b(a).attr("height")?b(a).attr("height"):b(a).height();return Math.round(c/f*d)};d.prototype.reverseItems=function(){var a=b.makeArray(b(this.element).find(this.options.items_type));
a.reverse();b(this.element).html(a)};d.prototype.init=function(){switch(this.action){case "clear":return this.clear();default:return this.start()}};b.fn[f]=function(a){return this.each(function(){b.data(this,"plugin_"+f,new d(this,a))})}})(jQuery,window,document);