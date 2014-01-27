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
  user: null,
  awake: function() {
    this.appDetails = new App.Models.Application();
    this.session = new App.Models.Session();
    this.user = new App.Models.User();
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

Handlebars.registerHelper("ParseDate", function (date) {
	var d = new Date(date);
  var day = d.getDate();
  var month = d.getMonth() + 1; //Months are zero based
  var year = d.getFullYear();
  var hours = d.getHours();
  var minutes = d.getMinutes();
  if (minutes < 10)
  	minutes = "0" + minutes;
  return (day + "/" + month + "/" + year + " " + hours + ":" + minutes);
});
Handlebars.registerHelper("Exists", function (attr, defaultValue) {
	if (attr)
		return attr;
	else
		return defaultValue;
});
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
    + " \n					<b class='caret'></b>\n				</a>\n				<ul class=\"dropdown-menu\">\n					<li><a href=\"#profile\">Profile</a></li>\n					<li class=\"divider\"></li>\n					<li><a href=\"#logout\" id=\"nav-logout\">Logout</a></li>\n				</ul>\n			</li>\n		</ul>\n		<ul class=\"nav navbar-nav\">\n			<li>	\n				<a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n					Usuarios\n					<b class='caret'></b>\n				</a>\n				<ul class=\"dropdown-menu\">\n					<li><a href=\"#users\">Lista</a></li>\n					<li><a href=\"#users/new\">Nuevo</a></li>\n				</ul>\n			</li>\n			<li class=\"nav-button\"> </li>\n		</ul>\n	</div>\n</div>";
  return buffer;
  });
this["HBS"] = this["HBS"] || {};

this["HBS"]["src/templates/content.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"jumbotron\">\n	<h1>Welcome to my page!</h1>\n	<small>This is just a test</small>\n</div>";
  });
this["HBS"] = this["HBS"] || {};

this["HBS"]["src/templates/snippets/dismiss_alert.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div class=\"alert alert-";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.Exists || (depth0 && depth0.Exists)),stack1 ? stack1.call(depth0, (depth0 && depth0.alert), "info", options) : helperMissing.call(depth0, "Exists", (depth0 && depth0.alert), "info", options)))
    + " alert-dismissable\">\n  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>\n  ";
  if (stack2 = helpers.message) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.message); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n</div>";
  return buffer;
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
  


  return "<div class=\"row vertical-offset-100\">\n	<div class=\"col-md-4 col-md-offset-4\">\n		<div class=\"panel panel-default\">\n			<div class=\"panel-heading\">\n				<h3 class=\"panel-title align-center\">Iniciar Sesión</h3>\n	 		</div>\n			<div class=\"panel-body\">\n				<form accept-charset=\"UTF-8\" role=\"form\">\n					<fieldset>\n						<div class=\"form-group\">\n							<input class=\"form-control\" placeholder=\"E-mail\" name=\"email\" type=\"text\">\n					</div>\n					<div class=\"form-group\">\n						<input class=\"form-control\" placeholder=\"Password\" name=\"password\" type=\"password\" value=\"\">\n					</div>\n					<hr>\n					<input class=\"btn btn-lg btn-success btn-block\" type=\"submit\" value=\"Login\">\n				</fieldset>\n					</form>\n			</div>\n	</div>\n</div>\n";
  });
this["HBS"] = this["HBS"] || {};

this["HBS"]["src/templates/test.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h1>This is a test</h1>";
  });
this["HBS"] = this["HBS"] || {};

this["HBS"]["src/templates/users/users_index.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h1>Usuarios</h1>\n<div class=\"table-responsive\">\n	<table class=\"table table-hover table-striped\">\n		<thead>\n			<tr>\n				<th>Usuario</th>\n				<th>Nombre</th>\n				<th>Apellido</th>\n				<th>E-mail</th>\n				<th>Creado por</th>\n				<th>Creado el</th>\n				<th>Modificado el</th>\n			</tr>\n		</thead>\n		<tbody></tbody>\n	</table>\n</div>";
  });
this["HBS"] = this["HBS"] || {};

