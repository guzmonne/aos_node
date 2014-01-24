describe "App.Routers.MainRouter", ->
	opts = 
		trigger: true
	
	describe "Routing", ->
		beforeEach ->
			@router = new App.Routers.MainRouter()
			sinon.spy(@router, "login")
			sinon.spy(@router, "before")
			sinon.spy(@router, "index")
			sinon.spy(@router, "register")

		afterEach ->
			@router.login.restore()
			@router.before.restore()
			@router.index.restore()
			@router.register.restore()
			delete @router
			
		it "should send to login if user is not auth", ->
			@router.navigate "home", opts
			expect(@router.before).to.have.been.calledTwice
			expect(App.session.get('redirectFrom')).to.equal("#home") 
			expect(Backbone.history.location.hash).to.equal("#login")

		it "should redirect to home if trying to access a page that a logged in user should not see"

		it "should route to the page if no authorization is needed", ->
			@router.navigate "register", opts
			expect(Backbone.history.location.hash).to.equal("#register")
			expect(@router.before).to.be.calledOnce
