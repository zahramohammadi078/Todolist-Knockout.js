function TodoViewModel() {
  var thisVakue = this;
  this.newTodo = ko.observable("");
  this.todos = ko.observableArray([]);
  thisVakue.filter = ko.observable("all");

  thisVakue.filteredTodos = ko.computed(function() {
    switch (thisVakue.filter()) {
      case "complete":
        return ko.utils.arrayFilter(thisVakue.todos(), function(todo) { 
          return todo.complete();
        });
      case "active":
        return ko.utils.arrayFilter(thisVakue.todos(), function(todo) {
          return !todo.complete();
        });
      default:
        return thisVakue.todos();
    }
  });

  thisVakue.addTodo = function() {
    if (thisVakue.newTodo()) {
      thisVakue.todos.push({
        title: ko.observable(thisVakue.newTodo()),
        complete: ko.observable(false),
        toggleComplete: function() {
          this.complete(!this.complete());
        }
      });
      thisVakue.newTodo("");
    }
  };

  thisVakue.deleteTodo = function(todo) {
    thisVakue.todos.remove(todo);
  };

  thisVakue.editTodo = function(todo) {
    var newTitle = prompt("Edit the item:", todo.title());
    if(newTitle !==null){

      todo.title(newTitle);
    }
    
  };

  thisVakue.showAll = function() {
    thisVakue.filter("all");
  };

  thisVakue.showComplete = function() {
    thisVakue.filter("complete");
  };

  thisVakue.showActive = function() {
    thisVakue.filter("active");
  };
}

ko.applyBindings(new TodoViewModel());