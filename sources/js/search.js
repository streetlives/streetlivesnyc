'use strict';

var Search = SL.View.extend({

  className: 'InputField SearchField',

  initialize: function() {
    _.bindAll(this, '_onPlaceChange');

    this.template = this._getTemplate('search');
  },

  render: function() {
    this.$el.append(this.template());

    this._initAutoComplete();
    this._focus();

    return this;
  },

  _onPlaceChange: function() {

    var place = this.autocomplete.getPlace();

    if (!place.geometry || !place.geometry.location) {
      return;
    }

    this.trigger('goto_place', place, this);
  },

  _focus: function() {
    var self = this;

    setTimeout(function() {
      self.$('.js-field').focus();
    }, 500);
  },

  _initAutoComplete: function() {
    var input = this.$('.js-field')[0];

    this.autocomplete = new google.maps.places.Autocomplete(input, {
      componentRestrictions: { country: 'USA' }
    });

    google.maps.event.addListener(this.autocomplete, 'place_changed', this._onPlaceChange);
  }
});

