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
  awake: function() {
    this.appDetails = new App.Models.Application();
    this.headerRegion = new App.Regions.HeaderRegion();
    this.contentRegion = new App.Regions.ContentRegion();
    this.footerRegion = new App.Regions.FooterRegion();
    return App.start();
  },
  start: function() {
    new App.Routers.MainRouter();
    return Backbone.history.start();
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

this["HBS"]["src/templates/content.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"jumbotron\">\r\n	<h1>Welcome to my page!</h1>\r\n	<small>This is just a test</small>\r\n</div>";
  });
this["HBS"] = this["HBS"] || {};

this["HBS"]["src/templates/footer.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"container container-fluid navbar-inverse\" role='navigation'>\r\n	<p class=\"text-muted\">\r\n		";
  if (stack1 = helpers.footer) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.footer); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\r\n	</p>\r\n</div>";
  return buffer;
  });
this["HBS"] = this["HBS"] || {};

this["HBS"]["src/templates/header.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"container container-fluid\">\r\n	<div class=\"navbar-header\">\r\n		<button class=\"navbar-toggle\" type=\"button\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\r\n			<span class=\"sr-only\">\r\n				Toggle Navigation\r\n			</span>\r\n			<span class=\"icon-bar\"></span>\r\n			<span class=\"icon-bar\"></span>\r\n			<span class=\"icon-bar\"></span>\r\n		</button>\r\n		<a href=\"#\" class=\"navbar-brand\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.title); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\r\n	</div>\r\n	<div class=\"collapse navbar-collapse\">\r\n		<ul class=\"nav navbar-nav\">\r\n			<li class=\"active nav-button\"> <a href=\"#\" id=\"nav-home\">Home</a></li>\r\n			<li class=\"nav-button\"><a href=\"#\" id=\"nav-about\">About</a></li>\r\n			<li class=\"nav-button\"><a href=\"#\" id=\"nav-contact\">Contact</a></li>\r\n			<li>\r\n				<a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\r\n					Dropdown \r\n					<b class='caret'></b>\r\n				</a>\r\n				<ul class=\"dropdown-menu\">\r\n					<li><a href=\"#\">Action</a></li>\r\n					<li><a href=\"#\">Another Action</a></li>\r\n					<li><a href=\"#\">One More Action</a></li>\r\n					<li class=\"divider\"></li>\r\n					<li class=\"dropdown-header\">Nav Header</li>\r\n					<li><a href=\"#\">Separated Link</a></li>\r\n					<li><a href=\"#\">Another Separated Link</a></li>\r\n				</ul>\r\n			</li>\r\n		</ul>\r\n	</div>\r\n</div>";
  return buffer;
  });
var _ref, _ref1,
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

App.Models.User = (function(_super) {
  __extends(User, _super);

  function User() {
    _ref1 = User.__super__.constructor.apply(this, arguments);
    return _ref1;
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
      this.currentView.remove();
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

var _ref, _ref1, _ref2, _ref3,
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
    if (this.model == null) {
      return this.model = App.appDetails;
    }
  };

  BaseView.prototype.render = function() {
    $(this.el).html(this.template(this.model.attributes));
    return this;
  };

  BaseView.prototype.renderIn = function(container) {
    $(container).html(this.template(this.model.attributes));
    return this;
  };

  return BaseView;

})(Backbone.View);

App.Views.ClientFooter = (function(_super) {
  __extends(ClientFooter, _super);

  function ClientFooter() {
    _ref1 = ClientFooter.__super__.constructor.apply(this, arguments);
    return _ref1;
  }

  ClientFooter.prototype.template = HBS['src/templates/footer.hbs'];

  return ClientFooter;

})(App.Views.BaseView);

App.Views.ClientNav = (function(_super) {
  __extends(ClientNav, _super);

  function ClientNav() {
    _ref2 = ClientNav.__super__.constructor.apply(this, arguments);
    return _ref2;
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
    _ref3 = ContentView.__super__.constructor.apply(this, arguments);
    return _ref3;
  }

  ContentView.prototype.template = HBS['src/templates/content.hbs'];

  return ContentView;

})(App.Views.BaseView);

var _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

App.Routers.MainRouter = (function(_super) {
  __extends(MainRouter, _super);

  function MainRouter() {
    _ref = MainRouter.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  MainRouter.prototype.routes = {
    'users': 'usersIndex',
    'users/new': 'usersNew',
    'users/:id': 'usersShow',
    'users/:id/edit': 'usersEdit',
    '': 'index'
  };

  MainRouter.prototype.awake = function() {
    return console.log(this);
  };

  MainRouter.prototype.index = function() {
    console.log("Backbone is up and running!");
    App.headerRegion.swapAndRenderCurrentView(new App.Views.ClientNav);
    App.contentRegion.swapAndRenderCurrentView(new App.Views.ContentView);
    return App.footerRegion.swapAndRenderCurrentView(new App.Views.ClientFooter);
  };

  MainRouter.prototype.usersIndex = function() {
    return console.log("Not yet implemented");
  };

  MainRouter.prototype.usersEdit = function() {
    return console.log("Not yet implemented");
  };

  MainRouter.prototype.usersShow = function() {
    return console.log("Not yet implemented");
  };

  MainRouter.prototype.usersNew = function() {
    return console.log("Not yet implemented");
  };

  return MainRouter;

})(Backbone.Router);
