/*
	Copyright (c) 2014 - Jorg Thuijls

	MIT Licensed

	Usage: {%- flickr-album <flickr album id> %}
*/
flickr = require('./src/flickr');
formatters = require('./src/formatters');

hexo.extend.tag.register('flickr', function(args) {
	return flickr(config(args, formatters.album));
}, {
	async: true
});

function config(args, formatter) {
	return {
		id: args[1],
		key: hexo.config.flickr_key,
		type: args[0],
		formatter: (args[2] === 'fancybox') ? formatter.fancybox : formatter.simple,
		size: args[3] || 'b',
	};
}