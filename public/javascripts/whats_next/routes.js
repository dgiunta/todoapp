(function(_) {
  
  _.routes = new Hash({
  
    '^/?$': function() {
      _.redirect('/todos');
    },
  
    '^/todos/?$': function() {
      _.Panel
        .findOrCreate('/todos/index')
        .render({ 
          title: 'What&rsquo;s Next?',
          todos: _.Todo.all() 
        });
    },
  
    '^/todos/index_filter/?$': function() {
      _.Panel
        .findOrCreate('/todos/index_filter', { bodyClass: 'slide_up' })
        .render({ 
          tags: _.Tag.all(),
          title: 'Filter Todos'
        });
    },
  
    '^/todos/new/?$': function() {
      _.Panel
        .findOrCreate('/todos/new', { bodyClass: 'slide_up' })
        .render({ 
          tags: _.Tag.all(),
          title: 'New Todo'
        });
    },
  
    '^/todos/(\\d+)/edit/?$': function(id) {
      _.Panel
        .findOrCreate('/todos/edit', { bodyClass: 'slide_left' })
        .unrender()
        .render({ 
          tags: _.Tag.all(), 
          title: 'Edit Todo',
          todo: _.Todo.find(id) 
        });
    }
  
  });

})(WhatsNext);