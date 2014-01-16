describe("App", function() {
  return it("provides the 'App' object and basic app functionalities", function() {
    expect(window.App).to.be.an('object');
    return expect(window.App).to.include.keys("Config", "Collections", "Models", "Routers", "Views", "Regions");
  });
});

describe("App.Collections.Users", function() {
  beforeEach(function() {
    this.server = sinon.fakeServer.create();
    this.server.autoRespond = true;
    return this.users = new App.Collections.Users();
  });
  afterEach(function() {
    return this.server.restore();
  });
  describe("retrieval", function() {
    return it("has a single user", function(done) {
      var users;
      users = this.users;
      this.server.respondWith("GET", "/api/users", [
        200, {
          "Content-Type": "application/json"
        }, JSON.stringify([
          {
            name: "Guzman Monne",
            email: "guzmonne@hotmail.com",
            phone: "6967896",
            cellphone: "789456312",
            rememberToken: "jdsdfdf5dfd54f5v5fvt7499q49s3c21c2b31"
          }
        ])
      ]);
      users.once("reset", function() {
        var user;
        expect(users).to.have.length(1);
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
        return done();
      });
      return users.fetch({
        reset: true
      });
    });
  });
  describe("creation", function() {
    it("has default values", function() {
      expect(this.users).to.be.ok;
      return expect(this.users).to.have.length(0);
    });
    return it("should be empty on fetch", function(done) {
      var users;
      users = this.users;
      this.server.respondWith("GET", "/api/users", [
        200, {
          "Content-Type": "application/json"
        }, JSON.stringify([
          {
            name: "Guzman Monne",
            email: "guzmonne@hotmail.com",
            phone: "6967896",
            cellphone: "789456312",
            rememberToken: "jdsdfdf5dfd54f5v5fvt7499q49s3c21c2b31"
          }
        ])
      ]);
      users.once("reset", function() {
        expect(users).to.have.length(1);
        return done();
      });
      expect(users).to.have.length(0);
      return users.fetch({
        reset: true
      });
    });
  });
  return describe("modification", function() {
    beforeEach(function() {
      return this.users.add({
        name: "Guzman Monne",
        email: "guzmonne@hotmail.com",
        phone: "6962030",
        cellphone: "099750505",
        rememberToken: "jdsdfdf5dfd54f5v5fvt7499q49s3c21c2b31"
      });
    });
    afterEach(function() {
      this.users = null;
      return this.users = new App.Collections.Users;
    });
    it("can delete a user", function(done) {
      var user, users;
      users = this.users;
      users.once("remove", function() {
        expect(users).to.have.length(0);
        return done();
      });
      user = users.shift();
      return expect(user).to.be.ok;
    });
    return it("can create a second user");
  });
});

