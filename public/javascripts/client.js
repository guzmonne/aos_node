window.App = {
  Models: {},
  Collections: {},
  Routers: {},
  Views: {},
  Regions: {},
  Mixins: {},
  Config: {},
  vent: _.extend({}, Backbone.Events),
  headerRegion: null,
  contentRegion: null,
  footerRegion: null,
  appDetails: null,
  session: null,
  awake: function() {
    this.appDetails = new App.Models.Application();
    this.session = new App.Models.Session();
    this.headerRegion = new App.Regions.HeaderRegion();
    this.contentRegion = new App.Regions.ContentRegion();
    this.footerRegion = new App.Regions.FooterRegion();
    return App.start();
  },
  start: function() {
    return this.session.getAuth(function(response) {
      new App.Routers.MainRouter();
      return Backbone.history.start();
    });
  }
};

$(document).ready(function() {
  return App.awake();
});

App.Config = (function() {
  function Config() {}

  Config.prototype.capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  Config.prototype.getParameters = function(route) {
    var normal, normals, optional, optionals, results, splat, splats, _i, _j, _k, _len, _len1, _len2;
    results = [];
    optionals = route.match(/\((.*?)\)/g);
    if (optionals != null) {
      for (_i = 0, _len = optionals.length; _i < _len; _i++) {
        optional = optionals[_i];
        route = route.replace("" + optional, "");
        results.push("" + (optional.replace(/\(\/:/, "").replace(/\)/, "")) + "=null");
      }
    }
    normals = route.match(/(\(\?)?:\w+/g);
    if (normals != null) {
      for (_j = 0, _len1 = normals.length; _j < _len1; _j++) {
        normal = normals[_j];
        results.push(normal.replace(/:/, ""));
      }
    }
    splats = route.match(/\*\w+/g);
    if (splats != null) {
      for (_k = 0, _len2 = splats.length; _k < _len2; _k++) {
        splat = splats[_k];
        results.push(splat.replace(/\*/, ""));
      }
    }
    return results;
  };

  Config.prototype.buildMethodFromRoute = function(routeAndMethodPair) {
    var object;
    object = {};
    object[_.values(routeAndMethodPair)[1]] = function() {
      return "Not yet implemented";
    };
    return object;
  };

  Config.prototype.buildRestRoutesMethods = function(restRoutes) {
    var pair, results, _i, _len, _ref;
    results = {};
    _ref = _.pairs(restRoutes);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      pair = _ref[_i];
      _.extend(results, this.buildMethodFromRoute(pair));
    }
    return results;
  };

  Config.prototype.buildRestRoutes = function(strings) {
    var result;
    result = {};
    result[strings] = "" + strings + "Index";
    result[strings + "/new"] = "" + strings + "New";
    result[strings + "/:id"] = "" + strings + "Show";
    result[strings + "/:id/edit"] = "" + strings + "Edit";
    return result;
  };

  return Config;

})();

this["HBS"] = this["HBS"] || {};

this["HBS"]["src/templates/app_nav.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"container container-fluid\">\n	<div class=\"navbar-header\">\n		<button class=\"navbar-toggle\" type=\"button\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\n			<span class=\"sr-only\">\n				Toggle Navigation\n			</span>\n			<span class=\"icon-bar\"></span>\n			<span class=\"icon-bar\"></span>\n			<span class=\"icon-bar\"></span>\n		</button>\n		<a href=\"#\" class=\"navbar-brand\">AOS</a>\n	</div>\n	<div class=\"collapse navbar-collapse\">\n		<ul class=\"nav navbar-nav pull-right\">\n			<li>\n				<a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n					";
  if (stack1 = helpers.firstName) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.firstName); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + " ";
  if (stack1 = helpers.lastName) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.lastName); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + " \n					<b class='caret'></b>\n				</a>\n				<ul class=\"dropdown-menu\">\n					<li><a href=\"#profile\">Profile</a></li>\n					<li class=\"divider\"></li>\n					<li><a href=\"#logout\" id=\"nav-logout\">Logout</a></li>\n				</ul>\n			</li>\n		</ul>\n		<ul class=\"nav navbar-nav\">\n			<li class=\"nav-button\"> <a href=\"#\" id=\"nav-something\">Something</a></li>\n		</ul>\n	</div>\n</div>";
  return buffer;
  });
