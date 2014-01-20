var _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

App.Views.ClientFooter = (function(_super) {
  __extends(ClientFooter, _super);

  function ClientFooter() {
    _ref = ClientFooter.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  ClientFooter.prototype.template = HBS['src/templates/footer.hbs'];

  return ClientFooter;

})(App.Views.BaseView);
