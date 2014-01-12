window.App = {
  Models: {},
  Collections: {},
  Routers: {},
  Views: {},
  Regions: {},
  Mixins: {},
  vent: _.extend({}, Backbone.Events),
  headerRegion: null,
  contentRegion: null,
  footerRegion: null,
  appDetails: null,
  awake: function() {
    this.appDetails = new App.Models.Application();
    this.headerRegion = new App.Regions.HeaderRegion({
      currentView: new App.Views.ClientNav()
    });
    this.contentRegion = new App.Regions.ContentRegion({
      currentView: new App.Views.ContentView()
    });
    this.footerRegion = new App.Regions.FooterRegion({
      currentView: new App.Views.ClientFooter()
    });
    return App.start();
  },
  start: function() {
    new App.Routers.MainRouter();
    return Backbone.history.start({
      pushState: true
    });
  }
};

$(document).ready(function() {
  return App.awake();
});
