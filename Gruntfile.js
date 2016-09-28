/* jshint node:true */
module.exports = function( grunt ) {
	'use strict';

	grunt.initConfig({

		// Minify .js files.
		uglify: {
			options: {
				preserveComments: 'some'
			},
			main: {
				files: [{
					expand: true,
					cwd: 'assets/js/',
					src: [
						'*.js',
						'!*.min.js'
					],
					dest: 'assets/js/',
					ext: '.min.js'
				}]
			},
		},

		// Compile all .scss files.
		sass: {
			dist: {
				options: {
					require: 'susy',
					sourcemap: 'none',
					includePaths: require( 'node-bourbon' ).includePaths
				},
				files: [{
					'theme.css': 'theme.scss',
				}]
			}
		},

		// Minify all .css files.
		cssmin: {
			main: {
				files: {
					'theme.css': ['theme.css']
				}
			},
		},

		// Watch changes for assets.
		watch: {
			css: {
				files: [
					'theme.scss',
				],
				tasks: [
					'sass',
					'css'
				]
			},
			js: {
				files: [
					// main js
					'assets/js/*js',
					'!assets/js/*.min.js',
				],
				tasks: [
				  //'jshint',
          'uglify'
        ]
			}
		},

		// Generate POT files.
		makepot: {
			options: {
				type: 'wp-theme',
				domainPath: 'languages',
				potHeaders: {
					'report-msgid-bugs-to': 'https://github.com/woothemes/storefront/issues',
					'language-team': 'LANGUAGE <EMAIL@ADDRESS>'
				}
			},
			frontend: {
				options: {
					potFilename: 'cadeau-2016.pot',
					exclude: [
						'../storefront/.*' // Exclude deploy directory
					]
				}
			}
		},

		// Check textdomain errors.
		checktextdomain: {
			options:{
				text_domain: 'cadeau-2016',
				keywords: [
					'__:1,2d',
					'_e:1,2d',
					'_x:1,2c,3d',
					'esc_html__:1,2d',
					'esc_html_e:1,2d',
					'esc_html_x:1,2c,3d',
					'esc_attr__:1,2d',
					'esc_attr_e:1,2d',
					'esc_attr_x:1,2c,3d',
					'_ex:1,2c,3d',
					'_n:1,2,4d',
					'_nx:1,2,4c,5d',
					'_n_noop:1,2,3d',
					'_nx_noop:1,2,3c,4d'
				]
			},
			files: {
				src:  [
					'**/*.php', // Include all files
					'!node_modules/**' // Exclude node_modules/
				],
				expand: true
			}
		},

		// Creates deploy-able theme
		copy: {
			deploy: {
				src: [
					'**',
					'!.*',
					'!*.md',
					'!.*/**',
					'.htaccess',
					'!Gruntfile.js',
					'!package.json',
					'!node_modules/**',
					'!.DS_Store',
					'!npm-debug.log'
				],
				dest: 'cadeau-2016',
				expand: true,
				dot: true
			}
		},

		// RTLCSS
		rtlcss: {
			options: {
				config: {
					swapLeftRightInUrl: false,
					swapLtrRtlInUrl: false,
					autoRename: false,
					preserveDirectives: true
				},
				properties : [
					{
						name: 'swap-fontawesome-left-right-angles',
						expr: /content/im,
						action: function( prop, value ) {
							if ( value === '"\\f105"' ) { // fontawesome-angle-left
								value = '"\\f104"';
							}
							if ( value === '"\\f178"' ) { // fontawesome-long-arrow-right
								value = '"\\f177"';
							}
							return { prop: prop, value: value };
						}
					}
				]
			},
			
		}
	});

	// Load NPM tasks to be used here
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-sass' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-wp-i18n' );
	grunt.loadNpmTasks( 'grunt-checktextdomain' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-rtlcss' );

	// Register tasks
	grunt.registerTask( 'default', [
		'css',
		//'jshint',
		'uglify'
	]);

	grunt.registerTask( 'css', [
		'sass',
		'cssmin',
		'rtlcss'
	]);

	grunt.registerTask( 'dev', [
		'default',
		'makepot'
	]);

	grunt.registerTask( 'deploy', [
		'copy'
	]);
};
