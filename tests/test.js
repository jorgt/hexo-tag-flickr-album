var expect = require('chai').expect;
var sinon = require('sinon');
var Q = require('Q');
var https = require('https');
var flickr = require('./../src/flickr');
var formatters = require('./../src/formatters');
var PassThrough = require('stream').PassThrough;
var key = require('../key.json');

var album = {
	id: '72157648055335157',
	key: key.flickr,
	type: 'album',
	formatter: function(str) {
		return fakeAlbum();
	}
}
var gallery = {
	id: '72157648771295401',
	key: key.flickr,
	type: 'gallery',
	formatter: formatters.gallery.simple
}

describe('/src/formatters', function() {

	describe('#album.simple', function() {
		it('has to be a function', function(done) {
			expect(formatters.album.simple).to.be.an.instanceof(Function);
			done();
		});

		it('has to parse album JSON into valid HTML', function(done) {
			var html = formatters.album.simple(fakeAlbum());
			expect(html).to.be.a('string');
			expect(html).to.be.equal(fakeHTMLAlbum());
			done();
		});
	});

	describe('#gallery.simple', function() {
		it('has to be a function', function(done) {
			expect(formatters.gallery.simple).to.be.an.instanceof(Function);
			done();
		});

		it('has to parse gallery JSON into valid HTML', function(done) {
			var html = formatters.gallery.simple(fakeGallery());
			expect(html).to.be.a('string');
			expect(html).to.be.equal(fakeHTMLGallery());
			done();
		});
	});
});

describe('/src/flickr unit test', function() {


	beforeEach(function() {
		this.request = sinon.stub(https, 'request');
	});

	afterEach(function() {
		https.request.restore();
	});

	describe('should exist', function() {

		it('is a function', function(done) {
			expect(flickr).to.be.an.instanceof(Function);
			done();
		});
	});

	describe('#album', function() {
		it('returns a promise', function(done) {
			expected = fakeAlbum();
			var response = new PassThrough();
			response.write(JSON.stringify(expected));
			response.end();

			var request = new PassThrough();

			this.request.callsArgWith(1, response).returns(request);
			expect(flickr(album, 'album').toString()).to.be.equal(Q.defer().promise.toString());
			done();
		});

		it('calls Flickr', function(done) {
			var response = new PassThrough();
			response.write(JSON.stringify(fakeAlbum()));
			response.statusCode = 200;
			response.end();

			var request = new PassThrough();

			this.request.callsArgWith(1, response).returns(request);

			flickr(album, 'album').then(function(data) {
				expect(data).to.be.eql(fakeAlbum());
				done();
			}, function(err) {
				done(err);
			});
		});
	});

	describe('#gallery', function() {
		it('returns a promise', function(done) {
			expected = fakeGallery();
			var response = new PassThrough();
			response.write(JSON.stringify(expected));
			response.end();

			var request = new PassThrough();

			this.request.callsArgWith(1, response).returns(request);
			expect(flickr(gallery, 'gallery').toString()).to.be.equal(Q.defer().promise.toString());
			done();
		});

		it('calls Flickr', function(done) {
			var response = new PassThrough();
			response.write(JSON.stringify(fakeGallery()));
			response.statusCode = 200;
			response.end();

			var request = new PassThrough();

			this.request.callsArgWith(1, response).returns(request);

			flickr(gallery, 'gallery').then(function(data) {
				done(data);
			}, function(err) {
				done('working out how to fake a nested call :(');
			});
		});
	});
});

describe('/src/flickr connection test', function() {
	this.timeout(15000);

	describe('#album', function() {
		it('calls Flickr', function(done) {
			flickr(album, 'album').then(function(data) {
				expect(data).to.be.defined;
				//console.log(JSON.stringify(data));
				//expect(JSON.stringify(data)).to.match(/^<div class=\\\"flickr-album\\\"/);
				done();
			}, function(err) {
				done('Error');
			});
		});
	});

	describe('#gallery', function() {
		it('calls Flickr', function(done) {
			flickr(gallery, 'gallery').then(function(data) {
				expect(data).to.be.defined;
				//expect(JSON.stringify(data)).to.match(/^<div class=\\\"flickr-album\\\"/);
				done();
			}, function(err) {
				done('Error');
			});
		});
	});
});

