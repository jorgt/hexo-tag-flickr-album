var FlickrClient = require('./flickr.client');
/*
	This class is called by the hexo tag	
*/
module.exports = function(config) {
	return Flickr(config);
};


function Flickr(conf) {
	'use strict';

	var _config = {
		id: conf.id || null,
		key: conf.key || null,
		type: conf.type || 'album', 
		size: conf.size || 'b', 
		display: conf.display || 'simple'
	};

	// better do this here so it hexo exits generation, as opposed to 
	// having the gallery fail to load on the blog
	if (_config.key === null) {
		throw new Error("FLICKR: needs a Flickr key. Check _config.yml");
	}
	if (_config.id === null) {
		throw new Error("FLICKR: needs a gallery or album ID");
	}

	var out = '';

	var client = FlickrClient.toString().replace(/[\r\n\t\f]/g, '');
	var id = _config.id;

	out += '<div class="flickr-' + _config.type + '" id="'+_config.id+'">Loading Gallery...</div>';
	out += '<script>if(!window["Flickr"]){window["Flickr"]=' + client + ';}window["' + id + '"]=new window["Flickr"]('+JSON.stringify(_config)+');window["' + id + '"].jsonp()</script>';
	
	return out;
}