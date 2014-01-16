class App.Routers.MainRouter extends Backbone.Router 
	routes:
		'users'    						: 'usersIndex'
		'users/new'						:	'usersNew'
		'users/:id'						: 'usersShow'
		'users/:id/edit'			: 'usersEdit'
		''          					:	'index'

	awake: ->
		console.log this

	index: ->
		console.log "Backbone is up and running!"
		App.headerRegion.swapAndRenderCurrentView(new App.Views.ClientNav)
		App.contentRegion.swapAndRenderCurrentView(new App.Views.ContentView)
		App.footerRegion.swapAndRenderCurrentView(new App.Views.ClientFooter)

	usersIndex: ->
		console.log "Not yet implemented"

	usersEdit: ->
		console.log "Not yet implemented"

	usersShow: ->
		console.log "Not yet implemented"

	usersNew: ->
		console.log "Not yet implemented"
