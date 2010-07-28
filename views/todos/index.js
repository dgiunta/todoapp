(function(_) {
  
  _.Mustache.Views['/todos/index'] = {      
  
    title: 'What&rsquo;s Next?',
    
    todos: function() {
      var todos = _.Todo.all();
      return todos;
    }

  };

})(WhatsNext);