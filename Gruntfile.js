module.exports = function(grunt){
	// Project Configuration
	grunt.initConfig({
		mocha: {
			test: {
				options: {
					reporter: 'Spec',
					urls: ['http://localhost:3000/test.html']
				}
			},
			server: {
				options: {
					reporter: 'Spec',
					src     : ['test/server/specs/**/*.spec.js', 'test/server/specs/*.spec.js']
				}
			}
		},
		concurrent: {
			options: {
      	logConcurrentOutput: true
      },
			watch: ['watch:src', 'watch:spec', 'watch:serverTest']
		},
		jshint: {
			test: {
				options: {
					jshintrc: './.jshintrc'	
				},
				src: ['test/javascripts/spec/*.js']
			}
		},
		watch: {
			src: {
				files: ['src/**/*'],
				tasks: ['clean' 
							,	'concat:models'
							,	'concat:collections'
							,	'concat:views'
							,	'concat:regions'
							,	'concat:routers'
							,	'coffee:compile'
							,	'handlebars'
							,	'concat:handlebars'
							,	'concat:client'
							,	'clean:cleanClientBuild'
							//, 'mocha:test'
							]
			},
			spec: {
				files: ['test/javascripts/spec/*.spec.js', 'test/javascripts/spec/*.spec.coffee'],
				//tasks: ['concat:js_specs', 'concat:coffee_specs', 'coffee:specs', 'concat:all_specs', 'clean:specs', 'mocha:test']
				tasks: ['concat:js_specs', 'concat:coffee_specs', 'coffee:specs', 'concat:all_specs', 'clean:specs']
			},
			test: {
				files: ['test/javascripts/allspecs.spec.js', 'public/javascripts/client.js'],
				tasks: ['mocha:test']
			},
			serverTest: {
				files: ['test/server/coffee_specs/**/*.spec.coffee'],
				tasks: ['coffee:serverSpecs']
			}
		},
		clean: {
			coffeeClientBuild: ["src/client.coffee", 'public/javascripts/coffeescripts.js', 'public/javascripts/client.js'],
			hbsClientBuild: ['src/templates/compiled', 'public/javascripts/templates.js'],
			cleanClientBuild: [ 'public/javascripts/*template.js'
												, 'public/javascripts/templates.js'
												, 'public/javascripts/models.js'
												, 'public/javascripts/collections.js'
												, 'public/javascripts/views.js'
												, 'public/javascripts/regions.js'
												, 'public/javascripts/routers.js'
												, 'public/javascripts/models.coffee'
												, 'public/javascripts/collections.coffee'
												, 'public/javascripts/views.coffee'
												, 'public/javascripts/regions.coffee'
												, 'public/javascripts/routers.coffee'
												, 'public/javascripts/app.js'
												, 'public/javascripts/config.js'
												],
			//jsOnSrc: ['src/**/*.js'],
			specs: ['test/javascripts/allspecs.spec.coffeescripts.js'
						,	'test/javascripts/allspecs.spec.javascripts.js'
						, 'test/javascripts/allspecs.spec.coffeescripts.coffee']
		},
		concat: {
			options: {
				separator: "\n",
			},
			handlebars: {
				src: ["src/templates/_helpers/*.js", "public/javascripts/*-template.js"],
				dest: "public/javascripts/templates.js"
			},
			models: {
				src: "src/models/*.coffee",
				dest: "public/javascripts/models.coffee"
			},
			collections: {
				src: "src/collections/*.coffee",
				dest: "public/javascripts/collections.coffee"
			},
			regions: {
				src: "src/regions/*.coffee",
				dest: "public/javascripts/regions.coffee"
			},
			views: {
				src: ["src/views/*.coffee", "src/views/**/*.coffee"],
				dest: "public/javascripts/views.coffee"
			},
			routers: {
				src: "src/routers/*.coffee",
				dest: "public/javascripts/routers.coffee"
			},
			client: {
				src: ["public/javascripts/app.js"
						, "public/javascripts/config.js" 
						, "public/javascripts/templates.js"
						, "public/javascripts/models.js"
						, "public/javascripts/collections.js"
						, "public/javascripts/regions.js"
						, "public/javascripts/views.js"
						, "public/javascripts/routers.js"],
				dest: 'public/javascripts/client.js'
			},
			js_specs: {
				src: ['test/javascripts/spec/*.spec.js'],
				dest: 'test/javascripts/allspecs.spec.javascripts.js'
			},
			coffee_specs: {
				src: ['test/javascripts/spec/*.spec.coffee'],
				dest: 'test/javascripts/allspecs.spec.coffeescripts.coffee'
			},
			all_specs: {
				src: ['test/javascripts/allspecs.spec.coffeescripts.js'
						,	'test/javascripts/allspecs.spec.javascripts.js'],
				dest: 'test/javascripts/allspecs.spec.js'
			}
		},
		coffee: {
			compile: {
				options: {
					bare: true
				},
				files: {
					'public/javascripts/app.js'        : 'src/app.coffee',
					'public/javascripts/config.js'     : 'src/config.coffee',
					'public/javascripts/models.js'     : 'public/javascripts/models.coffee',
					'public/javascripts/collections.js': 'public/javascripts/collections.coffee',
					'public/javascripts/regions.js'    : 'public/javascripts/regions.coffee',
					'public/javascripts/views.js'      : 'public/javascripts/views.coffee',
					'public/javascripts/routers.js'    : 'public/javascripts/routers.coffee',
				}	
			},
			specs: {
				options: {
					bare: true
				},
				files: {
					'test/javascripts/allspecs.spec.coffeescripts.js': 'test/javascripts/allspecs.spec.coffeescripts.coffee'
				}
			},
			require: {
				options: {
					bare: true
				},
				expand : true,
				flatten: false,
				cwd    : 'src/',
				src    : ['**/*.coffee'],
				dest   : 'public/javascripts/',
				ext    : '.js'
			},
			serverSpecs: {
				options: {
					bare: true
				},
				expand : true,
				flatten: false,
				cwd    : 'test/server/coffee_specs/',
				src    : '**/*spec.coffee',
				dest   : 'test/server/specs',
				ext    : '.spec.js'
			}
		}, 
		handlebars: {
			compile: {
				options: {
					namespace: "HBS"
				},
				files: [ 
					{
						expand: true,
						src: 'src/**/*.hbs',
						flatten: true,
						dest: 'public/javascripts/',
						ext: '-template.js'
					}
				]
			}
		},
		imagemin: {                        
	    jpg: {                         
	      options: {                      
	        progressive: true
	      },
	      files: [{
	        expand: true,
	        cwd: 'public/images/raw',                
	        src: ['*.jpg'],  
	        dest: 'public/images'                
      	}]
	    }
	  }
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-mocha');

	// Tasks
	grunt.registerTask('default', [ 'clean' 
	                   						, 'concat:models'
	                   						, 'concat:collections'
	                   						, 'concat:regions'
	                   						, 'concat:views'
	                   						, 'concat:routers'
	                   						, 'coffee:compile'
	                   						, 'handlebars'
	                   						, 'concat:handlebars'
	                   						, 'concat:client'
	                   						, 'clean:cleanClientBuild']);

	grunt.registerTask('compileHandlebars', ['handlebars:compile']);
	grunt.registerTask('watchTasks', ['concurrent:srcAndSpecWatch']);
	grunt.registerTask('imagejpg', ['imagemin:jpg']);
}