class App.Routers.MainRouter extends Backbone.Router
	routes:
		'':	'index'

	index: ->
		console.log "Backbone is up and running!"
		App.headerRegion.swapAndRenderCurrentView(new App.Views.ClientNav)
		App.contentRegion.swapAndRenderCurrentView(new App.Views.ContentView)
		App.footerRegion.swapAndRenderCurrentView(new App.Views.ClientFooter)