describe("App.Config", function() {
  before(function() {
    this.router = new App.Routers.MainRouter();
    this.config = new App.Config();
    return this.object = {
      "routes": "routesIndex",
      "routes/new": "routesNew",
      "routes/:id": "routesShow",
      "routes/:id/edit": "routesEdit"
    };
  });
  after(function() {
    delete this.router;
    return delete this.config;
  });
  describe("capitalize()", function() {
    return it("should capitalize the first letter of a string", function() {
      var string;
      string = this.config.capitalize("string");
      return expect(string).to.equal("String");
    });
  });
  describe("buildRestRoutes(string: route)", function() {
    return it("should build an object with the rest routes and the method calls", function() {
      var result;
      result = this.config.buildRestRoutes("routes");
      return expect(result).to.deep.equal(this.object);
    });
  });
  describe("buildRestRoutesMethods(object: restRoutes)", function() {
    return it("should return an object with the correct methods for the route", function() {
      var key, keys, results, _i, _len, _results;
      results = this.config.buildRestRoutesMethods(this.object);
      expect(results).to.be.ok;
      keys = _.keys(results);
      _results = [];
      for (_i = 0, _len = keys.length; _i < _len; _i++) {
        key = keys[_i];
        _results.push(expect(results[key]).to.be.a("function"));
      }
      return _results;
    });
  });
  describe("buildMethodFromRoute(object: routeAndMethodPair)", function() {
    return it("should return an object with the method and a function", function() {
      var object, result;
      object = {};
      object["search/:query/p:page"] = "search";
      result = this.config.buildMethodFromRoute(object);
      return expect(result[object["search"]]).to.be.a("function");
    });
  });
  return describe("getParameters(string: route)", function() {
    it("should return an array with all the normal parameters", function() {
      var result;
      result = this.config.getParameters("search/:query/p:page");
      return expect(result).to.be.an["instanceof"](Array).and.to.contain("query").and.to.contain("page");
    });
    it("should return an array with normal and splat parameters", function() {
      var result;
      result = this.config.getParameters("file/*path");
      return expect(result).to.be.an["instanceof"](Array).and.to.contain("path");
    });
    it("should return an array with normal and optional parameters", function() {
      var result;
      result = this.config.getParameters("docs/:section(/:subsection)");
      return expect(result).to.be.an["instanceof"](Array).and.to.contain("section").and.to.contain("subsection=null");
    });
    it("should return an array with normal, splat, and optional parameters", function() {
      var result;
      result = this.config.getParameters("file/:section(/:subsection)/*path");
      return expect(result).to.be.an["instanceof"](Array).and.to.contain("section").and.to.contain("subsection=null").and.to.contain("path");
    });
    return it("should return an empty array if there are no parameters", function() {
      var result;
      result = this.config.getParameters("route/routes");
      return expect(result).to.be.an["instanceof"](Array).and.to.be.empty;
    });
  });
});

describe("App.Routers.MainRouter", function() {
  var opts;
  opts = {
    trigger: true,
    replace: true
  };
  before(function() {
    var route, _i, _len, _ref;
    this.router = new App.Routers.MainRouter();
    _ref = _.values(this.router.routes);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      route = _ref[_i];
      sinon.stub(App.Routers.MainRouter.prototype, route);
    }
    this.routePairs = _.pairs(this.router.routes);
    return this.testRoute = function(route, callback) {
      this.router.navigate(route, opts);
      return expect(App.Routers.MainRouter.prototype[callback]).to.have.been.calledOnce;
    };
  });
  beforeEach(function() {
    this.router = new App.Routers.MainRouter();
    this.routerSpy = sinon.spy();
    return this.router.on("route", this.routerSpy);
  });
  after(function() {
    var pair, _i, _len, _ref, _results;
    Backbone.history.stop();
    _ref = this.routePairs;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      pair = _ref[_i];
      _results.push(App.Routers.MainRouter.prototype[pair[1]].restore());
    }
    return _results;
  });
  return it("should route correctly all routes", function() {
    var pair, _i, _len, _ref, _results;
    _ref = this.routePairs;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      pair = _ref[_i];
      _results.push(this.testRoute(pair[0], pair[1]));
    }
    return _results;
  });
});

describe("App.Views.ClientNav", function() {
  beforeEach(function() {
    this.view = new App.Views.ClientNav({
      container: this.$fixture
    });
    return this.view.renderIn('#fixtures');
  });
  afterEach(function() {
    $('#fixtures').empty();
    return this.view.remove();
  });
  describe("events", function() {
    return it("fires events on 'view' click");
  });
  return describe("menu bar displays", function() {
    it("has home nav active by default", function() {
      expect($('#fixtures ul.nav.navbar-nav li.active')).to.have.length(1);
      return expect($('#fixtures ul.nav.navbar-nav li.active a').attr("id")).to.equal("nav-home");
    });
    it("activates the 'nav-about' button on click");
    it("activates the 'nav-home' button on click");
    return it("activates the 'nav-contact' button on click");
  });
});

describe("App.Views.UserEdit", function() {
  it("should prepopulate the data in the form");
  it("should show the fields inactive");
  it("should activate the fields on user:edit");
  it("should swap the 'save' and 'edit' button");
  it("should show the 'cancel' button");
  it("should restore the values on reset");
  it("should tell the user the data was saved correctly");
  return it("should show the user the errors ocurred");
});

describe("App.Views.UserNew", function() {
  it("should show an empty form");
  it("should show the user errors after unsuccessful save");
  return it("should be destroyed after successful save");
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