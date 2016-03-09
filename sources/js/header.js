'use strict';

var Header = SL.View.extend({

  tagName: 'div',

  events: {
    'click .js-map': '_onClickMap',
    'click .js-about': '_onClickAbout',
    'click .js-privacy': '_onClickPrivacy'
  },

  initialize: function(options) {
    this.options = options;
    _.bindAll(this, '_onOpenMap', '_onOpenAbout', '_onOpenPrivacy');

    this.template = this._getTemplate('header');

    this.router = this.options.router;
    this.router.on("route:about", this._onOpenAbout, this);
    this.router.on("route:privacy", this._onOpenPrivacy, this);
    this.router.on("route:map", this._onOpenMap, this);
  },

  render: function() {
    var options = {
      title: 'StreetlivesNYC',
      url: 'http://beta.streetlives.nyc'
    };

    ReactDOM.render(React.createElement(ReactHeader, options), this.$el[0]);
    return this;
  },

  _onOpenMap: function() {
    this.$('.js-item').removeClass('is-selected');
    this.$('.js-map').addClass('is-selected');
  },

  _onOpenAbout: function() {
    this.$('.js-item').removeClass('is-selected');
    this.$('.js-about').addClass('is-selected');
  },

  _onOpenPrivacy: function() {
    this.$('.js-item').removeClass('is-selected');
    this.$('.js-privacy').addClass('is-selected');
  },

  _onClickMap: function() {
    this.router.navigate('/', { trigger: true });
  },

  _onClickAbout: function() {
    this.router.navigate('about', { trigger: true });
  },

  _onClickPrivacy: function() {
    this.router.navigate('privacy', { trigger: true });
  }

});