this["HBS"]["src/templates/users/users_new.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"row\">\n	<div class=\"col-md-4 col-md-offset-4\">\n		<div class=\"panel panel-default\">\n			<div class=\"panel-heading\">\n				<h3 class=\"panel-title align-center\">Nuevo Usuario</h3>\n	 		</div>\n			<div class=\"panel-body\">\n				<div class=\"info\"></div>\n				<form accept-charset=\"UTF-8\" role=\"form\">\n					<fieldset>\n						<div class=\"form-group\">\n							<label for=\"username\" class=\"control-label\">Usuario</label>\n							<input class=\"form-control\" placeholder=\"Usuario\" name=\"username\" type=\"text\">\n						</div>\n						<div class=\"form-group\">\n							<label for=\"firstname\" class=\"control-label\">Nombre</label>\n							<input class=\"form-control\" placeholder=\"Nombre\" name=\"firstname\" type=\"text\">\n						</div>\n						<div class=\"form-group\">\n							<label for=\"lastName\" class=\"control-label\">Apellido</label>\n							<input class=\"form-control\" placeholder=\"Apellido\" name=\"lastName\" type=\"text\">\n						</div>\n						<div class=\"form-group\">\n							<label for=\"email\" class=\"control-label\">E-mail</label>\n							<input class=\"form-control\" placeholder=\"E-mail\" name=\"email\" type=\"email\">\n						</div>\n						<div class=\"form-group\">\n							<label for=\"password\" class=\"control-label\">Password</label>\n							<input class=\"form-control\" placeholder=\"Password\" name=\"password\" type=\"password\" value=\"\">\n						</div>\n						<hr>\n						<input class=\"btn btn-lg btn-success btn-block\" type=\"submit\" value=\"Crear Usuario\">\n					</fieldset>\n				</form>\n			</div>\n	</div>\n</div>\n";
  });
this["HBS"] = this["HBS"] || {};

this["HBS"]["src/templates/users/users_row.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<td>";
  if (stack1 = helpers.username) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.username); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n<td>";
  if (stack1 = helpers.firstname) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.firstname); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n<td>";
  if (stack1 = helpers.lastname) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.lastname); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n<td>";
  if (stack1 = helpers.email) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.email); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n<td>";
  if (stack1 = helpers.createdBy) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.createdBy); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n<td>";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.ParseDate || (depth0 && depth0.ParseDate)),stack1 ? stack1.call(depth0, (depth0 && depth0.created), options) : helperMissing.call(depth0, "ParseDate", (depth0 && depth0.created), options)))
    + "</td>\n<td>";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.ParseDate || (depth0 && depth0.ParseDate)),stack1 ? stack1.call(depth0, (depth0 && depth0.lastUpdated), options) : helperMissing.call(depth0, "ParseDate", (depth0 && depth0.lastUpdated), options)))
    + "</td>";
  return buffer;
  });
var _ref, _ref1, _ref2, _ref3,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

