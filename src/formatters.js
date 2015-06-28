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
			out.push('<img class="flickr-gallery-photo" src="' + _photoURL(img) + '">');
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
			out.push('<img class="flickr-gallery-photo" src="' + _photoURL(img) + '">');
		}
		out.push('</div>');
		return out.join('');
	};

	module.exports.album.fancybox = function(album) {
		var d = album.photoset;
		var out = [insertFancybox()];

		out.push('<div class="flickr-album" id="' + d.id + '">');
		out.push('<h1 class="flickr-album-title">' + d.title + '</h1>');
		for (var i = 0; i < d.photo.length; i++) {
			var img = d.photo[i];
			out.push('<a data-lightbox="' + d.id + '" href="' + _photoURL(img, 't') + '>' + _photoURL(img) + '"</a>');
		}
		out.push('</div>');
		return out.join('');
	};

	module.exports.gallery.fancybox = function(gallery) {
		var d = gallery.photos;
		var out = [insertFancybox()];

		out.push('<div class="flickr-album" id="' + d.id + '">');
		out.push('<h1 class="flickr-album-title">' + d.title + '</h1>');
		for (var i = 0; i < d.photo.length; i++) {
			var img = d.photo[i];
			out.push('<a data-lightbox="' + d.id + '" href="' + _photoURL(img) + '"><img src="' + _photoURL(img, 'm') + '" /></a>');
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

		function insert() {
			if (window.hexotagflickralbum !== true) {
				var head = document.getElementsByTagName('head')[0];
				var s = document.createElement('link');
				s.setAttribute('type', 'text/css');
				s.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.7.1/css/lightbox.css');
				if (typeof $ === 'undefined') {
					var j = document.createElement('script');
					j.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js');
					document.body.appendChild(j);
					j.onload = function() {

						$(document).ready(function() {
							var q = document.createElement('script');
							q.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.7.1/js/lightbox.min.js');

							head.appendChild(s);

							document.body.appendChild(q);
						});
					}
				}
				window.hexotagflickralbum = true;
				console.log('attaching jquery');
			}
		}
	}
})(module);