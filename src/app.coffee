window.App = 
	Models     : {}
	Collections: {}
	Routers    : {}
	Views      : {}
	Regions    : {}
	Mixins     : {}
	Config     : {}

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
	user			: null
	awake: ->
		# Initialize Models
		# -----------------
		@appDetails = new App.Models.Application()
		@session    = new App.Models.Session()
		@user				= new App.Models.User()
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

	sseInit: ->
		# Check if SSE is possible
		if !!window.EventSource
			# SSE SOURCE
			# ----------
			@vent.source = new EventSource "/sse"
			# SSE CONNECTION
			# --------------
			@vent.source.addEventListener 'sse::connection', (e) -> 
				# Debug
				console.log e
			# SSE ONMESSAGE
			# -------------
			@vent.source.onmessage = (event) =>
				# Debug
				#console.log event
				data = JSON.parse event.data
				event = data.event
				delete data.event
				# Monitor all server sent events
				console.log data
				@vent.trigger event, data
			# SSE ONERROR
			# -----------
			@vent.source.onerror = (event) ->
				switch event.target.readyState
					when EventSource.CONNECTING
						break
					when EventSource.CLOSED
						console.log "Connection failed. Will not retry."
						break
		else
			console.log "EventSource not supported."

$(document).ready ->
	App.awake()
