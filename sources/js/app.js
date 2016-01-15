'use strict';

var App = SL.View.extend({
  el: 'body',

  initialize: function() {
    this.map = new MapView({ el: this.$('.Map') });

    this._setupRouter();

    this.header = new Header({
      router: this.router
    });

    this.render();
  },

  render: function() {
    this.map.render();
    this.$el.append(this.header.render().$el);
  },

  _setupRouter: function() {
    this.router = new Router();

    this.router.bind('show_about', this._showAbout, this);
    this.router.bind('show_privacy', this._showPrivacy, this);

    Backbone.history.start({ pushState: true });
  },

  _showAbout: function() {
    this.aboutPage = new Page({ text: 'about' });
    this.aboutPage.bind('close', this._showMap, this);
    this.aboutPage.open();
  },

  _showPrivacy: function() {
    this.privacyPage = new Page({ text: 'privacy' });
    this.privacyPage.bind('close', this._showMap, this);
    this.privacyPage.open();
  },

  _showMap: function() {
    this.router.navigate('', { trigger: true });
  }
});

$(function() {
  window.app = new App();
});
