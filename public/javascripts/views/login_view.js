var _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

App.Views.Login = (function(_super) {
  __extends(Login, _super);

  function Login() {
    _ref = Login.__super__.constructor.apply(this, arguments);
    return _ref;
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
