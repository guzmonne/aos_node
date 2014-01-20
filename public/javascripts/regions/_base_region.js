var _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

App.Regions.BaseRegion = (function(_super) {
  __extends(BaseRegion, _super);

  function BaseRegion() {
    _ref = BaseRegion.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  BaseRegion.prototype.container = null;

  BaseRegion.prototype.currentView = null;

  BaseRegion.prototype.initialize = function(options) {
    if (options == null) {
      options = {};
    }
    if (options.container != null) {
      this.container = options.container;
    }
    if (options.currentView != null) {
      return this.currentView = options.currentView;
    }
  };

  BaseRegion.prototype.swapCurrentView = function(newView) {
    if (this.currentView) {
      this.currentView.close();
    }
    return this.currentView = newView;
  };

  BaseRegion.prototype.swapAndRenderCurrentView = function(newView) {
    this.swapCurrentView(newView);
    return this.render();
  };

  BaseRegion.prototype.render = function() {
    if (!((this.currentView != null) && (this.container != null))) {
      return;
    }
    $(this.container).append(this.currentView.render().el);
    return this;
  };

  return BaseRegion;

})(Backbone.View);
