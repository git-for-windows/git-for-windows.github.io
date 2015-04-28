module.exports = function(grunt) {

	grunt.initConfig({

		md2html: {
			options: {
				layout: 'markdown-template.html'
			},
			governance: {
				files: [{
					src: ['governance-model.md'],
					dest: 'governance-model.html'
				}]
			}
		},

		cssmin: {
			compress: {
				options: {
					keepSpecialComments: 0,
					report: 'min',
					selectorsMergeMode: 'ie8'
				},
				files: {
					'css/pack.css': [
						'css/normalize.css',
						'css/jquery.fancybox.css',
						'css/style.css',
						'css/small.css'
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
						'js/jquery-1.10.2.min.js',
						'js/jquery.fancybox.js',
						'js/jquery.mousewheel.js'
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
	grunt.loadNpmTasks('grunt-md2html');

	grunt.registerTask('default', ['cssmin', 'uglify', 'md2html']);
};
