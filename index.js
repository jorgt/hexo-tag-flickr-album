/*
	Copyright (c) 2014 - Jorg Thuijls

	MIT Licensed

	Usage: {%- flickr-album <flickr album id> %}
*/
Flickr = require('./src/flickr');

hexo.extend.tag.register('flickr-album', function(args) {
	return Flickr(config(args, 'album'));
});

hexo.extend.tag.register('flickr-gallery', function(args) {
	return Flickr(config(args, 'gallery'));
});

function config(args, type) {
	return {
		id: args[0] || null,
		key: hexo.config.flickr_key,
		display: args[2],
		size: args[1],
		type: type
	};
}