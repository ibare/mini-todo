'use strict';

/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var env = process.env.NODE_ENV || 'development';
var todo = require('./app/controller/todo');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

console.log('Current Environment: ', env);

app.get('/', todo.main);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
