var _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

App.Models.Application = (function(_super) {
  __extends(Application, _super);

  function Application() {
    _ref = Application.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Application.prototype.defaults = function() {
    return {
      title: 'AOS',
      description: 'Administrador de Ordenes de Servicio',
      author: 'Guzman Monne',
      footer: 'Base App - Guzman Monne - 2014 | Express + Backbone + Handlebars + Bootstrap '
    };
  };

  return Application;

})(Backbone.Model);
