class App.Regions.BaseRegion extends Backbone.View 
	container: null
	currentView: null

	initialize: (options={}) ->
		if options.container? then @container = options.container
		if options.currentView? then @currentView = options.currentView

	swapCurrentView: (newView) ->
		if @currentView then @currentView.remove()
		@currentView = newView

	swapAndRenderCurrentView: (newView) ->
		@swapCurrentView(newView)
		@render()

	render: ->
		return unless (@currentView? and @container?)
		$(@container).append(@currentView.render().el)
		this