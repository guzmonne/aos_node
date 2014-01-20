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
