(function(_) {
  
  _.routes = new Hash({
  
    '^/?$': function() {
      _.redirect('/todos');
    },
  
    '^/todos/?$': function() {
      _.Panel
        .findOrCreate('/todos/index')
        .render();
    },
  
    '^/todos/index_filter/?$': function() {
      _.Panel
        .findOrCreate('/todos/index_filter', { bodyClass: 'slide_up' })
        .render();
    },
  
    '^/todos/new/?$': function() {
      _.Panel
        .findOrCreate('/todos/new', { bodyClass: 'slide_up' })
        .render();
    },
  
    '^/todos/(\\d+)/edit/?$': function(id) {
      _.Panel
        .findOrCreate('/todos/edit', { bodyClass: 'slide_left' })
        .unrender()
        .render();
    }
  
  });

})(WhatsNext);