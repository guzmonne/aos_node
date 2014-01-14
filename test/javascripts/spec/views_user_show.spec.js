describe("App.Views.UserShow", function(){
	before(function(){
		// Create the test fixture
		this.$fixture = $('<div id="userShow-view-fixture"></div>'); 
	});

	beforeEach(function(){
		// Empty out and rebind the fixture for each run
		this.$fixture.empty().appendTo($("#fixtures"));

		// New default model and view for each test
		// Creation calls 'render()', so in the tests we have an 
		// *already rendered* view
		this.view = new App.Views.NoteView({
			el: this.$fixture,
			model: new App.Models.User()
		});
	});

	afterEach(function(){
		// Destroying the model also destroys the view
		this.view.model.destroy();
	});

	after(function(){
		// Remove all subfixes after test suite finishes 
		$('#fixtures').empty();
	});

	it("can render an empty user")
});