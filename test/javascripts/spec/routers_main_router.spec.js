describe("App.Routers.MainRouter", function(){
	// Default option: Trigger and replace history
	var opts = {trigger: true, replace: true};

	beforeEach(function(){
		// Stub route methods
		sinon.stub(App.Routers.MainRouter.prototype, "index");

		// Create router with stubs and manual fakes
		this.router =  new App.Routers.MainRouter();

		// Spy on all route events
		this.routerSpy = sinon.spy();
		this.router.on("route", this.routerSpy);
	});

	afterEach(function(){
		Backbone.history.stop();

		App.Routers.MainRouter.prototype.index.restore();
	});

	it("can route to index", function(){
		this.router.navigate("", opts);

		// Check router method
		expect(App.Routers.MainRouter.prototype.index).to.have.been.calledOnce;

		// Check route event
		expect(this.routerSpy).to.have.been.calledOnce;
	});	
});