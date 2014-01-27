class App.Regions.BaseRegion extends Backbone.View 
	container: null
	currentView: null

	initialize: (options={}) ->
		if options.container? then @container     = options.container
		if options.currentView? then @currentView = options.currentView
		if @awake then @awake()
		@innerViews = []

	swapCurrentView: (newView) ->
		if @currentView then @currentView.close()
		@currentView = newView

	swapView: (newView) ->
		@swapCurrentView(newView)
		@renderView()

	renderView: (view = null) ->
		unless @container?
			throw new Error('You must set the container property before calling this function')
		unless @currentView?
			unless view?
				throw new Error('You must set the currentView or pass a new view to be rendered')
			@swapCurrentView(view)
		view = @currentView unless view?
		$(@container).append(view.render().el)
		this