var expect = require('chai').expect;
var Q = require('Q')
var flickr = require('./../src/flickr.async');
var client = require('./../src/flickr.client');
var config = {
	id: '72157648055335157',
	key: '129c18c06e38b4e8dcd8eb714ae7a8e1'
}

describe('/src/flickr.client', function() {

	describe('should exist', function() {

		it('is a function', function(done) {
			expect(client).to.be.an.instanceof(Function);
			done();
		});
	});

	describe('it gets an album', function() {
		it('returns a promise', function(done) {
			expect(client(config).toString()).to.be.equal(Q.defer().promise.toString());
			done();
		});

		it('takes an album id', function(done) {
			client(config).then(function(data) {
				done(data);
			});

		});
	})
});
describe('src/flickr.async', function() {

	describe('should exist', function() {

		it('is a function', function(done) {
			expect(flickr).to.be.an.instanceof(Function);
			done();
		});

	});
});