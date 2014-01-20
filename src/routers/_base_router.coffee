class App.Routers.BaseRouter extends Backbone.Router 
	before: ->

	after: ->

	route: (route, name, callback) ->
		route = @_routeToRegExp(route) unless _.isRegExp(route)
		if _.isFunction(name)
			callback = name
			name = ""
		callback = this[name] unless callback
		router = this
		Backbone.history.route route, (fragment) =>
			args = router._extractParameters(route, fragment)
			next = -> 
				callback and callback.apply(router, args)
				router.trigger.apply router, ["route:" + name].concat(args)
				router.trigger "route", name, args
				Backbone.history.trigger "route", router, name, args
				router.after.apply router, args
			router.before.apply router, [args, next]