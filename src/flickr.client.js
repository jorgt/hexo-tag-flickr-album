(function(module) {
	'use strict';

	var https = require('https');
	var Q = require('q');

	function client(config) {
		var deferred = Q.defer();
		var url = {
			base: 'https://api.flickr.com/services/rest/',
			callback: 'flickr' + config.id.replace('-', ''),
			json: '&format=json',
			album: '?method=flickr.photosets.getPhotos',
			gallery: '?method=flickr.urls.lookupGallery',
			galleryPhotos: '?method=flickr.galleries.getPhotos',
			img: 'https://farm{farm}.staticflickr.com/{server}/{id}_{secret}_{size}.jpg'
		};

		var urls = {
			album: function(set) {
				return url.base + url.album + key(config.key) + '&photoset_id=' + set + url.json;
			},
			gallery: function(set) {
				return url.base + url.gallery + key(config.key) + '&url=&url=https%3A%2F%2Fwww.flickr.com%2Fphotos%2Fflickr%2Fgalleries%2F' + set + '%2F' + url.json;
			},
			galleryPhotos: function(galleryid) {
				return url.base + url.galleryPhotos + key(config.key) + '&gallery_id=' + galleryid + url.json;
			}
		};

		var req = https.get(urls.album(72157648055335157), function(response) {
			var str = '';
			response.on('data', function(chunk) {
				str += chunk;
			});

			response.on('end', function() {
				if (response.statusCode === 200) {
					deferred.resolve(str);
				} else {
					deferred.reject(str);
				}
			});
		});

		req.on('error', function(e) {
			deferred.reject(e);
		});

		req.end();

		return deferred.promise;
	}


	function key(k) {
		return '&api_key=' + k;
	}

	module.exports = client;
})(module);