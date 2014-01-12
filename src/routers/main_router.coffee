class App.Routers.MainRouter extends Backbone.Router
	routes:
		'':	'index'

	index: ->
		console.log "Backbone is up and running!"
		App.headerRegion.render()
		App.contentRegion.render()
		App.footerRegion.render()