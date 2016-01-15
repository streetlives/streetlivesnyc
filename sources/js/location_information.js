'use strict';

var LocationInformation = SL.Dialog.extend({

  _TEXT: {
    title: 'Add location'
  },

  events: {
    'click .js-cancel': 'close'
  },

  templateName: 'location_information',
  templateContentName: 'location_information_content',

  className: 'LocationInformation is-hidden',

  initialize: function(options) {
    this._super('initialize', arguments);
    this._setupLocation();
  },

  render_content: function() {
    var options = _.extend({ title: this._TEXT.title, description: '' }, this.location.attributes);

    this.$('.js-content').append(this.templateContent(options));
    this.$('.js-description').html(options.description);

    this.comments = new CommentsView({ name: options.name, location_id: options.cartodb_id });
    this.comments.render();
    this.comments.bind('comment', this._onComment, this);

    if (this.comments) {
      this.$('.js-fields').append(this.comments.$el);
    }
    return this;
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

  _setupModel: function() {
    this.model = new SL.Model({
      hidden: true
    });

    this.model.bind('change:hidden', this._onChangeHidden, this);
  },

  _onChangeEnabled: function() {
    this.$('.js-ok').toggleClass('is-disabled', !this.model.get('enabled'));
  },

  _onChangeHidden: function() {
    this.$el.toggleClass('is-hidden', this.model.get('hidden'));
  },

  _onChangeName: function() {
    this.$('.js-name').val(this.location.get('name'));
  },

  _onChangeAddress: function() {
    this.$('.js-address').text(this.location.get('address'));
  },

  _clear: function() {
    this.$('.js-checkbox').attr('checked', false);
    this.$(".js-field").removeClass('has-error');
    this.$('.js-name').val('');
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

  _onComment: function() {
    this.close();
    var success = new SL.Dialog({ title: 'Thank your for helping the community with your knowledge', text: '', ok_button: 'Ok, thanks' });
    success.open();
  },

  open: function(options) {
    $(document).on("keyup", this._onKeyUp);
    $('body').append(this.render().$el);
    this._show();
  },

  close: function() {
    $(document).off("keyup", this._onKeyUp);
    this._hide();
    this._clear();
    this.$el.remove();
  }
});

