(function(_) {
  
  _.Views = {
    
    '/todos/edit': new Class({
    
      Implements: [ _.View ],
    
      tags: function() {
        return _.Tag.all();
      },

      title: 'Edit Todo',
    
      todo: function() {
        return _.Todo.find(this.options.id);
      }
    
    }),

    '/todos/index': new Class({
    
      Implements: [ _.View ],
    
      title: 'What&rsquo;s Next?',
    
      todos: function() {
        var todos = _.Todo.all();
        return todos;
      }

    }),

    '/todos/index_filter': new Class({
    
      Implements: [ _.View ],    
  
      tags: function() {
        return _.Tag.all();
      },

      title: 'Filter Todos'
    
    }),

    '/todos/new': new Class({
    
      Implements: [ _.View ],    
  
      tags: function() {
        return _.Tag.all();
      },

      title: 'New Todo'
    
    })
  
  };

})(WhatsNext);