App.Models.BaseModel = (function(_super) {
  __extends(BaseModel, _super);

  function BaseModel() {
    _ref = BaseModel.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  BaseModel.prototype.idAttribute = "_id";

  BaseModel.prototype.url = function() {
    var u;
    u = this.urlRoot;
    if (this.id) {
      u = u + ("/" + this.id);
    }
    return u;
  };

  BaseModel.prototype.validatePresenceOf = function(value) {
    if (value === null) {
      return false;
    }
    if (value && value.length) {
      return true;
    } else {
      return false;
    }
  };

  BaseModel.prototype.validateLengthOf = function(value, length, comp) {
    if (value === null) {
      return false;
    }
    switch (comp) {
      case "gt":
        if (value.length > length) {
          return true;
        } else {
          return false;
        }
        break;
      case "lt":
        if (value.length < length) {
          return true;
        } else {
          return false;
        }
    }
  };

  BaseModel.prototype.validate = function(attrs, options) {
    var attr, attribute, errors, key, validation, value, _ref1;
    if (attrs == null) {
      return;
    }
    errors = [];
    _ref1 = this.validations;
    for (attr in _ref1) {
      validation = _ref1[attr];
      for (key in validation) {
        value = validation[key];
        if (attrs[attr] != null) {
          attribute = attrs[attr];
        } else {
          attribute = "";
        }
        switch (key) {
          case "presence":
            if (!this.validatePresenceOf(attribute)) {
              errors.push({
                attr: attr,
                message: "este campo no puede permanecer vacío"
              });
            }
            break;
          case "lengthGT":
            if (!this.validateLengthOf(attribute, value, 'gt')) {
              errors.push({
                attr: attr,
                message: "debe ingresar mas de " + value + " caracteres"
              });
            }
            break;
          case "lengthLT":
            if (!this.validateLengthOf(attribute, value, 'lt')) {
              errors.push({
                attr: attr,
                message: "debe ingresar menos de " + value + " caracteres"
              });
            }
        }
      }
    }
    if (errors.length > 0) {
      return errors;
    }
  };

  return BaseModel;

})(Backbone.Model);

App.Models.Application = (function(_super) {
  __extends(Application, _super);

  function Application() {
    _ref1 = Application.__super__.constructor.apply(this, arguments);
    return _ref1;
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
    _ref2 = Session.__super__.constructor.apply(this, arguments);
    return _ref2;
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
      App.user.set(response);
      _this.set("authenticated", true);
      _this.set("user", JSON.stringify(response.user));
      console.log(_this.get("redirectFrom"));
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
      return App.user.set(response);
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
    _ref3 = User.__super__.constructor.apply(this, arguments);
    return _ref3;
  }

  User.prototype.urlRoot = '/api/users';

  User.prototype.validations = {
    username: {
      "presence": true,
      "lengthGT": 3,
      "lengthLT": 50
    },
    firstname: {
      "presence": true,
      "lengthLT": 50
    },
    lastName: {
      "presence": true,
      "lengthLT": 50
    },
    email: {
      "presence": true,
      "email": true
    },
    password: {
      "presence": true,
      "lengthGT": 7,
      "lengthLT": 20
    }
  };

  return User;

})(App.Models.BaseModel);

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
      this.currentView = options.currentView;
    }
    if (this.awake) {
      this.awake();
    }
    return this.innerViews = [];
  };

  BaseRegion.prototype.swapCurrentView = function(newView) {
    if (this.currentView) {
      this.currentView.close();
    }
    return this.currentView = newView;
  };

  BaseRegion.prototype.swapView = function(newView) {
    this.swapCurrentView(newView);
    return this.renderView();
  };

  BaseRegion.prototype.renderView = function(view) {
    if (view == null) {
      view = null;
    }
    if (this.container == null) {
      throw new Error('You must set the container property before calling this function');
    }
    if (this.currentView == null) {
      if (view == null) {
        throw new Error('You must set the currentView or pass a new view to be rendered');
      }
      this.swapCurrentView(view);
    }
    if (view == null) {
      view = this.currentView;
    }
    $(this.container).append(view.render().el);
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

var _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

App.Views.BaseView = (function(_super) {
  __extends(BaseView, _super);

  function BaseView() {
    _ref = BaseView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  BaseView.prototype.template = null;

  BaseView.prototype.dismissAlertTemplate = HBS['src/templates/snippets/dismiss_alert.hbs'];

  BaseView.prototype.render = function() {
    var model;
    if (_.isFunction(this.beforeRender)) {
      this.beforeRender();
    }
    if (this.model) {
      model = this.model.attributes;
    } else {
      model = {};
    }
    $(this.el).html(this.template(model));
    if (_.isFunction(this.afterRender)) {
      this.afterRender();
    }
    return this;
  };

  BaseView.prototype.renderIn = function(container) {
    var model;
    if (this.model) {
      model = this.model.attributes;
    } else {
      model = {};
    }
    $(container).html(this.template(model));
    return this;
  };

  BaseView.prototype.addInnerView = function(newView) {
    if (newView == null) {
      throw new Error('You must pass a new view to be rendered');
    }
    if (this.container == null) {
      throw new Error('You must set the "container" property before calling this function');
    }
    this.innerViews.push(newView);
    return this.renderView(newView);
  };

  BaseView.prototype.close = function() {
    if (_.isFunction(this.beforeClose)) {
      this.beforeClose();
    }
    if (_.isFunction(this.onClose)) {
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

  BaseView.prototype.dismissAlert = function(target, options) {
    var attrs;
    if (target == null) {
      return new Error('Yoy must pass a target for the alert');
    }
    if (options != null) {
      attrs = options;
    } else {
      attrs = {
        alert: "info",
        message: "<strong>HINT:</strong> You should pass an Object with a message."
      };
    }
    target = $(target);
    if ((options != null) && (options.fade != null) && options.fade) {
      return target.hide().html(this.dismissAlertTemplate(attrs)).fadeIn('slow');
    } else {
      return target.html(this.dismissAlertTemplate(attrs));
    }
  };

  BaseView.prototype.handleValidations = function(model, errors) {
    var error, i, input, labels, message, _i, _len, _results;
    this.dismissAlert('.info', {
      alert: "danger",
      message: 'Verifique su información'
    });
    this.$('p.control-label').remove();
    this.$('.has-error').removeClass('has-error');
    if (!((errors != null) && (model != null))) {
      return;
    }
    _results = [];
    for (i = _i = 0, _len = errors.length; _i < _len; i = ++_i) {
      error = errors[i];
      input = this.$("[name=" + error.attr + "]");
      labels = $(".error-label-for-" + error.attr);
      message = '<p class="control-label error-label-for-' + error.attr + '"><span class="glyphicon glyphicon-remove"></span>' + "  " + error.message + '</p>';
      input.after(message);
      _results.push(input.parent().addClass('has-error'));
    }
    return _results;
  };

  return BaseView;

})(App.Regions.BaseRegion);

App.Views.AppNav = (function(_super) {
  __extends(AppNav, _super);

  function AppNav() {
    _ref1 = AppNav.__super__.constructor.apply(this, arguments);
    return _ref1;
  }

  AppNav.prototype.name = "AppNav";

  AppNav.prototype.template = HBS['src/templates/app_nav.hbs'];

  AppNav.prototype.events = {
    'click ul.nav.navbar-nav li a': 'toggleActiveButton',
    'click .navbar-brand': 'removeActive'
  };

  AppNav.prototype.awake = function() {
    return this.listenTo(App.user, "change", this.render());
  };

  AppNav.prototype.removeActive = function() {
    return $('ul.nav.navbar-nav li.active').removeClass('active');
  };

  AppNav.prototype.toggleActiveButton = function(e) {
    var id;
    id = '#' + e.target.id;
    this.removeActive();
    return $(id).parent().addClass('active');
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

  ClientNav.prototype.name = 'ClientNav';

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

  Login.prototype.beforeRender = function() {
    return $('body').addClass('snowbg');
  };

  Login.prototype.beforeClose = function() {
    return $('body').removeClass('snowbg');
  };

  return Login;

})(App.Views.BaseView);

App.Views.UsersIndex = (function(_super) {
  __extends(UsersIndex, _super);

  function UsersIndex() {
    _ref6 = UsersIndex.__super__.constructor.apply(this, arguments);
    return _ref6;
  }

  UsersIndex.prototype.template = HBS['src/templates/users/users_index.hbs'];

  UsersIndex.prototype.container = 'tbody';

  UsersIndex.prototype.awake = function() {
    this.collection.fetch();
    this.listenTo(this.collection, "add", this.appendView);
    return this.listenTo(this.collection, "remove", this.removeView);
  };

  UsersIndex.prototype.handleSync = function() {
    var _this = this;
    return this.collection.forEach(function(model) {
      return _this.appendView(model);
    });
  };

  UsersIndex.prototype.appendView = function(model) {
    var view;
    view = new App.Views.UsersRow({
      model: model
    });
    return this.addInnerView(view);
  };

  UsersIndex.prototype.removeView = function(model) {
    return console.log(model);
  };

  return UsersIndex;

})(App.Views.BaseView);

App.Views.UsersNew = (function(_super) {
  __extends(UsersNew, _super);

  function UsersNew() {
    _ref7 = UsersNew.__super__.constructor.apply(this, arguments);
    return _ref7;
  }

  UsersNew.prototype.template = HBS['src/templates/users/users_new.hbs'];

  UsersNew.prototype.events = {
    "submit form": "create",
    "focus input": "toggleLabel",
    "focusout input": "toggleLabel"
  };

  UsersNew.prototype.awake = function() {
    this.listenTo(this.model, "sync", this.handleSuccess);
    this.listenTo(this.model, "error", this.handleError);
    this.listenTo(this.model, "invalid", this.handleValidations);
    return this.modelBinder = new Backbone.ModelBinder();
  };

  UsersNew.prototype.afterRender = function() {
    this.$('.control-label').hide();
    return this.modelBinder.bind(this.model, this.$el);
  };

  UsersNew.prototype.beforeClose = function() {
    return this.modelBinder.unbind();
  };

  UsersNew.prototype.create = function(e) {
    e.preventDefault();
    return this.model.save();
  };

  UsersNew.prototype.toggleLabel = function(e) {
    var targetName;
    if (_.isObject(e)) {
      targetName = e.target.name;
    } else if (_.isString(e)) {
      targetName = e;
    }
    if (this.$("input[name=" + targetName + "]").val() === "") {
      return this.$("[for=" + targetName + "]").fadeToggle('fast');
    }
  };

  UsersNew.prototype.handleSuccess = function(model, response, options) {
    this.model = new App.Models.User;
    this.render();
    this.dismissAlert('.info', {
      fade: true,
      alert: 'success',
      message: 'El usuario ha sido creado con exito.'
    });
    return $('[name=username]').focus();
  };

  UsersNew.prototype.handleError = function(model, xhr, options) {
    this.handleValidations();
    if (xhr.status === 400) {
      return this.dismissAlert('.info', {
        alert: 'danger',
        message: 'Ya existe el usuario.'
      });
    } else {
      return this.dismissAlert('.info', {
        alert: 'danger',
        message: 'Se ha producido un error al intentar crear el usuario.'
      });
    }
  };

  return UsersNew;

})(App.Views.BaseView);

App.Views.UsersRow = (function(_super) {
  __extends(UsersRow, _super);

  function UsersRow() {
    _ref8 = UsersRow.__super__.constructor.apply(this, arguments);
    return _ref8;
  }

  UsersRow.prototype.template = HBS['src/templates/users/users_row.hbs'];

  UsersRow.prototype.tagName = 'tr';

  UsersRow.prototype.awake = function() {
    return this.listenTo(this.model, "remove", this.close);
  };

  return UsersRow;

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
    'logout': 'logout',
    'users/new': 'usersNew',
    'users': 'usersIndex',
    'home': 'index',
    '': 'index',
    '*path': 'default'
  };

  MainRouter.prototype.requiresAuth = ['', '#home', '#logout', '#users/new', '#users'];

  MainRouter.prototype.preventAccessWhenAuth = ["#login"];

  MainRouter.prototype.before = function(params, next) {
    var cancelAccess, isAuth, needAuth, path;
    isAuth = App.session.get('authenticated');
    path = Backbone.history.location.hash;
    needAuth = _.contains(this.requiresAuth, path);
    cancelAccess = _.contains(this.preventAccessWhenAuth, path);
    if (needAuth && !isAuth) {
      App.session.set("redirectFrom", path);
      return Backbone.history.navigate('login', {
        trigger: true
      });
    } else if (isAuth && cancelAccess) {
      return Backbone.history.navigate('', {
        trigger: true
      });
    } else {
      return next();
    }
  };

  MainRouter.prototype.after = function(params) {
    this.setHeader();
    return this.setFooter();
  };

  MainRouter.prototype.setHeader = function() {
    var header, headerView;
    headerView = App.headerRegion.currentView;
    if (App.session.get("authenticated")) {
      if (((headerView != null) && headerView.name === "ClientNav") || (headerView == null)) {
        header = new App.Views.AppNav({
          model: App.user
        });
      }
    } else {
      if (((headerView != null) && headerView.name === "AppNav") || (headerView == null)) {
        header = new App.Views.ClientNav({
          model: App.appDetails
        });
      }
    }
    if (header != null) {
      return App.headerRegion.swapView(header);
    }
  };

  MainRouter.prototype.setFooter = function() {
    var footer;
    if (App.footerRegion.currentView == null) {
      footer = new App.Views.ClientFooter({
        model: App.appDetails
      });
    }
    if (footer != null) {
      return App.footerRegion.swapView(footer);
    }
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
    return App.contentRegion.swapView(new App.Views.ContentView({
      model: App.user
    }));
  };

  MainRouter.prototype["default"] = function() {
    return Backbone.history.navigate('', {
      trigger: true
    });
  };

  MainRouter.prototype.login = function() {
    App.headerRegion.swapView(new App.Views.ClientNav({
      model: App.appDetails
    }));
    return App.contentRegion.swapView(new App.Views.Login({
      model: App.session
    }));
  };

  MainRouter.prototype.logout = function(e) {
    return App.session.logout(function() {
      return Backbone.history.navigate('#login', {
        trigger: true
      });
    });
  };

  MainRouter.prototype.usersNew = function() {
    return App.contentRegion.swapView(new App.Views.UsersNew({
      model: new App.Models.User()
    }));
  };

  MainRouter.prototype.usersIndex = function() {
    return App.contentRegion.swapView(new App.Views.UsersIndex({
      collection: new App.Collections.Users()
    }));
  };

  return MainRouter;

})(App.Routers.BaseRouter);
