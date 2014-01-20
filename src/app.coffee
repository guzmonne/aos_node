window.App = 
	Models: {}
	Collections: {}
	Routers: {}
	Views: {}
	Regions: {}
	Mixins: {}
	Config: {}

	vent: _.extend({}, Backbone.Events)
	# =======
	# Regions
	# =======
	headerRegion : null
	contentRegion: null
	footerRegion : null 
	# ======
	# Models
	# ======
	appDetails: null
	session   : null
	awake: ->
		# Initialize Models
		# -----------------
		@appDetails = new App.Models.Application()
		@session    = new App.Models.Session()
		# Initialize Regions
		# ------------------
		@headerRegion  = new App.Regions.HeaderRegion()
		@contentRegion = new App.Regions.ContentRegion()
		@footerRegion  = new App.Regions.FooterRegion()
		App.start()

	start: ->
		@session.getAuth (response) ->
			new App.Routers.MainRouter()
			Backbone.history.start()

$(document).ready ->
	App.awake()
