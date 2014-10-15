module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		mochaTest: {
			specs: {
				options: {
					ui: 'bdd',
					reporter: 'spec',
					require: './spec/helpers/chai'
				},
				src: ['spec/*.spec.js', 'spec/**/*.spec.js']
			}
		},

		jshint: {
			// define the files to lint
			files: ['index.js', 'flickrn.js', 'src/*.js', 'spec/*.js', 'spec/**/*.js'],
			// configure JSHint (documented at http://www.jshint.com/docs/)
			options: {
				// more options here if you want to override JSHint defaults
				globals: {
					console: true,
					module: true
				}
			}
		},
		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['jshint', 'shell:mocha']
		}
	});

	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-mocha-test');

	grunt.registerTask('default', [
		'jshint', 'mochaTest'
	]);
};