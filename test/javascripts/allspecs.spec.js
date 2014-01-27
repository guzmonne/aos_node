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
            username: 'guzmonne',
            firstname: 'Guzman',
            lastname: 'Monne',
            email: 'guzmonne@example.com ',
            id: '52e12203d0842ecf4960d8ce'
          }
        ])
      ]);
      users.once("reset", function() {
        var user;
        expect(users).to.have.length(1);
        user = users.at(0);
        expect(user).to.be.ok;
        expect(user.get("username")).to.contain("guzmonne");
        expect(user.get("firstname")).to.contain("Guzman");
        expect(user.get("lastname")).to.contain("Monne");
        expect(user.get("email")).to.contain("guzmonne@example.com");
        expect(user.get("id")).to.be.a("string");
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

describe("App.Models.BaseModel", function() {
  beforeEach(function() {
    this.model = new App.Models.BaseModel;
    this.model.validations = {
      "attr1": {
        "presence": true,
        "lengthGT": 3
      },
      "attr2": {
        "lengthLT": 12
      },
      "attr3": {
        "lengthGT": 3,
        "lengthLT": 12
      },
      "attr4": {
        "presence": true
      }
    };
    this.attr = {
      "attr1": "value1",
      "attr2": "value2",
      "attr3": "value3"
    };
    return this.invAttr = {
      "attr1": "",
      "attr2": "MoreThanTwelveChars",
      "attr3": "3"
    };
  });
  return describe("Validations", function() {
    describe("validate(attr: Object, options: Object)", function() {
      it("should parse the 'validations' object correctly and call the correct functions", function() {
        var lengthSpy;
        sinon.spy(this.model, "validatePresenceOf");
        lengthSpy = sinon.spy(this.model, "validateLengthOf");
        this.model.validate(this.attr);
        expect(this.model.validatePresenceOf).to.have.been.calledTwice;
        return expect(lengthSpy.callCount).to.equal(4);
      });
      it("should return an array of error objects", function() {
        var result;
        result = this.model.validate(this.invAttr);
        return expect(result).to.be["instanceof"](Array);
      });
      it("should return an array of objects with a 'attr' and 'message' key", function() {
        var keys, res, result, _i, _len, _results;
        result = this.model.validate(this.invAttr);
        _results = [];
        for (_i = 0, _len = result.length; _i < _len; _i++) {
          res = result[_i];
          keys = _.keys(res);
          expect(keys).to.contain("attr");
          _results.push(expect(keys).to.contain("message"));
        }
        return _results;
      });
      return it("should not check atributes that are not yet in the model", function() {
        var error, errors, _i, _len, _results;
        errors = this.model.validate(this.invAttr);
        _results = [];
        for (_i = 0, _len = errors.length; _i < _len; _i++) {
          error = errors[_i];
          _results.push(expect(error.attr).not.to.equal("attr4"));
        }
        return _results;
      });
    });
    describe("validatePresenceOf(value: Var)", function() {
      it("should return true if the value exists and it's not empty", function() {
        var result, value;
        value = "NotEmpty";
        result = this.model.validatePresenceOf(value);
        return expect(result).to.be["true"];
      });
      return it("should return false if the value does not exists or is empty", function() {
        var result, value;
        value = null;
        result = this.model.validatePresenceOf(value);
        expect(result).to.be["false"];
        value = "";
        result = this.model.validatePresenceOf(value);
        return expect(result).to.be["false"];
      });
    });
    return describe("validateLengthOf(value: Var, length: Number, comp: String)", function() {
      it("should return true if comp = 'gt' and value length is bigger than 'length'", function() {
        var comp, length, result, value;
        value = "SomeValue";
        length = 3;
        comp = 'gt';
        result = this.model.validateLengthOf(value, length, comp);
        return expect(result).to.be["true"];
      });
      it("should return false if comp = 'gt' and value length is less than 'length'", function() {
        var comp, length, result, value;
        value = "SomeValue";
        length = 12;
        comp = 'gt';
        result = this.model.validateLengthOf(value, length, comp);
        return expect(result).to.be["false"];
      });
      it("should return true if comp = 'lt' and value length is less than 'length'", function() {
        var comp, length, result, value;
        value = "SomeValue";
        length = 12;
        comp = 'lt';
        result = this.model.validateLengthOf(value, length, comp);
        return expect(result).to.be["true"];
      });
      return it("should return false if comp = 'lt' and value length is greater than 'length'", function() {
        var comp, length, result, value;
        value = "SomeValue";
        length = 3;
        comp = 'lt';
        result = this.model.validateLengthOf(value, length, comp);
        return expect(result).to.be["false"];
      });
    });
  });
});

describe("App.Models.Session", function() {
  before(function() {
    this.server = sinon.fakeServer.create();
    this.data = {
      "auth": true,
      "username": "gmonne",
      "firstName": "Guzman",
      "lastName": "Monne",
      "email": "test@example.com",
      "id": "52e1122203d23ecf4943d8ce"
    };
    this.server.respondWith("GET", "/session", [
      200, {
        "Content-Type": "application/json"
      }, JSON.stringify(this.data)
    ]);
    return this.server.respondWith("POST", "/session/login", [
      200, {
        "Content-Type": "application/json"
      }, JSON.stringify(this.data)
    ]);
  });
  after(function() {
    return this.server.restore();
  });
  describe("login(object: credentials)", function() {
    it("should make an AJAX request");
    it("should send a POST request with the given credentials");
    it("sholud set the user and authenticate it");
    it("should redirect the user back to where he came or to the index");
    return it("should redirect to the login page if the call failed");
  });
  describe("logout(function: callback)", function() {
    it("should send a DELETE request");
    it("should clear the session data");
    it("should update the csrf value");
    return it("should run a callback at the end");
  });
  return describe("getAuth(function: callback)", function() {
    it("should fetch and set the session values");
    it("should clear the session values and update the session if the user is not authorized");
    return it("should run a callback function at the end");
  });
});

describe("App.Models.User", function() {});

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
    trigger: true
  };
  return describe("Router", function() {
    beforeEach(function() {
      this.router = new App.Routers.MainRouter();
      sinon.spy(this.router, "login");
      sinon.spy(this.router, "before");
      sinon.spy(this.router, "index");
      return sinon.spy(this.router, "usersNew");
    });
    afterEach(function() {
      this.router.login.restore();
      this.router.before.restore();
      this.router.index.restore();
      this.router.usersNew.restore();
      return delete this.router;
    });
    it("should send to login if user is not auth", function() {
      this.router.navigate("home", opts);
      expect(this.router.before).to.have.been.calledTwice;
      expect(App.session.get('redirectFrom')).to.equal("#home");
      return expect(Backbone.history.location.hash).to.equal("#login");
    });
    it("should redirect to home if trying to access a page that a logged in user should not see");
    return it("should route to the page if no authorization is needed", function() {
      Backbone.history.navigate("login", opts);
      return expect(Backbone.history.location.hash).to.equal("#login");
    });
  });
});

