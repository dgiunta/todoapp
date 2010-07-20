WhatsNext.routes = new Hash({
  
  '^/?$': function() {
    WhatsNext.redirect('/todos');
  },
  
  '^/todos/?$': function() {
    console.log('/todos/index');
    WhatsNext.Panel
      .findOrCreate('/todos/index')
      .show();
  },
  
  '^/todos/index_filter/?$': function() {
    console.log('/todos/index_filter');
    WhatsNext.Panel
      .findOrCreate('/todos/index_filter', { bodyClass: 'slide_up' })
      .show();
  },
  
  '^/todos/new/?$': function() {
    console.log('/todos/new');
    WhatsNext.Panel
      .findOrCreate('/todos/new', { bodyClass: 'slide_up' })
      .show();
  },
  
  '^/todos/(\\d+)/edit/?$': function(id) {
    console.log('/todos/edit with id: ' + id);
    WhatsNext.Panel
      .findOrCreate('/todos/edit', { bodyClass: 'slide_left' })
      .unrender()
      .show();
  }
  
});