this["HBS"] = this["HBS"] || {};

this["HBS"]["src/templates/content.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"jumbotron\">\n	<h1>Welcome to my page!</h1>\n	<small>This is just a test</small>\n</div>";
  });
this["HBS"] = this["HBS"] || {};

this["HBS"]["src/templates/footer.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"container container-fluid navbar-inverse\" role='navigation'>\n	<p class=\"text-muted\">\n		";
  if (stack1 = helpers.footer) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.footer); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n	</p>\n</div>";
  return buffer;
  });
this["HBS"] = this["HBS"] || {};

this["HBS"]["src/templates/header.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"container container-fluid\">\n	<div class=\"navbar-header\">\n		<button class=\"navbar-toggle\" type=\"button\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\n			<span class=\"sr-only\">\n				Toggle Navigation\n			</span>\n			<span class=\"icon-bar\"></span>\n			<span class=\"icon-bar\"></span>\n			<span class=\"icon-bar\"></span>\n		</button>\n		<a href=\"#\" class=\"navbar-brand\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.title); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\n	</div>\n	<div class=\"collapse navbar-collapse\">\n		<ul class=\"nav navbar-nav\">\n			<li class=\"active nav-button\"> <a href=\"#login\" id=\"nav-login\">Login</a></li>\n		</ul>\n	</div>\n</div>";
  return buffer;
  });
this["HBS"] = this["HBS"] || {};

this["HBS"]["src/templates/login.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"row vertical-offset-100\">\n	<div class=\"col-md-4 col-md-offset-4\">\n		<div class=\"panel panel-default\">\n			<div class=\"panel-heading\">\n				<h3 class=\"panel-title align-center\">Iniciar Sesión</h3>\n	 	</div>\n			<div class=\"panel-body\">\n				<form accept-charset=\"UTF-8\" role=\"form\">\n					<fieldset>\n						<div class=\"form-group\">\n							<input class=\"form-control\" placeholder=\"E-mail\" name=\"email\" type=\"text\">\n					</div>\n					<div class=\"form-group\">\n						<input class=\"form-control\" placeholder=\"Password\" name=\"password\" type=\"password\" value=\"\">\n					</div>\n					<hr>\n					<input class=\"btn btn-lg btn-success btn-block\" type=\"submit\" value=\"Login\">\n				</fieldset>\n					</form>\n			</div>\n	</div>\n</div>";
  });
var _ref, _ref1, _ref2,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

