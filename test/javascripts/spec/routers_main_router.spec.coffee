describe "App.Routers.MainRouter", ->
	opts = 
		trigger: true
	
	describe "Router", ->
		beforeEach ->
			@router = new App.Routers.MainRouter()
			sinon.spy(@router, "login")
			sinon.spy(@router, "before")
			sinon.spy(@router, "index")
			sinon.spy(@router, "usersNew")

		afterEach ->
			@router.login.restore()
			@router.before.restore()
			@router.index.restore()
			@router.usersNew.restore()
			delete @router
			
		it "should send to login if user is not auth", ->
			@router.navigate "home", opts
			expect(@router.before).to.have.been.calledTwice
			expect(App.session.get('redirectFrom')).to.equal("#home") 
			expect(Backbone.history.location.hash).to.equal("#login")

		it "should redirect to home if trying to access a page that a logged in user should not see"

		it "should route to the page if no authorization is needed", ->
			Backbone.history.navigate "login", opts
			expect(Backbone.history.location.hash).to.equal("#login")
