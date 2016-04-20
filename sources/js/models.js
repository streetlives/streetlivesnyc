SL.Model = Backbone.Model.extend();

var Comment = SL.Model.extend({
  validate: function(attrs, options) {
    if (!attrs.comment && attrs.liked == null) {
      return 'comment';
    }
  }
});

var Comments = SL.Collection.extend({
  model: Comment,
  url: '/comments',

  parse: function(response) {
    return response.rows;
  }
});

var Likes = SL.Collection.extend({
  url: '/likes',

  parse: function(response) {
    return response.rows;
  }
});

var Offering = SL.Model.extend();

var Offerings = SL.Collection.extend({
  model: Offering,
  url: '/offerings',

  parse: function(response) {
    return response.rows;
  }
});

var Location = SL.Model.extend({
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

var Locations = SL.Model.extend({
  url: '/locations',
  parse: function(response) {
    return response.rows;
  }
});
