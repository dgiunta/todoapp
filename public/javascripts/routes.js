WhatsNext.routes = new Hash({
  
  '^/?$': function() {
    WhatsNext.redirect('/todos');
  },
  
  '^/todos/?$': function() {
    WhatsNext.Panel
      .findOrCreate('/todos/index')
      .show();
  },
  
  '^/todos/index_filter/?$': function() {
    WhatsNext.Panel
      .findOrCreate('/todos/index_filter', { bodyClass: 'slide_up' })
      .show();
  },
  
  '^/todos/new/?$': function() {
    WhatsNext.Panel
      .findOrCreate('/todos/new', { bodyClass: 'slide_up' })
      .show();
  },
  
  '^/todos/(\\d+)/edit/?$': function(id) {
    WhatsNext.Panel
      .findOrCreate('/todos/edit', { bodyClass: 'slide_left' })
      .unrender()
      .show();
  }
  
});