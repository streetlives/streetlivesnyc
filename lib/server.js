'use strict';

var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var consolidate = require('consolidate');

module.exports = function(Config) {
  var port = Config.port;
  var app = express();
  app.set('port', port);
  app.set('views', __dirname + '/../views');
  app.set('view engine', 'html');
  app.engine('html', consolidate.swig);
  app.set('view options', {
    layout: false
  });
  app.use(morgan({ format: 'dev', immediate: true }));
  app.use(bodyParser());
  app.use(require('errorhandler')());
  app.use(require('method-override')());
  app.use(cookieParser('F;;v,m-{-HC6YqTR}T=;'));
  app.use(session({
    cookie: { maxAge: 365 * 24 * 60 * 60 * 1000 },
    secret: 'HaTuBqJFsX92ngYZqEKR'
  }));

  app.use(express.static(path.join(__dirname, '../public')));

  app.listen(port, function() {
    return console.log('Listening on ' + port);
  });

  return app;
};