describe("App.Views.BaseView", function() {
  beforeEach(function() {
    return this.view = new App.Views.BaseView();
  });
  afterEach(function() {
    return delete this.view;
  });
  it("should contain an innverViews array", function() {
    return expect(this.view.innerViews).to.be["instanceof"](Array);
  });
  describe("close()", function() {
    it("should call the onClose function once", function() {
      this.onClose = sinon.spy(this.view, "onClose");
      this.view.close();
      return expect(this.onClose).to.have.been.calledOnce;
    });
    return it("should call the beforeClose Function", function() {
      this.view.beforeClose = function() {
        return console.log("Test");
      };
      this.beforeClose = sinon.spy(this.view, "beforeClose");
      this.view.close();
      return expect(this.beforeClose).to.have.been.calledOnce;
    });
  });
  describe("onClose()", function() {
    return it("should call the close() method on the appended views", function() {
      var appendedView1, appendedView2, closeSpy1, closeSpy2;
      appendedView1 = new App.Views.ContentView();
      appendedView2 = new App.Views.ContentView();
      closeSpy1 = sinon.spy(appendedView1, "close");
      closeSpy2 = sinon.spy(appendedView2, "close");
      this.view.innerViews.push(appendedView1);
      this.view.innerViews.push(appendedView2);
      expect(appendedView1.innerViews).to.be.empty;
      expect(appendedView2.innerViews).to.be.empty;
      this.view.onClose();
      expect(closeSpy1).to.have.been.calledOnce;
      return expect(closeSpy2).to.have.been.calledOnce;
    });
  });
  return describe("renderIn(container: String)", function() {
    return it("should render the template inside the container", function() {
      var result;
      this.view.template = HBS['src/templates/test.hbs'];
      this.view.renderIn('#fixtures');
      result = $('#fixtures').html();
      return expect(result).to.equal('<h1>This is a test</h1>');
    });
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
      return expect($('#fixtures ul.nav.navbar-nav li.active a').attr("id")).to.equal("nav-login");
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
