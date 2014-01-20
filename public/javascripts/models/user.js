var _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

App.Models.User = (function(_super) {
  __extends(User, _super);

  function User() {
    _ref = User.__super__.constructor.apply(this, arguments);
    return _ref;
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
