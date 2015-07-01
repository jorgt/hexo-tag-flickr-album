(function(module) {
	'use strict';

	var url = 'https://farm{farm}.staticflickr.com/{server}/{id}_{secret}_{size}.jpg';

	module.exports.album = {};
	module.exports.gallery = {};
	module.exports.album.simple = function(album) {
		var d = album.photoset;

		var out = [];

		out.push('<div class="flickr-album" id="' + d.id + '">');
		out.push('<h1 class="flickr-album-title">' + d.title + '</h1>');
		for (var i = 0; i < d.photo.length; i++) {
			var img = d.photo[i];
			out.push('<img class="flickr-gallery-photo" src="' + _photoURL(img, d.size) + '">');
		}
		out.push('</div>');
		return out.join('');
	};

	module.exports.gallery.simple = function(gallery) {
		var d = gallery.photos;
		var out = [];

		out.push('<div class="flickr-album" id="' + d.id + '">');
		out.push('<h1 class="flickr-album-title">' + d.title + '</h1>');
		for (var i = 0; i < d.photo.length; i++) {
			var img = d.photo[i];
			out.push('<img class="flickr-gallery-photo" src="' + _photoURL(img, d.size) + '">');
		}
		out.push('</div>');
		return out.join('');
	};

	module.exports.album.fancybox = function(album) {
		var d = album.photoset;
		var out = [insertFancybox(d.id)];

		out.push('<div class="flickr-album" id="' + d.id + '">');
		out.push('<h1 class="flickr-album-title">' + d.title + '</h1>');
		for (var i = 0; i < d.photo.length; i++) {
			var img = d.photo[i];
			out.push('<a style="display:inline-block" data-lightbox="' + d.id + '" href="' + _photoURL(img) + '">');
			out.push('<img style="margin:0;display:inline-block;padding:1em;" src="' + _photoURL(img, 'q') + '" /></a>');
		}
		out.push('</div>');

		return out.join('');
	};

	module.exports.gallery.fancybox = function(gallery) {
		var d = gallery.photos;
		var out = [insertFancybox(d.id)];

		out.push('<div class="flickr-album" id="' + d.id + '">');
		out.push('<h1 class="flickr-album-title">' + d.title + '</h1>');
		for (var i = 0; i < d.photo.length; i++) {
			var img = d.photo[i];
			out.push('<a style="display:inline-block" data-lightbox="' + d.id + '" href="' + _photoURL(img) + '">');
			out.push('<img style="margin:0;display:inline-block;padding:1em;" src="' + _photoURL(img, 'q') + '" /></a>');
		}
		out.push('</div>');

		return out.join('');
	};

	function _photoURL(photo, size) {
		photo.size = size || 'b';
		var newUrl = url;
		for (var key in photo) {
			var obj = photo[key];
			newUrl = newUrl.replace('{' + key + '}', obj);
		}
		return newUrl;
	}

	function insertFancybox() {
		var func = insert.toString().replace(/[\n\r\t]/gi, '');
		return ('<script>(function(){' + func + '; insert()})()</script>');

		function insert(id) {
			if (window.hexotagflickralbum !== true) {
				var $jquery = document.createElement('script');
				document.body.appendChild($jquery);
				$jquery.onload = $jquery.onreadystatechange = function() {
					$css = document.createElement('link');
					$css.rel = "stylesheet";
					$css.type = "text/css";
					$css.href = "//cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.css";
					document.getElementsByTagName("head")[0].appendChild($css);
					var $fancybox = document.createElement('script');
					document.body.appendChild($fancybox);
					$fancybox.onload = $fancybox.onreadystatechange = function() {
						$('a').fancybox();
						window.hexotagflickralbum = true;
					};
					$fancybox.src = '//cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.pack.js';
				};
				$jquery.src = '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js';

			} else {
				$('a').fancybox();
			}
		}
	}
})(module);