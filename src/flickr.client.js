module.exports = function FlickrClient(_config) {

	var _url = {
		base: 'https://api.flickr.com/services/rest/',
		callback: 'flickr' + _config.id.replace('-', ''),
		json: '&format=json&jsoncallback=',
		album: '?method=flickr.photosets.getPhotos',
		gallery: '?method=flickr.urls.lookupGallery',
		galleryPhotos: '?method=flickr.galleries.getPhotos',
		img: 'https://farm{farm}.staticflickr.com/{server}/{id}_{secret}_{size}.jpg'
	};

	var _urls = {
		album: function(set) {
			return _url.base + _url.album + _key() + '&photoset_id=' + set + _url.json + _url.callback;
		},
		gallery: function(set) {
			return _url.base + _url.gallery + _key() + '&url=&url=https%3A%2F%2Fwww.flickr.com%2Fphotos%2Fflickr%2Fgalleries%2F' + set + '%2F' + _url.json + _url.callback;
		},
		galleryPhotos: function(galleryid) {
			return _url.base + _url.galleryPhotos + _key() + '&gallery_id=' + galleryid + _url.json + _url.callback;
		}
	};

	var _jsonp = {
		album: function() {
			_createScript();
			_createCallback();
		},
		gallery: function() {
			_config.display = "galleryRedirect";
			_config.redirectTo = "simple";
			_createScript();
			_createCallback();
		},
		galleryPhotos: function() {
			_createScript();
			_createCallback();
		}
	};

	var _done = {
		simple: function(data) {
			var $gal = document.getElementById(_config.id.split('-')[1] || _config.id.split('-')[0]);
			if (data.stat === "ok") {
				var info = (data.photoset) ? data.photoset : data.photos;
				var p = info.photo;
				var title = info.title || _config.galleryInfo.title._content;
				var html = '<div class="flickr-gallery-title"><h1>' + title + '</h1>';
				for (var i = 0; i < p.length; i++) {
					html += '<img class="flickr-gallery-photo" src="' + _buildPhoto(p[i]) + '" />';
				}
				html += '</div>';
				$gal.innerHTML = html;
			} else {
				$gal.innerHTML = "Sorry, could not load the requested photos.";
			}
		},
		galleryRedirect: function(data) {
			if (data.stat === "ok") {
				var conf = _config;
				conf.id = data.gallery.id;
				conf.type = "galleryPhotos";
				conf.display = conf.redirectTo;
				conf.galleryInfo = data.gallery;
				window[conf.id] = new window.Flickr(conf);
				window[conf.id].jsonp();
			}
		}
	};

	function _createScript() {
		$script = document.createElement('script');
		$script.src = _urls[_config.type].call(this, _config.id);
		document.body.appendChild($script);
	}

	function _createCallback() {
		window[_url.callback] = function(data) {
			window[_config.id].done(data);
		};
	}

	function _key() {
		return '&api_key=' + _config.key;
	}

	function _buildPhoto(photo) {
		photo.size = _config.size;
		var url = _url.img;
		for (var key in photo) {
			var obj = photo[key];
			url = url.replace('{' + key + '}', obj);
		}
		return url;
	}

	this.jsonp = function() {
		_jsonp[_config.type].call(this);
	};

	this.done = function(data) {
		console.log(data);
		_done[_config.display].call(this, data);
	};
};