function fakeGallery() {
	return {
		"photos": {
			"page": 1,
			"pages": 1,
			"perpage": "500",
			"total": 18,
			"photo": [{
				"id": "15343380427",
				"owner": "115472973@N02",
				"secret": "d6847e2d43",
				"server": "3954",
				"farm": 4,
				"title": "Mr. Zeebra",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"is_primary": 1,
				"has_comment": 0
			}, {
				"id": "15336291659",
				"owner": "31053704@N05",
				"secret": "f372beed7d",
				"server": "3950",
				"farm": 4,
				"title": "Albuquerque, N.M. #7",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"is_primary": 0,
				"has_comment": 0
			}, {
				"id": "15332708990",
				"owner": "34848873@N02",
				"secret": "a47cdf75e0",
				"server": "5606",
				"farm": 6,
				"title": "Albuquerque Balloon Fiesta 2014",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"is_primary": 0,
				"has_comment": 0
			}, {
				"id": "15327071408",
				"owner": "51224135@N00",
				"secret": "63486da9b0",
				"server": "3927",
				"farm": 4,
				"title": "Darth Again",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"is_primary": 0,
				"has_comment": 0
			}, {
				"id": "15507012805",
				"owner": "85543821@N00",
				"secret": "063ca3c9b1",
				"server": "2946",
				"farm": 3,
				"title": "balloon pin collection",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"is_primary": 0,
				"has_comment": 0
			}, {
				"id": "15483868046",
				"owner": "85543821@N00",
				"secret": "b1369ff9de",
				"server": "3952",
				"farm": 4,
				"title": "Shark attack jar",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"is_primary": 0,
				"has_comment": 0
			}, {
				"id": "15510842475",
				"owner": "94780392@N03",
				"secret": "329548e49c",
				"server": "2945",
				"farm": 3,
				"title": "Albuquerque International Balloon Fiesta",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"is_primary": 0,
				"has_comment": 0
			}, {
				"id": "15345391848",
				"owner": "66547006@N06",
				"secret": "efc87fce1e",
				"server": "3951",
				"farm": 4,
				"title": "Albuquerque Ballon Fiesta 2014  1",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"is_primary": 0,
				"has_comment": 0
			}, {
				"id": "15349508750",
				"owner": "66547006@N06",
				"secret": "f24f1903e3",
				"server": "3935",
				"farm": 4,
				"title": "Albuquerque Balloon Fiesta 2014  15",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"is_primary": 0,
				"has_comment": 0
			}, {
				"id": "15330218657",
				"owner": "25985022@N00",
				"secret": "41e1764721",
				"server": "5614",
				"farm": 6,
				"title": "Albuquerque International Balloon Fiesta 2014",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"is_primary": 0,
				"has_comment": 0
			}, {
				"id": "15508092492",
				"owner": "31283805@N05",
				"secret": "5fdddb4074",
				"server": "3935",
				"farm": 4,
				"title": "Partial Eclipse",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"is_primary": 0,
				"has_comment": 0
			}, {
				"id": "15321105998",
				"owner": "53746192@N00",
				"secret": "778686f8de",
				"server": "3931",
				"farm": 4,
				"title": "42nd Annual Albuquerque Balloon Fiesta",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"is_primary": 0,
				"has_comment": 0
			}, {
				"id": "15499824391",
				"owner": "109794245@N05",
				"secret": "a6563aafd9",
				"server": "3930",
				"farm": 4,
				"title": "Balloons over the Rio Grande",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"is_primary": 0,
				"has_comment": 0
			}, {
				"id": "15313508360",
				"owner": "109794245@N05",
				"secret": "498dd4b092",
				"server": "5612",
				"farm": 6,
				"title": "Arky",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"is_primary": 0,
				"has_comment": 0
			}, {
				"id": "15488226212",
				"owner": "7969301@N06",
				"secret": "4a85a036d7",
				"server": "5599",
				"farm": 6,
				"title": "2014 October 9, Albuquerque international balloon fiesta.",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"is_primary": 0,
				"has_comment": 0
			}, {
				"id": "15469793275",
				"owner": "24852677@N00",
				"secret": "f03d63dfd5",
				"server": "3928",
				"farm": 4,
				"title": "Albuquerque Balloon Fiesta 2014",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"is_primary": 0,
				"has_comment": 0
			}, {
				"id": "15283175958",
				"owner": "24852677@N00",
				"secret": "b39f1f9438",
				"server": "3932",
				"farm": 4,
				"title": "Albuquerque Balloon Fiesta 2014",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"is_primary": 0,
				"has_comment": 0
			}, {
				"id": "15313666088",
				"owner": "109794245@N05",
				"secret": "a1dd846beb",
				"server": "5601",
				"farm": 6,
				"title": "Norman",
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0,
				"is_primary": 0,
				"has_comment": 0
			}],
			"id": "66911286-72157648771295401",
			"title": "Balloon Fiesta 2014"
		},
		"stat": "ok",
	};
}

