describe('App', function(){
	it("provides the 'App' object and basisc app functionalities", function(){
		// Expect exists and is an object
		expect(window.App).to.be.an('object');

		// Expect all namespace properties are present
		expect(window.App).to.include.keys( "Config"
		                           , "Collections"
		                           , "Models"
		                           , "Routers"
		                           , "Views"
		                           , "Regions");
	});
});
function check(done, f){
	try {
		f();
		done();
	} catch(e) {
		done(e);
	}
}

describe("BDD Example", function(){
	// Runs once before all tests starts
	before(function(){
		this.hello = function(){
			return "Hello, World!";
		};
	});

	// Runs once when all tests finish
	after(function(){
		this.hello = null;
	});

	it("should return expected string result", function(){
		expect(this.hello()).to
			.be.a("string").and
			.equal("Hello, World!");
	});
});
describe("App.Collections.Users", function(){
	beforeEach(function(){
		this.server = sinon.fakeServer.create();
		this.server.autoRespond = true;
		this.users = new App.Collections.Users();
	});

	afterEach(function(){
		this.server.restore();
	});

	describe("retrieval", function(){
		it("has a single user", function(done){
			var users = this.users, user;

			// Returns a single model on GET
			this.server.respondWith("GET", "/api/users", [
			                        200, 
			                        {"Content-Type": "application/json"}, 
			                        JSON.stringify([{
			                        	name: "Guzman Monne", 
			                        	email: "guzmonne@hotmail.com",
			                        	phone: "6967896", 
			                        	cellphone: "789456312",
			                        	rememberToken: "jdsdfdf5dfd54f5v5fvt7499q49s3c21c2b31"
			                        }])
			                        ]);
			// After fetch
			users.once("reset", function(){
				expect(users).to.have.length(1);

				// Check model attributes
				user = users.at(0);
				expect(user).to.be.ok;
				expect(user.get("name")).to.contain("Guzman Monne");
				expect(user.get("email")).to.contain("guzmonne@hotmail.com");
				expect(user.get("phone")).to.contain("6967896");
				expect(user.get("cellphone")).to.contain("789456312");
				expect(user.get("rememberToken")).to.contain("jdsdfdf5dfd54f5v5fvt7499q49s3c21c2b31");
				expect(user.get("id")).to.be.a("number");
				expect(user.get("createdAt")).to.be.a("Date");
				expect(user.get("updatedAt")).to.be.a("Date");
				done();
			});

			users.fetch({reset: true});
		});
	});

	describe("creation", function(){
		it("has default values", function(){
			expect(this.users).to.be.ok;
			expect(this.users).to.have.length(0);
		});

		it("should be empty on fetch", function(done){
			var users = this.users;

			this.server.respondWith("GET", "/api/users", [
			                        200, 
			                        {"Content-Type": "application/json"}, 
			                        JSON.stringify([{
			                        	name: "Guzman Monne", 
			                        	email: "guzmonne@hotmail.com",
			                        	phone: "6967896", 
			                        	cellphone: "789456312",
			                        	rememberToken: "jdsdfdf5dfd54f5v5fvt7499q49s3c21c2b31"
			                        }])
			                        ]);
			
			// "reset" event fires on successful fetch()
			users.once("reset", function(){
				expect(users).to.have.length(1);

				// Async code has completed. Signal test is done
				done();
			});

			expect(users).to.have.length(0);
			
			users.fetch({reset: true});
		});
	});

	describe("modification", function(){
		beforeEach(function(){

			// Load a pre-existing user
			this.users.add({
				name: "Guzman Monne",
				email: "guzmonne@hotmail.com",
				phone: "6962030", 
				cellphone: "099750505",
				rememberToken: "jdsdfdf5dfd54f5v5fvt7499q49s3c21c2b31"
			});
		});

		afterEach(function(){
			this.users = null;
			this.users = new App.Collections.Users;
		});

		it("has a single user", function(done){
			var users = this.users;

			this.server.respondWith("GET", "/api/users", [
			                        200, 
			                        {"Content-Type": "application/json"}, 
			                        JSON.stringify([{
			                        	name: "Guzman Monne", 
			                        	email: "guzmonne@hotmail.com",
			                        	phone: "6967896", 
			                        	cellphone: "789456312",
			                        	rememberToken: "jdsdfdf5dfd54f5v5fvt7499q49s3c21c2b31"
			                        }])
			                        ]);
			// After fetch
			users.once("reset", function(){
				expect(users).to.have.length(1);

				// Check model attributes
				user = users.at(0);
				expect(user).to.be.ok;
				expect(user.get("name")).to.contain("Guzman Monne");
				expect(user.get("email")).to.contain("guzmonne@hotmail.com");
				expect(user.get("phone")).to.contain("6967896");
				expect(user.get("cellphone")).to.contain("789456312");
				expect(user.get("rememberToken")).to.contain("jdsdfdf5dfd54f5v5fvt7499q49s3c21c2b31");
				expect(user.get("id")).to.be.a("number");
				expect(user.get("createdAt")).to.be.a("Date");
				expect(user.get("updatedAt")).to.be.a("Date");
				done();
			});
			//expect(users).to.have.length(2);
			users.fetch({reset: true});
		});

		it("can delete a note", function(done){
			var users = this.users
				, user;

			// After shift
			users.once("remove", function(){
				expect(users).to.have.length(0);
				done();
			});

			// Remove and return first model
			user = users.shift();
			expect(user).to.be.ok;
		});

		it("can create a second note");
	});
});
describe("App.Models.User", function(){
	it("has default values", function(){
		// Create empty user model
		var model = new App.Models.User();

		expect(model).to.be.ok;
		expect(model.get("id")).to
			.be.a('number').and
			.to.exist;
		expect(model.get("name")).to
			.equal("").and
			.to.exist;
		expect(model.get("email")).to.equal("").and
			.to.exist;
		expect(model.get("phone")).to.equal("").and
			.to.exist;
		expect(model.get("cellphone")).to.equal("").and
			.to.exist;
		expect(model.get("rememberToken")).to.equal("").and
			.to.exist;
		expect(model.get("createdAt")).to.be.a("Date").and
			.to.exist;
		expect(model.get("updatedAt")).to.be.a("Date").and
			.to.exist;
	});
	it("sets passed attributes", function(){
		var model = new App.Models.User({
			name: "Guzman Monne",
			email: "guzmonne@hotmail.com",
			phone: "6962030", 
			cellphone: "099750505",
			rememberToken: "jdsdfdf5dfd54f5v5fvt7499q49s3c21c2b31"
		});

		expect(model.get("name")).to.equal("Guzman Monne");
		expect(model.get("email")).to.equal("guzmonne@hotmail.com");
		expect(model.get("phone")).to.equal("6962030");
		expect(model.get("cellphone")).to.equal("099750505");
		expect(model.get("rememberToken")).to.equal("jdsdfdf5dfd54f5v5fvt7499q49s3c21c2b31");
	});
});
describe("App.Regions.BaseRegion", function(){
	beforeEach(function(){
		this.baseRegion = new App.Regions.BaseRegion();
		this.oldView = new App.Views.BaseView();
		this.newView = new App.Views.BaseView();
	});

	after(function(){
		this.baseRegion = null;
	});

	afterEach(function(){
		$('#fixtures').empty();
	});

	describe("initialize(options)", function(){
		it("should set the 'container' if passed", function(){
			var baseRegion = new App.Regions.BaseRegion();
			expect(baseRegion.container).to.be.null;
			
			baseRegion = new App.Regions.BaseRegion({container: "something"});
			expect(baseRegion.container).to.equal("something");
		});
		it("should set the 'currentView' if passed", function(){
			var view       = new App.Views.BaseView();
			var baseRegion = new App.Regions.BaseRegion();
			expect(baseRegion.currentView).to.be.null;
			baseRegion = new App.Regions.BaseRegion({currentView: view});
			expect(baseRegion.currentView).to.equal(view);
		});
	});

	describe("swapCurrentView(newView)", function(){
		it("should swap the views if currentView is empty", function(){
			var newView = this.newView;
			this.baseRegion.swapCurrentView(newView);
			expect(this.baseRegion.currentView).to.equal(newView);
		});
		it("should remove the currentView", function(){
			this.baseRegion.currentView = this.oldView;
			// Empty stub for view removal to prevent side effects
			sinon.stub(this.oldView, "remove");
			this.baseRegion.swapCurrentView(this.newView);
			expect(this.oldView.remove).to.be.calledOnce;
		});
		it("should swap the views and close the oldView", function(){
			var newView = this.newView;
			var oldView = this.oldView;
			this.baseRegion.currentView = oldView;
			this.baseRegion.swapCurrentView(newView);
			expect(this.baseRegion.currentView).to.equal(newView);
		});
	});

	describe("render", function(){
		it("should render the currentView in the container", function(){
			// If container or currentView is empty return
			this.baseRegion.render();
			expect($('#fixtures').html()).to.equal('');
			// Render view in region
			var view = new App.Views.BaseView({el: '#fixtures'});
			view.template = function(){
				return '<p>Test</p>';
			};
			this.baseRegion.container = '#fixtures';
			this.baseRegion.currentView = view;
			this.baseRegion.render();
			expect($('#fixtures').html()).to.equal('<p>Test</p>');
		});
	});

	describe("swapAndRenderCurrentView(newView)", function(){
		it("should call the swapCurrentView function once", function(){
			sinon.spy(this.baseRegion, "swapCurrentView");
			this.baseRegion.swapAndRenderCurrentView(new App.Views.BaseView({el: '#fixtures'}));
			expect(this.baseRegion.swapCurrentView).to.have.been.calledOnce;
			this.baseRegion.swapCurrentView.restore();
		});
		it("should call the render function once", function(){
			sinon.spy(this.baseRegion, "render");
			this.baseRegion.swapAndRenderCurrentView(new App.Views.BaseView({el: '#fixtures'}));
			expect(this.baseRegion.render).to.have.been.calledOnce;
			this.baseRegion.render.restore();
		});
	});
});
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