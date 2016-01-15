'use strict';

var Config = require('./lib/config')();
var SL = require('./lib/streetlives')(Config);
var App = require('./lib/server')(Config);

var returnJSON = function(response, err, data) {
  if (err) {
    return console.log(err);
  }
  response.writeHead('200', {
    'Content-Type': 'application/json'
  });
  response.write(JSON.stringify(data));
  response.end();
};

App.get('/', function(request, response) {
  response.render('index', { map_id: Config.MAP_ID, username: Config.DB.USER });
});

App.get('/about', function(request, response) {
  response.render('about', { map_id: Config.MAP_ID, username: Config.DB.USER });
});

App.get('/privacy', function(request, response) {
  response.render('privacy', { map_id: Config.MAP_ID, username: Config.DB.USER });
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
