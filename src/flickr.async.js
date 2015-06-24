var client = require('./flickr.client');

module.exports = function flickr(config) {
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

	client(config);
};