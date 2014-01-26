class App.Routers.MainRouter extends App.Routers.BaseRouter 
	routes:
		'login'								:	'login'
		'logout'							: 'logout'
		'users/new'						: 'usersNew'
		'home'								: 'index'
		''										: 'index'
		'*path'								:	'default'

	# ================================
	# Rutes that needs authentication:
	# ================================
	requiresAuth: [
		''
		'#home'
		'#logout'
		'#users/new'
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
		if needAuth and !isAuth
			# We save the path to return the user to where he intended to go
			# before being redirected to the login page
			App.session.set "redirectFrom", path
			Backbone.history.navigate 'login', {trigger: true}
		else if isAuth and cancelAccess
			# User is authenticated and tries to go to a page only available
			# to un-authenticated users
			Backbone.history.navigate '', {trigger: true}
		else return next()

	after: (params) ->
		@setHeader()
		@setFooter()
		
	setHeader: ->
		headerView = App.headerRegion.currentView
		if App.session.get("authenticated")
			if (headerView? and headerView.name == "ClientNav") or !headerView?
				header = new App.Views.AppNav({model: App.user})
		else
			if (headerView? and headerView.name == "AppNav") or !headerView?
				header = new App.Views.ClientNav({model: App.appDetails})
		if header? then App.headerRegion.swapView(header)

	setFooter: ->
		unless App.footerRegion.currentView?
			footer = new App.Views.ClientFooter({model: App.appDetails})
		if footer? then App.footerRegion.swapView(footer)

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
	# INDEX
	# -----
	index: ->
		App.contentRegion.swapView(new App.Views.ContentView({model: App.user}))
	# DEFAULT
	# -------
	default: ->
		Backbone.history.navigate '', {trigger: true}
	# SESSIONS
	# --------
	login: ->
		App.headerRegion.swapView(new App.Views.ClientNav({model: App.appDetails}))
		App.contentRegion.swapView(new App.Views.Login({model: App.session}))

	logout: (e) ->
		App.session.logout ->  Backbone.history.navigate '#login', { trigger : true }
	# USERS
	# -----
	usersNew: ->
		App.contentRegion.swapView(new App.Views.UsersNew({model: new App.Models.User()}))
