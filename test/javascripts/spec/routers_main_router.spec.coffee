describe "App.Routers.MainRouter", ->
	opts = 
		trigger: true
		replace: true

	before ->
		@router = new App.Routers.MainRouter()
		# Stub all route methods
		for route in _.values @router.routes
			sinon.stub App.Routers.MainRouter.prototype, route
		@routePairs = _.pairs(@router.routes)
		@testRoute = (route, callback) ->
			@router.navigate(route, opts)
			expect(App.Routers.MainRouter.prototype[callback]).to.have.been.calledOnce
			#expect(@routerSpy).to.have.been.calledOnce

	beforeEach ->	
		# Create router with stubs and manual fakes
		@router = new App.Routers.MainRouter()
		@routerSpy = sinon.spy()
		@router.on "route", @routerSpy

	after ->
		Backbone.history.stop()
		for pair in @routePairs
			App.Routers.MainRouter.prototype[pair[1]].restore()
	
	it "should route correctly all routes", ->
		for pair in @routePairs
			@testRoute(pair[0], pair[1])
