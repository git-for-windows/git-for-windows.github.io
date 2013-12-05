module.exports = function(grunt) {

	grunt.initConfig({

		cssmin: {
			compress: {
				options: {
					keepSpecialComments: 0,
					report: 'min',
					selectorsMergeMode: 'ie8'
				},
				files: {
					'css/pack.css': [
						'css/reset.css',
						'css/fonts.css',
						'lightbox/css/lightbox.css',
						'css/style.css'
					]
				}
			}
		},

		uglify: {
			options: {
				/*compress: true,*/
				mangle: true,
				preserveComments: false,
				report: 'min'
			},
			compress: {
				files: {
					'js/pack.js': [
						'lightbox/js/lightbox-2.6.min.js'
					]
				}
			}
		},

		connect: {
			server: {
				options: {
					base: './',
					keepalive: true,
					port: 4000
				}
			}
		}

	});

	// Load the grunt plugins
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['cssmin', 'uglify']);
};
