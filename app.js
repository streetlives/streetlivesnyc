'use strict';

var Config = {};
/**
 * Get configs from env if available. Used on Heroku deploy.
 */
if (process.env.MAP_ID && process.env.DB_USER && process.env.API_KEY) {
    Config = {
        port: process.env.PORT,
        log: 'responses.log',
        MAP_ID: process.env.MAP_ID,
        DB: {
            USER: process.env.DB_USER,
            API_KEY: process.env.API_KEY
        }
    }
} else {
    Config = require('./lib/config')();
}

var SL = require('./lib/streetlives')(Config);
var App = require('./lib/server')(Config);

var returnJSON = function(response, err, data) {
  if (err) {
      console.log(err);
      response.writeHead('400');
      response.end();
  } else {
      response.writeHead('200', {
        'Content-Type': 'application/json'
      });
      response.write(JSON.stringify(data));
      response.end();
  }
};

App.get('/locations', function(request, response) {
  if (request.query.q) {
      var queryStr = request.query.q ? request.query.q : "";
      SL.getLocations(queryStr, function(err, data) {
          returnJSON(response, err, data);
      });
  } else if (request.query.address) {
      var address = request.query.address ? request.query.address : "";
      SL.getLocationsByAddress(address, function(err, data) {
          returnJSON(response, err, data);
      });
  }
});

App.post('/location', function(request, response) {
  SL.insertLocation(request.body, function(err, data) {
    returnJSON(response, err, data);
  });
});

App.get('/offerings', function(request, response) {
  SL.getOfferings(function(err, data) {
    returnJSON(response, err, data);
  });
});

App.get('/likes', function(request, response) {
  SL.getLikes(request.query.location_id, function(err, data) {
    returnJSON(response, err, data);
  });
});

App.get('/comments', function(request, response) {
  SL.getComments(request.query.location_id, function(err, data) {
    returnJSON(response, err, data);
  });
});

App.post('/comments', function(request, response) {
  SL.insertComment(request.body, function(err, data) {
    returnJSON(response, err, data);
  });
});


App.get('*', function(request, response) {
  response.render('layout', { map_id: Config.MAP_ID, username: Config.DB.USER });
});
