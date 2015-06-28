/*
	Copyright (c) 2014 - Jorg Thuijls

	MIT Licensed

	Usage: {%- flickr-album <flickr album id> %}
*/
flickr = require('./src/flickr');
formatters = require('./src/formatters');

hexo.extend.tag.register('flickr', function(args) {
	return flickr(config(args, formatters));
}, {
	async: true
});

function config(args, formatter) {
	var type = args[0];
	return {
		id: args[1],
		key: hexo.config.flickr_key,
		type: type,
		formatter: (args[2] === 'fancybox') ? formatter[type].fancybox : formatter[type].simple,
		size: args[3] || 'b',
	};
}