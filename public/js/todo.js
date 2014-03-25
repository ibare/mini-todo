angular.module('todoApp', [])
  .directive('ngOnEnter', function() {
    return function(scope, element, attrs) {
      element.bind("keydown keypress", function(event) {
        if(event.which === 13) {
          scope.$apply(function(){
            scope.$eval(attrs.ngOnEnter);
          });

          event.preventDefault();
        }
      });
    };
  });

var todoController = function($scope, $http) {
  $scope.loadTodos = function() {
    NProgress.start();

    $http.get('/api/todos')
      .success(function(data, status, headers, config) {
          $scope.todos = _(data).each(function(item) { item.timeago = moment(item.updatedate).fromNow(); });

          NProgress.done();
        })
      .error(function(data, status, headers, config) {
          NProgress.done();
        });
  };

  $scope.loadArchive = function() {
    NProgress.start();

    $http.get('/api/todos/archive')
      .success(function(data, status, headers, config) {
          $scope.archives = _(data).each(function(item) { item.timeago = moment(item.createdate).fromNow(); });

          NProgress.done();
        })
      .error(function(data, status, headers, config) {
          NProgress.done();
        });
  };

  $scope.init = function() {
    $scope.isEdit = false;
    $scope.todoItem = "";
    $scope.todos = [];
    $scope.archives = [];

    $scope.loadTodos();
    $scope.loadArchive();
  };

  $scope.enterTodo = function() {
    var todo = {
      name: $scope.todoItem,
      done: false
    };
    var today = null;

    NProgress.start();

    $http.post('/api/todos/new', { 'todo' : todo })
      .success(function(data, status, headers, config) {
          $scope.todos.unshift(data);
          $scope.todoItem = "";

          NProgress.done();
        })
      .error(function(data, status, headers, config) {
          alert('error!');

          NProgress.done();
        });
  };

  $scope.changeStatus = function(index) {
    NProgress.start();

    $http.put('/api/todos/'+$scope.todos[index]._id, { 'todo' : $scope.todos[index] })
      .success(function(data, status, headers, config) {
          $scope.todos[index].updatedate = data.updatedate;
          $scope.todos[index].timeago = moment(data.timeago).fromNow();

          NProgress.done();
        })
      .error(function(data, status, headers, config) {
          $scope.todos[index].done = !$scope.todos[index].done;

          NProgress.done();
        });
  };

  $scope.archive = function() {
    NProgress.start();

    $http.post('/api/todos/archive')
      .success(function(data, status, headers, config) {
          $scope.loadTodos();
          $scope.loadArchive();

          NProgress.done();
        })
      .error(function(data, status, headers, config) {
          $scope.loadTodos();
          $scope.loadArchive();

          NProgress.done();
        });
  };

  $scope.clearArchive = function() {
    NProgress.start();

    $http.delete('/api/todos/archive')
      .success(function(data, status, headers, config) {
          $scope.loadArchive();

          NProgress.done();
        })
      .error(function(data, status, headers, config) {
          $scope.loadArchive();

          NProgress.done();
        });
  };

  $scope.deleteItem = function(index) {
    NProgress.start();

    $http.delete('/api/todos/'+$scope.todos[index]._id)
      .success(function(data, status, headers, config) {
          $scope.todos.splice(index, 1);

          NProgress.done();
        })
      .error(function(data, status, headers, config) {
          NProgress.done();
        });
  };

  $scope.remainingTodo = function() {
    var count = 0;

    angular.forEach($scope.todos, function(todo) {
      count += todo.done ? 0 : 1;
    });

    return count;
  };

  $scope.toogleEditMode = function() {
    $scope.isEdit = !$scope.isEdit;
  };

  $scope.init();
};