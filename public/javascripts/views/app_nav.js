var _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

App.Views.AppNav = (function(_super) {
  __extends(AppNav, _super);

  function AppNav() {
    _ref = AppNav.__super__.constructor.apply(this, arguments);
    return _ref;
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
