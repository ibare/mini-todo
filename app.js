'use strict';

/**
 * Module dependencies.
 */
var debug = require('debug')('mini-todo');
var fs = require('fs');
var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development';

// Connect mongodb
var connectMongoDB = function () {
  mongoose.connect('mongodb://localhost:27017/todo');
};

mongoose.connection.on('connected', function () {
  console.log('mongodb connected', Date());
  console.log('Running mongoose version '+mongoose.version);
});

// Error handler
mongoose.connection.on('error', function (err) {
  console.log(err);
});

// Reconnect when closed
mongoose.connection.on('disconnected', function () {
  console.log('mongoose reconnect!!');
  connectMongoDB();
});

connectMongoDB();

// Bootstrap models
var model_path = './app/model';
fs.readdirSync(model_path).forEach(function (file) {
  require(model_path+'/'+file);
});

var todo = require('./app/controller/todo');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

console.log('Current Environment: ', env);

// Web Routing
app.get('/', todo.main);

app.get('/health', function(req, res) {
  res.status(200).send(new Buffer(JSON.stringify({
    pid: process.pid,
    memory: process.memoryUsage(),
    uptime: process.uptime()
  })));
});

// API Routing
app.get ('/api/todos', todo.list);
app.post('/api/todos/new', todo.new);
app.get ('/api/todos/archive', todo.archiveList);
app.post('/api/todos/archive', todo.moveToArchive);
app.del ('/api/todos/archive', todo.clearArchive);
app.get ('/api/todos/:id', todo.show);
// app.get ('/api/todos/archive', todo.archiveList); <== 순서가 이곳에 있다면?
app.put ('/api/todos/:id', todo.edit);
app.del ('/api/todos/:id', todo.delete);

// Run Server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
