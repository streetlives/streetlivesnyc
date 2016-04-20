import Backbone from 'backbone';

module.exports.Comment = Backbone.Model.extend({
  validate: function(attrs, options) {
    if (!attrs.comment && attrs.liked == null) {
      return 'comment';
    }
  }
});

module.exports.Comments = Backbone.Collection.extend({
  model: module.exports.Comment,
  url: '/comments',

  parse: function(response) {
    return response.rows;
  }
});

module.exports.Likes = Backbone.Collection.extend({
  url: '/likes',

  parse: function(response) {
    return response.rows;
  }
});

module.exports.Offering = Backbone.Model.extend();

module.exports.Offerings = Backbone.Collection.extend({
  model: module.exports.Offering,
  url: '/offerings',

  parse: function(response) {
    return response.rows;
  }
});

module.exports.Location = Backbone.Model.extend({
  url: '/location',
  defaults: {
    offerings: '',
    address: '',
    name: ''
  },
  validate: function(attrs, options) {
    if (!attrs.name) {
      return 'name';
    }
  }
});

module.exports.Locations = Backbone.Model.extend({
  url: '/locations',
  parse: function(response) {
    return response.rows;
  }
});
