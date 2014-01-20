window.App = {
  Models: {},
  Collections: {},
  Routers: {},
  Views: {},
  Regions: {},
  Mixins: {},
  Config: {},
  vent: _.extend({}, Backbone.Events),
  headerRegion: null,
  contentRegion: null,
  footerRegion: null,
  appDetails: null,
  session: null,
  awake: function() {
    this.appDetails = new App.Models.Application();
    this.session = new App.Models.Session();
    this.headerRegion = new App.Regions.HeaderRegion();
    this.contentRegion = new App.Regions.ContentRegion();
    this.footerRegion = new App.Regions.FooterRegion();
    return App.start();
  },
  start: function() {
    return this.session.getAuth(function(response) {
      new App.Routers.MainRouter();
      return Backbone.history.start();
    });
  }
};

$(document).ready(function() {
  return App.awake();
});
