var _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

App.Views.ClientNav = (function(_super) {
  __extends(ClientNav, _super);

  function ClientNav() {
    _ref = ClientNav.__super__.constructor.apply(this, arguments);
    return _ref;
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
