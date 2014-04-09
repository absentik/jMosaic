jMosaic
=======

## ABOUT
A lightweight jQuery plugin that can take a list of page elements and arrange them in a beautiful, tight-fitted tile mosaic grid. 

The proportions of the elements don't change. As the elements can be used: img, div, li etc.
![Demo](http://u.pikucha.ru/iafnK/345.jpeg)


## USAGE
jMosaic plugin uses the jQuery JavaScript library, only. So, include just these two javascript files in your header.

<pre>
&lt;script src="js/jquery.js"&gt;&lt;/script&gt;
&lt;script src="js/jquery.jMosaic.js"&gt;&lt;/script&gt;
</pre>


Include the CSS file responsible to style the jMosaic plugin.

<pre>
&lt;link rel="stylesheet" href="css/jquery.jMosaic.css"/ &gt;
</pre>

Select a block which contains the necessary elements (`items_type`).

<pre>
&lt;div class="pictures"&gt;
	&lt;img src="img/one.jpg" width="267" height="400"/&gt;
	&lt;img src="img/two.jpg" width="500" height="350"/&gt;
	. . .
	&lt;img src="img/last.jpg" width="400" height="300"/&gt;
&lt;/div&gt;	
</pre>

After it, call the jQuery jMosaic plugin.

<pre>
$('.pictures').jMosaic();
</pre>

For blocks or images of size, you can use `$(document).ready()`.

If this image without attribute `width` or `heigh`, you can use `$(window).load()`.

You can update on `$(window).resize()`.

### Options:
You can pass an options object in plugin init method.
* `items_type` : Type of elements in the selector (Default: `img`);
* `min_row_height` : Minimal row height (Default: `150`);
* `margin` : Space between elements (Default: `0`);
* `is_first_big` : First row - largest (Default: `false`);

<pre>
$('.blocks').jMosaic({
  items_type: "li", 
  min_row_height: 200, 
  margin: 3, 
  is_first_big: true
});
</pre>

### Methods:
`clear` : Clean up the selector from the plugin;
<pre>
$('.pictures').jMosaic('clear');
</pre>

## EXAMPLE
[View example](http://htmlpreview.github.io/?https://github.com/absentik/jMosaic/blob/master/index.html#example)
