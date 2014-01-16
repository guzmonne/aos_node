describe "App.Config", ->
	before ->
		@router = new App.Routers.MainRouter()
		@config = new App.Config()
		@object = 
				"routes": "routesIndex"
				"routes/new": "routesNew"
				"routes/:id": "routesShow"
				"routes/:id/edit": "routesEdit"

	after ->
		delete @router
		delete @config

	describe "capitalize()", ->
		it "should capitalize the first letter of a string", ->
			string = @config.capitalize "string"
			expect(string).to.equal "String"

	describe "buildRestRoutes(string: route)", ->
		it "should build an object with the rest routes and the method calls", ->
			result = @config.buildRestRoutes("routes")
			expect(result).to.deep.equal(@object)

	describe "buildRestRoutesMethods(object: restRoutes)", ->
		it "should return an object with the correct methods for the route", ->
			results = @config.buildRestRoutesMethods @object
			expect(results).to.be.ok
			keys = _.keys results
			for key in keys
				expect(results[key]).to.be.a("function")

	describe "buildMethodFromRoute(object: routeAndMethodPair)", ->
		it "should return an object with the method and a function", ->
			object = {}
			object["search/:query/p:page"] = "search"
			result = @config.buildMethodFromRoute(object)
			expect(result[object["search"]]).to.be.a("function")

	describe "getParameters(string: route)", ->
		it "should return an array with all the normal parameters", ->
			result = @config.getParameters("search/:query/p:page")
			expect(result)
			  .to.be.an.instanceof(Array).and
			  .to.contain("query").and
			  .to.contain("page")

		it "should return an array with normal and splat parameters", ->
			result = @config.getParameters("file/*path")
			expect(result)
			  .to.be.an.instanceof(Array).and
			  .to.contain("path")

		it "should return an array with normal and optional parameters", ->
			result = @config.getParameters("docs/:section(/:subsection)")
			expect(result)
			  .to.be.an.instanceof(Array).and
			  .to.contain("section").and
			  .to.contain("subsection=null")

		it "should return an array with normal, splat, and optional parameters", ->
			result = @config.getParameters("file/:section(/:subsection)/*path")
			expect(result)
			  .to.be.an.instanceof(Array).and
			  .to.contain("section").and
			  .to.contain("subsection=null").and
			  .to.contain("path")

		it "should return an empty array if there are no parameters", ->
			result = @config.getParameters("route/routes")
			expect(result)
				.to.be.an.instanceof(Array).and
				.to.be.empty

