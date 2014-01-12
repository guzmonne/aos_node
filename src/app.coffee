window.App = 
	Models: {}
	Collections: {}
	Routers: {}
	Views: {}
	Regions: {}
	Mixins: {}

	vent: _.extend({}, Backbone.Events)
	# Regions
	# -------
	headerRegion: null
	contentRegion: null
	footerRegion: null 
	# Models
	# ------
	appDetails: null

	awake: ->
		# Initialize Models
		# -----------------
		@appDetails = new App.Models.Application()
		# Initialize Regions
		# ------------------
		@headerRegion  = new App.Regions.HeaderRegion({currentView: new App.Views.ClientNav()})
		@contentRegion = new App.Regions.ContentRegion({currentView: new App.Views.ContentView()})
		@footerRegion = new App.Regions.FooterRegion({currentView: new App.Views.ClientFooter()})
		App.start()

	start: ->
		new App.Routers.MainRouter()
		Backbone.history.start({pushState: true})

$(document).ready ->
	App.awake()
