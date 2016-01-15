'use strict';

SL.Dialog = SL.View.extend({
  className: 'Dialog is-hidden',

  events: {
    'click .js-ok': 'close',
    'click .js-cancel': 'close'
  },

  templateName: 'dialog',
  templateContentName: 'dialog_content',

  initialize: function(options) {

    _.bindAll(this, '_onKeyUp');

    $(document).on("keyup", this._onKeyUp);

    this.options = options;
    this.template = this._getTemplate(this.templateName);
    this.templateContent = this._getTemplate(this.templateContentName);

    this._setupModel();
  },

  render_content: function() {
    var attributes = this.model.attributes;
    this.$('.js-content').append(this.templateContent(attributes));
    this._initScroll();
    return this;
  },

  render: function() {
    this.$el.append(this.template());
    this.render_content();
    return this;
  },

  _onChangeHidden: function() {
    this.$el.toggleClass('is-hidden', this.model.get('hidden'));
  },

  _setupModel: function() {
    this.model = new SL.Model(_.extend({
      hidden: true
    }, this.options));

    this.model.bind('change:hidden', this._onChangeHidden, this);
  },

  toggle: function() {
    this.model.set('hidden', !this.model.get('hidden'));
  },

  _initScroll: function() {
    if (this.api) {
      this.api.reinitialise();
      return;
    }

    this.api = this.$('.js-scroll').jScrollPane().data('jsp');

    if (this.api) {
      var self = this;
      setTimeout(function() {
        self.api.reinitialise();
      }, 500);
    }
  },

  open: function() {
    $('body').append(this.render().$el);
    this.show();
  },

  show: function() {
    this.model.set('hidden', false);

    this._initScroll();
  },

  hide: function() {
    this.model.set('hidden', true);
  },

  isOpen: function() {
    return !this.model.get('hidden');
  },

  close: function() {
    this.hide();
    this.trigger('close', this);
    this.$el.remove();
  },

  _onKeyUp: function(e) {
    if (e.keyCode === 27) {
      this.close();
    }
  }

});

