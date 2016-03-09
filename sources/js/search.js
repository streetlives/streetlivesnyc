'use strict';

var Search = SL.View.extend({

  className: 'InputField SearchField',

  initialize: function() {
    _.bindAll(this, '_onPlaceChange');

    this.template = this._getTemplate('search');
  },

  render: function() {
    ReactDOM.render(React.createElement(ReactSearch), this.$el[0]);
    return this;
  },

  _onPlaceChange: function() {

    var place = this.autocomplete.getPlace();

    if (!place.geometry || !place.geometry.location) {
      return;
    }

    this.trigger('goto_place', place, this);
  }
});

