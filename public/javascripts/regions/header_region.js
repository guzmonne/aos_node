var _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

App.Regions.HeaderRegion = (function(_super) {
  __extends(HeaderRegion, _super);

  function HeaderRegion() {
    _ref = HeaderRegion.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  HeaderRegion.prototype.container = 'header';

  return HeaderRegion;

})(App.Regions.BaseRegion);
