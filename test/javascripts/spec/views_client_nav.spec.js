describe("App.Views.ClientNav", function(){
	beforeEach(function(){
		this.view = new App.Views.ClientNav({
			container: this.$fixture
		});
		this.view.renderIn("#fixtures");
	});

	afterEach(function(){
		$('#fixtures').empty();
		this.view.remove();
	});

	describe("events", function(){
		it("fires events on 'view' click");
	});

	describe("menu bar displays", function(){
		it("has home nav active by default", function(){
			// Check for some nav to have the 'active' tag and has 'Home' as text
			expect($('#fixtures ul.nav.navbar-nav li.active')).to.have.length(1);
			expect($('#fixtures ul.nav.navbar-nav li.active a').attr("id")).to.equal("nav-home");
		});

		it("updates nav on 'about' click");

		it("updates nav on 'home' click");

		it("updates nav on 'contact' click");
	});
});