App.Models.Application = (function(_super) {
  __extends(Application, _super);

  function Application() {
    _ref = Application.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Application.prototype.defaults = function() {
    return {
      title: 'AOS',
      description: 'Administrador de Ordenes de Servicio',
      author: 'Guzman Monne',
      footer: 'Base App - Guzman Monne - 2014 | Express + Backbone + Handlebars + Bootstrap '
    };
  };

  return Application;

})(Backbone.Model);

App.Models.Session = (function(_super) {
  __extends(Session, _super);

  function Session() {
    _ref1 = Session.__super__.constructor.apply(this, arguments);
    return _ref1;
  }

  Session.prototype.url = '/session';

  Session.prototype.initialize = function() {
    $.ajaxSetup({
      headers: {
        'X-CSRF-Token': csrf
      }
    });
    if (Storage && sessionStorage) {
      return this.supportStorage = true;
    }
  };

  Session.prototype.get = function(key) {
    var data;
    if (this.supportStorage) {
      data = sessionStorage.getItem(key);
      if (data && data[0] === '{') {
        return JSON.parse(data);
      } else {
        return data;
      }
    } else {
      return Backbone.Model.prototype.get.call(this, key);
    }
  };

  Session.prototype.set = function(key, value) {
    if (this.supportStorage) {
      sessionStorage.setItem(key, value);
    } else {
      Backbone.Model.prototype.set.call(this, key, value);
    }
    return this;
  };

  Session.prototype.unset = function(key) {
    if (this.supportStorage) {
      sessionStorage.removeItem(key);
    } else {
      Backbone.Model.prototype.unset.call(this, key);
    }
    return this;
  };

  Session.prototype.clear = function() {
    if (this.supportStorage) {
      return sessionStorage.clear();
    } else {
      return Backbone.Model.prototype.clear(this);
    }
  };

  Session.prototype.login = function(credentials) {
    var login,
      _this = this;
    login = $.ajax({
      url: "" + this.url + "/login",
      data: credentials,
      type: 'POST'
    });
    login.done(function(response) {
      var path;
      _this.set("authenticated", true);
      _this.set("user", JSON.stringify(response.user));
      if (_this.get("redirectFrom")) {
        path = _this.get("redirectFrom");
        _this.unset("redirectFrom");
        return Backbone.history.navigate(path, {
          trigger: true
        });
      } else {
        return Backbone.history.navigate("", {
          trigger: true
        });
      }
    });
    return login.fail(function() {
      return Backbone.history.navigate("login", {
        trigger: true
      });
    });
  };

  Session.prototype.logout = function(callback) {
    var logout,
      _this = this;
    logout = $.ajax({
      url: "" + this.url + "/logout",
      type: 'DELETE'
    });
    return logout.done(function(response) {
      var csrf;
      _this.clear();
      csrf = response.csrf;
      _this.initialize();
      return callback();
    });
  };

  Session.prototype.getAuth = function(callback) {
    var Session,
      _this = this;
    Session = this.fetch();
    Session.done(function(response) {
      _this.set("authenticated", true);
      return _this.set("user", JSON.stringify(response.user));
    });
    Session.fail(function(response) {
      var csrf;
      response = JSON.parse(response.responseText);
      _this.clear();
      if (response.csrf !== csrf) {
        csrf = response.csrf;
      } else {
        csrf = csrf;
      }
      return _this.initialize();
    });
    return Session.always(callback);
  };

  return Session;

})(Backbone.Model);

App.Models.User = (function(_super) {
  __extends(User, _super);

  function User() {
    _ref2 = User.__super__.constructor.apply(this, arguments);
    return _ref2;
  }

  User.prototype.urlRoot = '/users';

  User.prototype.url = function() {
    var u;
    u = this.urlRoot;
    if (this.id) {
      u = u + ("/" + this.id);
    }
    return u;
  };

  User.prototype.defaults = function() {
    return {
      id: Math.floor((Math.random() * 100) + 1),
      name: "",
      email: "",
      phone: "",
      cellphone: "",
      rememberToken: "",
      createdAt: new Date(),
      updatedAt: new Date()
    };
  };

  return User;

})(Backbone.Model);

var _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

App.Collections.Users = (function(_super) {
  __extends(Users, _super);

  function Users() {
    _ref = Users.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Users.prototype.model = App.Models.User;

  Users.prototype.url = '/api/users';

  return Users;

})(Backbone.Collection);

var _ref, _ref1, _ref2, _ref3,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

App.Regions.BaseRegion = (function(_super) {
  __extends(BaseRegion, _super);

  function BaseRegion() {
    _ref = BaseRegion.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  BaseRegion.prototype.container = null;

  BaseRegion.prototype.currentView = null;

  BaseRegion.prototype.initialize = function(options) {
    if (options == null) {
      options = {};
    }
    if (options.container != null) {
      this.container = options.container;
    }
    if (options.currentView != null) {
      return this.currentView = options.currentView;
    }
  };

  BaseRegion.prototype.swapCurrentView = function(newView) {
    if (this.currentView) {
      this.currentView.close();
    }
    return this.currentView = newView;
  };

  BaseRegion.prototype.swapAndRenderCurrentView = function(newView) {
    this.swapCurrentView(newView);
    return this.render();
  };

  BaseRegion.prototype.render = function() {
    if (!((this.currentView != null) && (this.container != null))) {
      return;
    }
    $(this.container).append(this.currentView.render().el);
    return this;
  };

  return BaseRegion;

})(Backbone.View);

App.Regions.ContentRegion = (function(_super) {
  __extends(ContentRegion, _super);

  function ContentRegion() {
    _ref1 = ContentRegion.__super__.constructor.apply(this, arguments);
    return _ref1;
  }

  ContentRegion.prototype.container = '#content';

  return ContentRegion;

})(App.Regions.BaseRegion);

App.Regions.FooterRegion = (function(_super) {
  __extends(FooterRegion, _super);

  function FooterRegion() {
    _ref2 = FooterRegion.__super__.constructor.apply(this, arguments);
    return _ref2;
  }

  FooterRegion.prototype.container = 'footer';

  return FooterRegion;

})(App.Regions.BaseRegion);

App.Regions.HeaderRegion = (function(_super) {
  __extends(HeaderRegion, _super);

  function HeaderRegion() {
    _ref3 = HeaderRegion.__super__.constructor.apply(this, arguments);
    return _ref3;
  }

  HeaderRegion.prototype.container = 'header';

  return HeaderRegion;

})(App.Regions.BaseRegion);

var _ref, _ref1, _ref2, _ref3, _ref4, _ref5,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

App.Views.BaseView = (function(_super) {
  __extends(BaseView, _super);

  function BaseView() {
    _ref = BaseView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  BaseView.prototype.template = null;

  BaseView.prototype.initialize = function() {
    if (this.awake) {
      this.awake();
    }
    this.innerViews = [];
    if (this.model == null) {
      return this.model = App.appDetails;
    }
  };

  BaseView.prototype.render = function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  };

  BaseView.prototype.renderIn = function(container) {
    $(container).html(this.template(this.model.attributes));
    return this;
  };

  BaseView.prototype.close = function() {
    if (this.onClose) {
      this.onClose();
    }
    return this.remove();
  };

  BaseView.prototype.onClose = function() {
    var view, _i, _len, _ref1, _results;
    if (this.innerViews.length > 0) {
      _ref1 = this.innerViews;
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        view = _ref1[_i];
        _results.push(view.close());
      }
      return _results;
    }
  };

  return BaseView;

})(Backbone.View);

App.Views.AppNav = (function(_super) {
  __extends(AppNav, _super);

  function AppNav() {
    _ref1 = AppNav.__super__.constructor.apply(this, arguments);
    return _ref1;
  }

  AppNav.prototype.template = HBS['src/templates/app_nav.hbs'];

  AppNav.prototype.events = {
    'click ul.nav.navbar-nav li a': 'toggleActiveButton',
    'click #nav-logout': 'logout'
  };

  AppNav.prototype.render = function() {
    $(this.el).html(this.template(this.model.get("user")));
    return this;
  };

  AppNav.prototype.awake = function() {};

  AppNav.prototype.toggleActiveButton = function(e) {
    var id;
    id = '#' + e.target.id;
    $('ul.nav.navbar-nav li.active').removeClass('active');
    return $(id).parent().addClass('active');
  };

  AppNav.prototype.logout = function(e) {
    return App.session.logout(function() {
      return Backbone.history.navigate('#login', {
        trigger: true
      });
    });
  };

  return AppNav;

})(App.Views.BaseView);

App.Views.ClientFooter = (function(_super) {
  __extends(ClientFooter, _super);

  function ClientFooter() {
    _ref2 = ClientFooter.__super__.constructor.apply(this, arguments);
    return _ref2;
  }

  ClientFooter.prototype.template = HBS['src/templates/footer.hbs'];

  return ClientFooter;

})(App.Views.BaseView);

App.Views.ClientNav = (function(_super) {
  __extends(ClientNav, _super);

  function ClientNav() {
    _ref3 = ClientNav.__super__.constructor.apply(this, arguments);
    return _ref3;
  }

  ClientNav.prototype.template = HBS['src/templates/header.hbs'];

  ClientNav.prototype.events = {
    'click ul.nav.navbar-nav li a': 'toggleActiveButton'
  };

  ClientNav.prototype.toggleActiveButton = function(e) {
    var id;
    id = '#' + e.target.id;
    $('ul.nav.navbar-nav li.active').removeClass('active');
    return $(id).parent().addClass('active');
  };

  return ClientNav;

})(App.Views.BaseView);

App.Views.ContentView = (function(_super) {
  __extends(ContentView, _super);

  function ContentView() {
    _ref4 = ContentView.__super__.constructor.apply(this, arguments);
    return _ref4;
  }

  ContentView.prototype.template = HBS['src/templates/content.hbs'];

  return ContentView;

})(App.Views.BaseView);

App.Views.Login = (function(_super) {
  __extends(Login, _super);

  function Login() {
    _ref5 = Login.__super__.constructor.apply(this, arguments);
    return _ref5;
  }

  Login.prototype.template = HBS['src/templates/login.hbs'];

  Login.prototype.events = {
    "submit form": "login"
  };

  Login.prototype.login = function(e) {
    var credentials;
    e.preventDefault();
    credentials = {
      email: $('[name=email]').val(),
      password: $('[name=password]').val()
    };
    return this.model.login(credentials);
  };

  return Login;

})(App.Views.BaseView);

var _ref, _ref1,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

App.Routers.BaseRouter = (function(_super) {
  __extends(BaseRouter, _super);

  function BaseRouter() {
    _ref = BaseRouter.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  BaseRouter.prototype.before = function() {};

  BaseRouter.prototype.after = function() {};

  BaseRouter.prototype.route = function(route, name, callback) {
    var router,
      _this = this;
    if (!_.isRegExp(route)) {
      route = this._routeToRegExp(route);
    }
    if (_.isFunction(name)) {
      callback = name;
      name = "";
    }
    if (!callback) {
      callback = this[name];
    }
    router = this;
    return Backbone.history.route(route, function(fragment) {
      var args, next;
      args = router._extractParameters(route, fragment);
      next = function() {
        callback && callback.apply(router, args);
        router.trigger.apply(router, ["route:" + name].concat(args));
        router.trigger("route", name, args);
        Backbone.history.trigger("route", router, name, args);
        return router.after.apply(router, args);
      };
      return router.before.apply(router, [args, next]);
    });
  };

  return BaseRouter;

})(Backbone.Router);

App.Routers.MainRouter = (function(_super) {
  __extends(MainRouter, _super);

  function MainRouter() {
    _ref1 = MainRouter.__super__.constructor.apply(this, arguments);
    return _ref1;
  }

  MainRouter.prototype.routes = {
    'login': 'login',
    'profile': 'profile',
    '': 'index',
    '*path': 'default'
  };

  MainRouter.prototype.requiresAuth = ["#profile", ""];

  MainRouter.prototype.preventAccessWhenAuth = ["#login"];

  MainRouter.prototype.before = function(params, next) {
    var cancelAccess, isAuth, needAuth, path;
    isAuth = App.session.get('authenticated');
    path = Backbone.history.location.hash;
    needAuth = _.contains(this.requiresAuth, path);
    cancelAccess = _.contains(this.preventAccessWhenAuth, path);
    if (needAuth && !isAuth) {
      console.log("Page needs auhthorization and user is not authenticated");
      App.session.set("redirectFrom", path);
      return Backbone.history.navigate('login', {
        trigger: true
      });
    } else if (isAuth && cancelAccess) {
      console.log("User is authenticated so he can't access this page");
      return Backbone.history.navigate('', {
        trigger: true
      });
    } else {
      console.log("Any user can see this page or the User is authenticated");
      return next();
    }
  };

  MainRouter.prototype.after = function(params) {
    var footer, header;
    if ((App.headerRegion.currentView != null) && (App.footerRegion.currentView != null)) {
      return;
    }
    footer = new App.Views.ClientFooter();
    if (App.session.get("authenticated")) {
      header = new App.Views.AppNav({
        model: App.session
      });
    } else {
      header = new App.Views.ClientNav();
    }
    App.headerRegion.swapAndRenderCurrentView(header);
    return App.footerRegion.swapAndRenderCurrentView(footer);
  };

  MainRouter.prototype.fetchError = function(error) {
    if (error.status === 401) {
      return App.session.getAuth(function() {
        return Backbone.history.navigate('login', {
          trigger: true
        });
      });
    }
  };

  MainRouter.prototype.index = function() {
    console.log("Index page");
    App.contentRegion.swapAndRenderCurrentView(new App.Views.ContentView);
    return App.headerRegion.swapAndRenderCurrentView(new App.Views.AppNav({
      model: App.session
    }));
  };

  MainRouter.prototype["default"] = function() {
    console.log("Not existant page");
    return Backbone.history.navigate('', {
      trigger: true
    });
  };

  MainRouter.prototype.login = function() {
    console.log("Login page");
    App.headerRegion.swapAndRenderCurrentView(new App.Views.ClientNav());
    return App.contentRegion.swapAndRenderCurrentView(new App.Views.Login({
      model: App.session
    }));
  };

  MainRouter.prototype.profile = function() {};

  return MainRouter;

})(App.Routers.BaseRouter);
