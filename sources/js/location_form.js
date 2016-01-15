'use strict';

var LocationForm = SL.Dialog.extend({

  _TEXT: {
    title: 'Add location'
  },

  events: {
    'click .js-ok': '_onClickOk',
    'click .js-cancel': 'close',
    'keyup .js-name': '_onKeyUpName'
  },

  templateName: 'location_form',
  templateContentName: 'location_form_content',

  className: 'LocationForm is-hidden',

  initialize: function(options) {
    this._super('initialize', arguments);
    this._setupLocation();
  },

  render_content: function() {
    var attributes = _.extend({ title: this._TEXT.title }, this.location.attributes);
    this.$('.js-content').append(this.templateContent(attributes));
    return this;
  },

  _setupModel: function() {
    this.model = new SL.Model(_.extend({
      enabled: false,
      hidden: true
    }, this.options));

    this.model.bind('change:enabled', this._onChangeEnabled, this);
    this.model.bind('change:hidden', this._onChangeHidden, this);
  },

  _setupLocation: function() {
    this.location = new Location(this.options);
    this.location.bind('change:address', this._onChangeAddress, this);
    this.location.bind('change:name', this._onChangeName, this);

    this.location.on("invalid", function(model, error) {
      if (error === 'name') {
        this.$(".js-field").addClass('has-error');
      }
    }, this);
  },

  _onChangeHidden: function() {
    this.$el.toggleClass('is-hidden', this.model.get('hidden'));
  },

  _onChangeName: function() {
    this.$('.js-name').val(this.location.get('name'));
  },

  _onChangeEnabled: function() {
    this.$('.js-ok').toggleClass('is-disabled', !this.model.get('enabled'));
  },

  _onChangeAddress: function() {
    this.$('.js-address').text(this.location.get('address'));
  },

  _onKeyUpName: function() {
    this.model.set('enabled', this.$('.js-name').val().length > 0);
  },

  _onKeyUp: function(e) {
    if (e.keyCode === 27) {
      this.close();
    }
  },

  _isEnabled: function() {
    return this.model.get('enabled');
  },

  _onClickOk: function() {
    if (!this._isEnabled()) {
      return;
    }

    var ids = _.map(this.$('input:checked'), function(el) {
      return +$(el).val();
    });

    var name = this.$('.js-name').val();
    var username = this.$('.js-username').val();
    var comment = this.$('.js-comment').val();

    var self = this;

    this.location.save({ name: name, comment: comment, username: username, offerings: ids }, {
      success: function() {
      self.trigger('add_location', this.location, this);
      self.close();
    }});
  },

  _clear: function() {
    this.model.set({ enabled: false });
    this.$('.js-checkbox').attr('checked', false);
    this.$(".js-field").removeClass('has-error');
    this.$('.js-name').val('');
    this.$('.js-ok').addClass('is-disabled');
    this.$('.js-comment').val('');
  },

  _show: function() {
    var self = this;
    this.$('.js-content').fadeIn(150, function() {
      self.model.set('hidden', false);
    });
  },

  _hide: function() {
    var self = this;
    this.$('.js-content').fadeOut(150, function() {
      self.model.set('hidden', true);
    });
  },

  _focus: function() {
    var self = this;

    setTimeout(function() {
      self.$('.js-name').focus();
    }, 200);
  },

  open: function() {
    $(document).on("keyup", this._onKeyUp);
    $('body').append(this.render().$el);
    this._show();
    this._focus();
  },

  close: function() {
    $(document).off("keyup", this._onKeyUp);
    this._clear();
    this._hide();
  }
});

