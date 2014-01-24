class App.Routers.MainRouter extends App.Routers.BaseRouter 
	routes:
		'login'								:	'login'
		'register'						: 'register'
		'home'								: 'index'
		''										: 'index'
		'*path'								:	'default'

	# ================================
	# Rutes that needs authentication:
	# ================================
	requiresAuth: [
		''
		'#home'
	]

	# ====================================================================
	# Routes that should be not be accessible if the user is authenticated
	# ====================================================================
	preventAccessWhenAuth: [
		"#login"
	]

	before: (params, next) ->
		# Checking if user is authenticated or not
		# Then check if the path requires authentication
		isAuth       = App.session.get 'authenticated'
		path         = Backbone.history.location.hash
		needAuth     = _.contains @requiresAuth, path
		cancelAccess = _.contains @preventAccessWhenAuth, path
		console.log isAuth, path, needAuth, cancelAccess
		if needAuth and !isAuth
			# We save the path to return the user to where he intended to go
			# before being redirected to the login page
			App.session.set "redirectFrom", path
			Backbone.history.navigate 'login', {trigger: true}
		else if isAuth and cancelAccess
			# User is authenticated and tries to go to a page only available
			# to un-authenticated users
			Backbone.history.navigate '', {trigger: true}
		else
			# No problem, let him pass
			return next()

	after: (params) ->
		return if (App.headerRegion.currentView? and App.footerRegion.currentView?)
		footer = new App.Views.ClientFooter({model: App.appDetails})
		if App.session.get "authenticated"
			header = new App.Views.AppNav({model: App.user})
		else
			header = new App.Views.ClientNav({model: App.appDetails})
		App.headerRegion.swapAndRenderCurrentView(header)
		App.footerRegion.swapAndRenderCurrentView(footer)

	fetchError: (error) ->
		# If during fetching data from server, session expired and server
		# send 401, call getAuth() to get the new CSRF and reset the 
		# session settings and then redirect the user to login
		if error.status == 401
			App.session.getAuth ->
				Backbone.history.navigate 'login', {trigger: true}

	# ==============
	# Route Handlers
	# ==============
	index: ->
		App.contentRegion.swapAndRenderCurrentView(new App.Views.ContentView({model: App.user}))
		App.headerRegion.swapAndRenderCurrentView(new App.Views.AppNav({model: App.user}))

	default: ->
		Backbone.history.navigate '', {trigger: true}

	login: ->
		App.headerRegion.swapAndRenderCurrentView(new App.Views.ClientNav({model: App.appDetails}))
		App.contentRegion.swapAndRenderCurrentView(new App.Views.Login({model: App.session}))

	register: ->
		App.contentRegion.swapAndRenderCurrentView(new App.Views.Register({model: new App.Models.User()}))


