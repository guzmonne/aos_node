class App.Regions.BaseRegion extends Backbone.View 
	container: null
	currentView: null

	initialize: (options) ->
		if options.container? then @container = options.container
		if options.currentView? then @currentView = options.currentView
	
	setView: (newView, oldView) =>
		if oldView == null 
		  oldView = newView
		  return  
		else if oldView.cid != newView.cid
			oldView.remove()
			oldView = null
			oldView = newView

	render: (view) =>	
		if (view? and @currentView?)
			return false
		else
			view = @currentView
		$(@container).html('')
		@setView(view, @currentView)
		$(@container).append(@currentView.render().el)
		this