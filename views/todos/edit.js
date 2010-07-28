(function(_) {
  
  _.Mustache.Views['/todos/edit'] = {      
  
    tags: function() {
      return _.Tag.all();
    },

    title: 'Edit Todo',
    
    todo: function() {
      return _.Todo.find( _.params[0] );
    }
    
  };

})(WhatsNext);