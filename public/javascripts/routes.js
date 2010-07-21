(function(_) {
  
  _.routes = new Hash({
  
    '^/?$': function() {
      _.redirect('/todos');
    },
  
    '^/todos/?$': function() {
      _.Panel
        .findOrCreate('/todos/index')
        .show();
    },
  
    '^/todos/index_filter/?$': function() {
      _.Panel
        .findOrCreate('/todos/index_filter', { bodyClass: 'slide_up' })
        .show();
    },
  
    '^/todos/new/?$': function() {
      _.Panel
        .findOrCreate('/todos/new', { bodyClass: 'slide_up' })
        .show();
    },
  
    '^/todos/(\\d+)/edit/?$': function(id) {
      _.Panel
        .findOrCreate('/todos/edit', { bodyClass: 'slide_left' })
        .unrender()
        .show();
    }
  
  });

})(WhatsNext);