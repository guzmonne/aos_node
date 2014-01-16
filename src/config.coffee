class App.Config

	capitalize: (string) ->
		string.charAt(0).toUpperCase() + string.slice(1);

	getParameters: (route) ->
		results = []
		optionals = route.match /\((.*?)\)/g
		if optionals? then for optional in optionals
			route = route.replace("#{optional}", "")
			results.push "#{optional.replace(/\(\/:/, "").replace(/\)/, "")}=null"
		normals = route.match /(\(\?)?:\w+/g
		if normals? then for normal in normals
			results.push normal.replace(/:/, "")
		splats = route.match /\*\w+/g
		if splats? then for splat in splats
			results.push splat.replace(/\*/, "")
		return results

	buildMethodFromRoute: (routeAndMethodPair) ->
		object = {}
		object[_.values(routeAndMethodPair)[1]] = ->
			return "Not yet implemented"
		return object

	buildRestRoutesMethods: (restRoutes) ->
		results = {}
		for pair in _.pairs restRoutes
			_.extend results, @buildMethodFromRoute(pair)
		return results

	buildRestRoutes: (strings) ->
		result = {}
		result[strings] = "#{strings}Index" 
		result[strings + "/new"] = "#{strings}New" 
		result[strings + "/:id"] = "#{strings}Show" 
		result[strings + "/:id/edit"] = "#{strings}Edit" 
		return result 
