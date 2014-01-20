var _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

App.Models.Session = (function(_super) {
  __extends(Session, _super);

  function Session() {
    _ref = Session.__super__.constructor.apply(this, arguments);
    return _ref;
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
