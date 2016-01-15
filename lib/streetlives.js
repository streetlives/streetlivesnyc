'use strict';

module.exports = function(Config) {
  var module = {};
  module.DB = require('./db')(Config);

  module.getOfferings = function(callback) {
    this.DB.getOfferings(callback);
  };

  module.getLikes = function(location_id, callback) {
    this.DB.getLikes(location_id, callback);
  };

  module.getComments = function(location_id, callback) {
    this.DB.getComments(location_id, callback);
  };

  module.insertComment = function(comment, callback) {
    this.DB.insertComment(comment, callback);
  };

  module.insertLocation = function(location, callback) {
    this.DB.insertLocation(location, callback);
  };

  return module;
};
