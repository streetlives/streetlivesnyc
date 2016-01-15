'use strict';

var Button = SL.View.extend({

  tagName: 'button',

  className: 'Button Button--addLocation is-hidden',

  events: {
    'click': '_onClick'
  },

  initialize: function(options) {
    this.options = options;
    this.template = this._getTemplate('button');
    this.model = new Backbone.Model(this.options);
    this.model.bind('change:hidden', this._onChangeHidden, this);
  },

  render: function() {
    this.$el.append(this.template({ title: this.options.title }));
    return this;
  },

  _onChangeHidden: function() {
    this.$el.toggleClass('is-hidden', this.model.get('hidden'));
  },

  _onClick: function(e) {
    this._killEvent(e);
    this.trigger('click', this);
  },

  show: function() {
    this.model.set('hidden', false);
  },

  hide: function() {
    this.model.set('hidden', true);
  }
});

