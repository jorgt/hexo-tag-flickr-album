'use strict';
var _ = require('lodash');

module.exports = function Flickr(conf) {
	var _config = conf;
	if (_.isNull(_config.key)) {
		throw new Error("FLICKR: needs a Flickr key.");
	}

	this.getConfig = function() {
		return _config;
	};
}