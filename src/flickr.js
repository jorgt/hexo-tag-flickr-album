(function(module) {
	'use strict';

	var https = require('https');
	var Q = require('q');

	var url = {
		base: 'https://api.flickr.com/services/rest/',
		json: '&format=json&nojsoncallback=1',
		album: '?method=flickr.photosets.getPhotos',
		gallery: '?method=flickr.urls.lookupGallery',
		galleryPhotos: '?method=flickr.galleries.getPhotos'
	};


	function Flickr(conf) {

		var _config = {
			id: conf.id,
			key: conf.key,
			type: conf.type,
			size: conf.size || 'b',
			display: conf.display || 'simple',
			formatter: conf.formatter
		};

		// better do this here so it hexo exits generation, as opposed to 
		// having the gallery fail to load on the blog
		if (typeof _config.type === 'undefined') {
			throw new Error("FLICKR: needs a type.");
		}
		if (typeof _config.key === 'undefined') {
			throw new Error("FLICKR: needs a Flickr key. Check _config.yml");
		}
		if (typeof _config.id === 'undefined') {
			throw new Error("FLICKR: needs a gallery or album ID");
		}
		if (typeof _config.formatter === 'undefined') {
			throw new Error("FLICKR: needs formatter");
		}

		if (functions[_config.type]) return functions[_config.type](_config);
		else throw new Error('FLICKR: Type ' + _config.type + ' not supported');
	}

	var functions = {
		album: function(config) {
			var deferred = Q.defer();

			var req = https.request(_albumUrl(config), function(response) {
				var data = '';
				response.on('data', function(chunk) {
					data += chunk;
				});
				response.on('end', function() {
					if (response.statusCode === 200) {
						deferred.resolve(config.formatter(data));
					} else {
						deferred.reject(data);
					}
				});
			});

			req.on('error', function(e) {
				deferred.reject(e);
			});

			req.end();

			return deferred.promise;
		},
		gallery: function(config) {
			var deferred = Q.defer();

			var req1 = https.request(_galleryUrl(config), function(response1) {
				var data1 = '';
				response1.on('data', function(chunk) {
					data1 += chunk;
				});
				response1.on('end', function() {
					if (response1.statusCode === 200) {
						data1 = JSON.parse(data1);
						if (typeof data1.gallery !== 'undefined' && typeof data1.gallery.id !== 'undefined') {
							config.id = data1.gallery.id;
							
							var req2 = https.request(_galleryPhotoUrl(config), function(response2) {
								var data2 = '';
								response2.on('data', function(chunk) {
									data2 += chunk;
								});
								response2.on('end', function() {
									data2 = JSON.parse(data2);
									data2.photos.title = data1.gallery.title._content;
									data2.photos.id = data1.gallery.id;
									if (response2.statusCode === 200) {
										deferred.resolve(config.formatter(data2));
									} else {
										deferred.reject(data2);
									}
								});
							});

							req2.on('error', function(e) {
								deferred.reject(e);
							});

							req2.end();
						} else {
							deferred.reject(data1);
						}
					} else {
						deferred.reject(data1);
					}
				});
			});

			req1.on('error', function(e) {
				deferred.reject(e);
			});

			req1.end();

			return deferred.promise;
		},

		galleryPhotos: function(config) {

		}
	};

	function _createCall(url, formatter) {
		var deferred = Q.defer();

		var req = https.request(url, function(response) {
			var data = '';
			response.on('data', function(chunk) {
				data += chunk;
			});
			response.on('end', function() {
				if (response.statusCode === 200) {
					deferred.resolve(formatter(data));
				} else {
					deferred.reject(data);
				}
			});
		});

		req.on('error', function(e) {
			deferred.reject(e);
		});

		req.end();

		return deferred.promise;
	}


	function _key(k) {
		return '&api_key=' + k;
	}

	function _albumUrl(config) {
		return url.base + url.album + _key(config.key) + '&photoset_id=' + config.id + url.json;
	}

	function _galleryUrl(config) {
		return url.base + url.gallery + _key(config.key) + '&url=&url=https%3A%2F%2Fwww.flickr.com%2Fphotos%2Fflickr%2Fgalleries%2F' + config.id + '%2F' + url.json;
	}

	function _galleryPhotoUrl(config) {
		return url.base + url.galleryPhotos + _key(config.key) + '&gallery_id=' + config.id + url.json;
	}

	/*
		This class is called by the hexo tag	
	*/
	module.exports = Flickr;

})(module);