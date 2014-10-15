var _ = require('lodash');
var Flickr = require('./src/flickr.class');
var Client = require('./src/flickr.client');

module.exports = function(config) {
	var _config = _.extend({
		key: null,
		size: 'b',
		display: 'simple',
		type: 'album',
		imgurl: 'https://farm{farm}.staticflickr.com/{server}/{id}_{secret}_{size}.jpg'
	}, config);

	var flickrbase = {
		url: 'https://api.flickr.com/services/rest/',
		album: '?method=flickr.photosets.getPhotos',
	};

	var _types = {
		album: function(set) {
			return base.url + base.album + '&api_key=' + _config.key + '&photoset_id=' + set + '&format=json';
		}
	};

	_config.type = _types[_config.type];

	return new Flickr(_config);

};