var _ref,
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
