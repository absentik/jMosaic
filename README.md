jMosaic
=======

## ABOUT
The plugin is designed to display items as a mosaic. 

The proportions of the elements do not change. As elements include the following: img, div, li etc.
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

Select a block which contains the necessary elements.
After it, call the jQuery jMosaic plugin.

<pre>
$('.pictures').jMosaic();
</pre>

### As options can be passed:
* `items_type` : Type of elements in the selector (Default: img);
* `min_row_height` : Minimal row height (Default: 150);
* `margin` : Space between elements (Default: 0);
* `is_first_big` : First row - largest (Default: false);

<pre>
$('.pictures').jMosaic({
  items_type: "img", 
  min_row_height: 200, 
  margin: 3, 
  is_first_big: true
});
</pre>

If you want to clean up, use the: `$('.pictures').jMosaic('clear');`
