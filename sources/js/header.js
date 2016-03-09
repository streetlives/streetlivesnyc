'use strict';

var Header = SL.View.extend({

  tagName: 'div',

  render: function() {
    var options = {
      title: 'StreetlivesNYC',
      url: 'http://beta.streetlives.nyc',
      router: this.router
    };

    ReactDOM.render(React.createElement(ReactHeader, options), this.$el[0]);
    return this;
  }

});
