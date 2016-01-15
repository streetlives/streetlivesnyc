'use strict';

var Router = Backbone.Router.extend({

  routes: {
    "": "map",
    "/": "map"
  },

  map: function() {
  },

  about: function() {
    this.trigger('show_about', this);
  },

  privacy: function() {
    this.trigger('show_privacy', this);
  }

});

