(function(_) {
  
  _.Mustache.Views['/todos/index'] = new Class({
    
    Implements: [ _.View ],
    
    title: 'What&rsquo;s Next?',
    
    todos: function() {
      var todos = _.Todo.all();
      return todos;
    }

  });

})(WhatsNext);