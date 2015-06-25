/*
	Copyright (c) 2014 - Jorg Thuijls

	MIT Licensed

	Usage: {%- flickr-album <flickr album id> %}
*/
flickr = require('./src/flickr');
formatters = require('./src/formatters');

hexo.extend.tag.register('flickralbum', function(args) {
	return flickr(config(args, 'album', formatters.album));
}, {
	async: true
});

hexo.extend.tag.register('flickrgallery', function(args) {
	return flickr(config(args, 'gallery', formatters.gallery));
}, {
	async: true
});

function config(args, type, formatter) {
	return {
		id: args[0] || null,
		key: hexo.config.flickr_key,
		display: args[1],
		type: type,
		formatter: formatter,
		size: args[2],
	};
}