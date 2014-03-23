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
    }
  });

var todoController = function($scope, $http) {
  $scope.init = function() {
    $scope.todoItem = "";
    $scope.todos = [];
  };

  $scope.enterTodo = function() {
    var todo = {
      name: $scope.todoItem,
      done: false,
      timestamp: Date()
    };
    var today = null;

    $scope.todos.unshift(todo);
    $scope.todoItem = "";
  };

  $scope.remaining = function() {
    var count = 0;

    angular.forEach($scope.todos, function(todo) {
      count += todo.done ? 0 : 1;
    });

    return count;
  };

  $scope.init();
}