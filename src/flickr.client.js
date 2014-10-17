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
			_config.redirectTo = _config.display;
			_config.display = "galleryRedirect";
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
			var $gal = _getGalleryDiv();
			if (data.stat === "ok") {
				var info = (data.photoset) ? data.photoset : data.photos;
				var p = info.photo;
				var title = info.title || _config.galleryInfo.title._content;
				var html = '<div class="flickr-gallery-title"><h1>' + title + '</h1>';
				for (var i = 0; i < p.length; i++) {
					html += '<img class="flickr-gallery-photo" src="' + _buildPhoto(p[i], _config.size) + '" />';
				}
				html += '</div>';
				$gal.innerHTML = html;
			} else {
				$gal.innerHTML = "Sorry, could not load the requested photos.";
			}
		},
		fancybox: function(data) {
			var $gal = _getGalleryDiv();
			$gal.style.textAlign = "center";
			if (data.stat === "ok") {
				if (typeof jQuery === 'undefined') {
					var $jquery = document.createElement('script');
					document.body.appendChild($jquery);

					$jquery.onload = $jquery.onreadystatechange = function() {
						_fancybox();
					};

					$jquery.src = '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js';

				} else if (typeof $.fancybox === 'undefined') {
					_fancybox();
				}
				var info = (data.photoset) ? data.photoset : data.photos;
				var p = info.photo;
				var title = info.title || _config.galleryInfo.title._content;
				var html = '<div class="flickr-gallery-title"><h1>' + title + '</h1>';
				for (var i = 0; i < p.length; i++) {
					html += '<a style="display:inline-block" href="' + _buildPhoto(p[i], _config.size) + '" class="' + _config.id + '" rel="' + _config.id + '">';
					html += '<img style="margin:0;display:inline-block;padding:1em;" src="' + _buildPhoto(p[i], 'q') + '" /></a>';
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
			} else {
				var $gal = _getGalleryDiv();
				$gal.innerHTML = "Sorry, could not load the requested photos.";
			}
		}
	};

	function _fancybox() {
		$css = document.createElement('link');
		$css.rel = "stylesheet";
		$css.type = "text/css";
		$css.href = "//cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.css";
		document.getElementsByTagName("head")[0].appendChild($css);
		var $fancybox = document.createElement('script');
		document.body.appendChild($fancybox);
		$fancybox.onload = $fancybox.onreadystatechange = function() {
			$('a.' + _config.id).fancybox();
		};
		$fancybox.src = '//cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.pack.js';
	}

	function _getGalleryDiv() {
		return document.getElementById(_config.id.split('-')[1] || _config.id.split('-')[0]);
	}

	function _createScript() {
		document.body.appendChild(_createTag('script', {
			src: _urls[_config.type].call(this, _config.id)
		}));
	}

	function _createTag(tag, opt) {
		$tag = document.createElement(tag);
		for (var key in opt) {
			var obj = opt[key];
			$tag[key] = obj;
		}
		return $tag;
	}

	function _createCallback() {
		window[_url.callback] = function(data) {
			window[_config.id].done(data);
		};
	}

	function _key() {
		return '&api_key=' + _config.key;
	}

	function _buildPhoto(photo, size) {
		photo.size = size;
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
		_done[_config.display].call(this, data);
	};
};