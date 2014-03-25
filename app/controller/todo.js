'use strict';

var debug = require('debug')('todo-controller');
var async = require('async');
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var Todo = mongoose.model('todo');
var Archive = mongoose.model('archive');

exports.main = function(req, res) {
	res.render('index');
};

/**
 * API Handler
 */
exports.list = function(req, res) {
  console.log('list');

  Todo.find().sort({ createdate: -1 }).exec(function(err, todos) {
    if(err)
      return res.status(500).end();

    if(todos === null)
      return res.json(200, {});

    res.json(200, todos);
  });
};

exports.archiveList = function(req, res) {
  console.log('archiveList');

  Archive.find({}, { name: 1, createdate: 1 }).sort({ createdate: -1 }).exec(function(err, todos) {
    if(err)
      return res.status(500).end();

    if(todos === null)
      return res.json(200, {});

    res.json(200, todos);
  });
};

exports.moveToArchive = function(req, res) {
  console.log('move to archive');

  Todo.find({ done: true }, function(err, todos) {
    async.series([
        function(callback){
          for(var i=0; i<todos.length; i++) {
            var archiveItem = new Archive({ name: todos[i].name });

            archiveItem.save();
          }

          callback(null, 'archive');
        }
      ],
      function(err, results){
        if(err)
          return res.status(500).end();

        Todo.remove({ done: true }, function(err, todos) {
          console.log('removed!');
        });

        res.status(200).end();
      });
  });
};

exports.clearArchive = function(req, res) {
  console.log('clear archive');

  Archive.remove(function(err, todos) {
    if(err)
      return res.status(500).end();

    res.status(200).end();
  });
};

exports.show = function(req, res) {
  console.log('show');

  Todo.findById(req.params.id, function(err, todo) {
    if(err)
      return res.status(500).end();

    if(todo === null)
      return res.status(404).end();

    res.json(200, todo);
  })
};

exports.new = function(req, res) {
  console.log('new');

  try {
    var todoData = req.body.todo;
    var newTodo = new Todo(todoData);
  } catch (ex) {

    console.error(ex, req.body);
    return res.status(400).end();
  }

  newTodo.save(function(err, todo) {
    if(err)
      return res.status(500).end();

    if(todo === null)
      return res.status(500).end();

    res.status(201).send(todo);
  });
};

exports.edit = function(req, res) {
  console.log('edit');

  try {
    var todoData = req.body.todo;
  } catch (ex) {
    console.error(ex);
    return res.status(400).end();
  }

  Todo.findById(req.params.id, function(err, todo) {
    if(err)
      return res.status(500).end();

    if(todo === null)
      return res.status(404).end();

    todo.done = todoData.done;
    todo.save(function(err, todo) {
      if(err)
        return res.status(500).end();

      res.json(200, todo);
    })
  });
};

exports.delete = function(req, res) {
  Todo.findByIdAndRemove(req.params.id, function(err, todo) {
    if(err)
      return res.status(500).end();

    res.status(200).end();
  })
};
