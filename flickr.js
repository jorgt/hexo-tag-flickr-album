/*
	Copyright (c) 2014 - Jorg Thuijls

	MIT Licensed

	On Flickr Sizes:
		s	small square 75x75
		q	large square 150x150
		t	thumbnail, 100 on longest side
		m	small, 240 on longest side
		n	small, 320 on longest side
		-	medium, 500 on longest side
		z	medium 640, 640 on longest side
		c	medium 800, 800 on longest side†
		b	large, 1024 on longest side*
		o	original image, either a jpg, gif or png, depending on source format

*/
var _ = require('lodash');
var config = hexo.config

module.exports = Flickr;

/*
	This extends Hexo. It injects the current document with function FlickrClient. 

	args: id, size, style
*/
function Flickr(args, content, options) {
	var id = args.shift();
	_.extend(args, {size: 'b', style: 'simple'})
	var d = FlickrClient.toString().replace(/[\r\n\t\f]/g, ''); // lame minifier to remove tabs, line feeds and carriage returns
	var div = '<div class="gallery" id="' + id + '"><div style="text-align:center">Loading Gallery...</div></div>';
	var script = '<script>if(!window["Flickr"]){window["Flickr"]=' + d + ';}window["' + id + '"]=new window["Flickr"]("'+config.flickr_key+'","' + id + '");window["' + id + '"].jsonp()</script>'
	return div + script;
}

/*
	Hexo plugins are asynchronous, so fetching a flickr gallery in Node when generating the page will fail. 
	Instead, the function below is going to be injected into the current document (if it does not exist
	already) and fetches gallery info as jsonp through the client, then builds an extremely simple 
	gallery.
*/
function FlickrClient(k, s) {
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