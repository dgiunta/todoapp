_.Views = $H({
  
  '/todos/edit': new Class({
  
    tags: function() {
      return _.Tag.all();
    },

    title: 'Edit Todo',
  
    todo: function() {
      return _.Todo.find(this.options.id);
    }
  
  }),

  '/todos/index': new Class({
  
    title: 'What&rsquo;s Next?',
  
    todos: function() {
      var todos = _.Todo.all();
      todos.splice(7, 0, { separator: true });
      return todos;
    }

  }),

  '/todos/index_filter': new Class({
  
    tags: function() {
      return _.Tag.all();
    },

    title: 'Filter Todos'
  
  }),

  '/todos/new': new Class({
  
    tags: function() {
      return _.Tag.all();
    },

    title: 'New Todo'
  
  })

});

_.Views.each( function(view) {
  view.implement({

    Implements: [ Options ],

    initialize: function(options) {
      this.setOptions(options);
    }

  });
});