function fakeGalleryURL() {
	return {
		"gallery": {
			"id": "66911286-72157648771295401",
			"url": "https:\/\/www.flickr.com\/photos\/flickr\/galleries\/72157648771295401",
			"owner": "66956608@N06",
			"username": "Flickr",
			"iconserver": "3741",
			"iconfarm": 4,
			"primary_photo_id": "15343380427",
			"date_create": "1413389405",
			"date_update": "1426446050",
			"count_photos": 18,
			"count_videos": 0,
			"count_views": "21846",
			"count_comments": 16,
			"title": {
				"_content": "Balloon Fiesta 2014"
			},
			"description": {
				"_content": "Photographers attending the famous Albuquerque International Balloon Fiesta capture the various shapes and colors of hot-air balloons in ascensions above New Mexico.\n\nShare your aircraft photography as comments with this format: [Flickr photo page URL]\n\nPrevious galleries: <a href=\"https:\/\/www.flickr.com\/photos\/flickr\/galleries\/72157646433779973\/\">Stunning silhouettes<\/a> | <a href=\"https:\/\/www.flickr.com\/photos\/flickr\/galleries\/72157648727697471\/\">Indigenous People's Day<\/a>"
			},
			"primary_photo_server": "3954",
			"primary_photo_farm": 4,
			"primary_photo_secret": "d6847e2d43"
		},
		"stat": "ok"
	}
}

