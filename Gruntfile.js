module.exports = function(grunt){
	// Project Configuration
	grunt.initConfig({
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
							,	'clean:cleanClientBuild']
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
												],
			jsOnSrc: ['src/**/*.js']
		},
		concat: {
			options: {
				separator: "\n",
			},
			handlebars: {
				src: "public/javascripts/*-template.js",
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
				src: "src/views/*.coffee",
				dest: "public/javascripts/views.coffee"
			},
			routers: {
				src: "src/routers/*.coffee",
				dest: "public/javascripts/routers.coffee"
			},
			client: {
				src: ["public/javascripts/app.js" 
						, "public/javascripts/templates.js"
						, "public/javascripts/models.js"
						, "public/javascripts/collections.js"
						, "public/javascripts/regions.js"
						, "public/javascripts/views.js"
						, "public/javascripts/routers.js"],
				dest: 'public/javascripts/client.js'
			}
		},
		coffee: {
			compile: {
				options: {
					bare: true
				},
				files: {
					'public/javascripts/app.js': 'src/app.coffee',
					'public/javascripts/models.js': 'public/javascripts/models.coffee',
					'public/javascripts/collections.js': 'public/javascripts/collections.coffee',
					'public/javascripts/regions.js': 'public/javascripts/regions.coffee',
					'public/javascripts/views.js': 'public/javascripts/views.coffee',
					'public/javascripts/routers.js': 'public/javascripts/routers.coffee',
				}	
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
		}
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-handlebars');

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
}