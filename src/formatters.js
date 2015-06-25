(function(module) {
	'use strict';

	var url = 'https://farm{farm}.staticflickr.com/{server}/{id}_{secret}_{size}.jpg';

	module.exports.album = function(album) {
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

	module.exports.gallery = function(gallery) {
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