function fakeHTMLGallery() {
	return '<div class="flickr-album" id="66911286-72157648771295401"><h1 class="flickr-album-title">Balloon Fiesta 2014</h1><img class="flickr-gallery-photo" src="https://farm4.staticflickr.com/3954/15343380427_d6847e2d43_b.jpg"><img class="flickr-gallery-photo" src="https://farm4.staticflickr.com/3950/15336291659_f372beed7d_b.jpg"><img class="flickr-gallery-photo" src="https://farm6.staticflickr.com/5606/15332708990_a47cdf75e0_b.jpg"><img class="flickr-gallery-photo" src="https://farm4.staticflickr.com/3927/15327071408_63486da9b0_b.jpg"><img class="flickr-gallery-photo" src="https://farm3.staticflickr.com/2946/15507012805_063ca3c9b1_b.jpg"><img class="flickr-gallery-photo" src="https://farm4.staticflickr.com/3952/15483868046_b1369ff9de_b.jpg"><img class="flickr-gallery-photo" src="https://farm3.staticflickr.com/2945/15510842475_329548e49c_b.jpg"><img class="flickr-gallery-photo" src="https://farm4.staticflickr.com/3951/15345391848_efc87fce1e_b.jpg"><img class="flickr-gallery-photo" src="https://farm4.staticflickr.com/3935/15349508750_f24f1903e3_b.jpg"><img class="flickr-gallery-photo" src="https://farm6.staticflickr.com/5614/15330218657_41e1764721_b.jpg"><img class="flickr-gallery-photo" src="https://farm4.staticflickr.com/3935/15508092492_5fdddb4074_b.jpg"><img class="flickr-gallery-photo" src="https://farm4.staticflickr.com/3931/15321105998_778686f8de_b.jpg"><img class="flickr-gallery-photo" src="https://farm4.staticflickr.com/3930/15499824391_a6563aafd9_b.jpg"><img class="flickr-gallery-photo" src="https://farm6.staticflickr.com/5612/15313508360_498dd4b092_b.jpg"><img class="flickr-gallery-photo" src="https://farm6.staticflickr.com/5599/15488226212_4a85a036d7_b.jpg"><img class="flickr-gallery-photo" src="https://farm4.staticflickr.com/3928/15469793275_f03d63dfd5_b.jpg"><img class="flickr-gallery-photo" src="https://farm4.staticflickr.com/3932/15283175958_b39f1f9438_b.jpg"><img class="flickr-gallery-photo" src="https://farm6.staticflickr.com/5601/15313666088_a1dd846beb_b.jpg"></div>';
}

function fakeAlbum() {
	return {
		"photoset": {
			"id": "72157648055335157",
			"primary": "15277994660",
			"owner": "44297180@N05",
			"ownername": "jorg.thuijls",
			"photo": [{
				"id": "15277994660",
				"secret": "4aa022259f",
				"server": "3932",
				"farm": 4,
				"title": "307",
				"isprimary": 0,
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0
			}, {
				"id": "15277994330",
				"secret": "01292ae200",
				"server": "3927",
				"farm": 4,
				"title": "308",
				"isprimary": 0,
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0
			}, {
				"id": "15278125177",
				"secret": "abfe618d6a",
				"server": "3932",
				"farm": 4,
				"title": "309",
				"isprimary": 0,
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0
			}, {
				"id": "15277993500",
				"secret": "eefcebbd33",
				"server": "3931",
				"farm": 4,
				"title": "310",
				"isprimary": 0,
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0
			}, {
				"id": "15277993030",
				"secret": "f9a0fb6763",
				"server": "3933",
				"farm": 4,
				"title": "311",
				"isprimary": 0,
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0
			}, {
				"id": "15278066108",
				"secret": "8b85d4bf9f",
				"server": "5597",
				"farm": 6,
				"title": "312",
				"isprimary": 0,
				"ispublic": 1,
				"isfriend": 0,
				"isfamily": 0
			}],
			"page": 1,
			"per_page": "500",
			"perpage": "500",
			"pages": 1,
			"total": 6,
			"title": "Test"
		},
		"stat": "ok"
	}
}

function fakeHTMLAlbum() {
	return '<div class="flickr-album" id="72157648055335157"><h1 class="flickr-album-title">Test</h1><img class="flickr-gallery-photo" src="https://farm4.staticflickr.com/3932/15277994660_4aa022259f_b.jpg"><img class="flickr-gallery-photo" src="https://farm4.staticflickr.com/3927/15277994330_01292ae200_b.jpg"><img class="flickr-gallery-photo" src="https://farm4.staticflickr.com/3932/15278125177_abfe618d6a_b.jpg"><img class="flickr-gallery-photo" src="https://farm4.staticflickr.com/3931/15277993500_eefcebbd33_b.jpg"><img class="flickr-gallery-photo" src="https://farm4.staticflickr.com/3933/15277993030_f9a0fb6763_b.jpg"><img class="flickr-gallery-photo" src="https://farm6.staticflickr.com/5597/15278066108_8b85d4bf9f_b.jpg"></div>';
}