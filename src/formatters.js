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
			out.push('<img class="flickr-gallery-photo" src="'+_photoURL(img)+'">');
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
			out.push('<img class="flickr-gallery-photo" src="'+_photoURL(img)+'">');
		}
		out.push('</div>');
		return out.join('');
	};

	module.exports.album.fancybox = function(album) {

	};

	module.exports.gallery.fancybox = function(gallery) {

	};

	function _photoURL(photo) {
		photo.size = 'b';
		var newUrl = url;
		for (var key in photo) {
			var obj = photo[key];
			newUrl = newUrl.replace('{' + key + '}', obj);
		}
		return newUrl;
	}
})(module);