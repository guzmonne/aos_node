describe "App.Views.ClientNav", ->
	beforeEach ->
		@view = new App.Views.ClientNav {container: @$fixture}
		@view.renderIn('#fixtures')

	afterEach ->
		$('#fixtures').empty()
		@view.remove()

	describe "events", ->
		it "fires events on 'view' click"

	describe "menu bar displays", ->
		it "has home nav active by default", ->
			# Check for some nav to have the 'active' tag is the 'Home' tag
			expect($('#fixtures ul.nav.navbar-nav li.active')).to.have.length 1
			expect($('#fixtures ul.nav.navbar-nav li.active a').attr("id")).to.equal("nav-home")

		it "activates the 'nav-about' button on click" 
		it "activates the 'nav-home' button on click" 
		it "activates the 'nav-contact' button on click" 