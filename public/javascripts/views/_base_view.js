var _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

App.Views.BaseView = (function(_super) {
  __extends(BaseView, _super);

  function BaseView() {
    _ref = BaseView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  BaseView.prototype.template = null;

  BaseView.prototype.initialize = function() {
    if (this.awake) {
      this.awake();
    }
    this.innerViews = [];
    if (this.model == null) {
      return this.model = App.appDetails;
    }
  };

  BaseView.prototype.render = function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  };

  BaseView.prototype.renderIn = function(container) {
    $(container).html(this.template(this.model.attributes));
    return this;
  };

  BaseView.prototype.close = function() {
    if (this.onClose) {
      this.onClose();
    }
    return this.remove();
  };

  BaseView.prototype.onClose = function() {
    var view, _i, _len, _ref1, _results;
    if (this.innerViews.length > 0) {
      _ref1 = this.innerViews;
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        view = _ref1[_i];
        _results.push(view.close());
      }
      return _results;
    }
  };

  return BaseView;

})(Backbone.View);
