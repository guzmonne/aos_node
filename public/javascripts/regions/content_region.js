var _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

App.Regions.ContentRegion = (function(_super) {
  __extends(ContentRegion, _super);

  function ContentRegion() {
    _ref = ContentRegion.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  ContentRegion.prototype.container = '#content';

  return ContentRegion;

})(App.Regions.BaseRegion);
