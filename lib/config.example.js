'use strict';

module.exports = function(env) {

  var defaultPort = 7000;

  if (!env) {
    env = process.env.NODE_ENV || 'development';
  }

  return {
    development: {
      port: defaultPort,
      log: 'responses.log',
      MAP_ID: '1234567890XXX',
      DB: {
        USER: 'username',
        API_KEY: '1234'
      }
    },
    test: {
      port: defaultPort,
      log: 'responses.log',
      MAP_ID: '1234567890XXX',
      DB: {
        USER: 'username',
        API_KEY: '1234'
      }
    },
    production: {
      port: defaultPort,
      log: 'responses.log',
      MAP_ID: '1234567890XXX',
      DB: {
        USER: 'username',
        API_KEY: '1234'
      }
    }
  }[env];
};

