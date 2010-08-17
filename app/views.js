_.Views = $H({
  
  '/todos/edit': new Class({
  
    tags: function() {
      return _.Tag.all();
    },

    title: 'Soon I Will&hellip;',
  
    todo: function() {
      return _.Todo.find(this.options.id);
    }
  
  }),

  '/todos/index': new Class({
  
    title: 'Will Do!',
  
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

    title: 'Soon I Will&hellip;'
  
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
