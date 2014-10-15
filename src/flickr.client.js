'use strict';

module.exports = function FlickrClient(k, s) {
	var set = s;
	var key = k;
	var bigurl = 'https://farm{farm}.staticflickr.com/{server}/{id}_{secret}_b.jpg';

	this.url = function(set) {
		return 'https://api.flickr.com/services/rest/' + '?method=flickr.photosets.getPhotos' + '&api_key=' + key + '&photoset_id=' + set + '&format=json'
	};

	this.big = function(photo) {
		return replace(bigurl, photo);
	};

	function replace(url, photo) {
		for (var key in photo) {
			var obj = photo[key];
			url = url.replace('{' + key + '}', obj);
		};
		return url;
	};

	this.jsonp = function() {
		var callbackName = 'jsonFlickrApi';
		window[callbackName] = function(data) {
			delete window[callbackName];
			document.body.removeChild(script);
			window[set].done(data);
		};

		var script = document.createElement('script');
		script.src = this.url(set);
		document.body.appendChild(script);
	};

	this.done = function(data) {
		var p = data.photoset.photo;
		var id = data.photoset.id;
		var $gal = document.getElementById(id);

		var html = '<div class="gallery-title"><h1>' + data.photoset.title + '</h1>';
		for (var i = 0; i < p.length; i++) {
			html += '<img src="' + this.big(p[i]) + '" />';
		};
		html += '</div>';
		$gal.innerHTML = html;
	};
}