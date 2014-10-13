/*
	Copyright (c) 2014 - Jorg Thuijls

	MIT Licensed

	Usage: {%- flickr-album <flickr album id> %}
*/
Flickr = require('./flickr');

hexo.extend.tag.register('flickr-album', Flickr);