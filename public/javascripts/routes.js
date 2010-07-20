WhatsNext.routes = new Hash({
  
  '^/?$': function() {
    WhatsNext.redirect('/todos');
  },
  
  '^/todos/?$': function() {
    console.log('/todos/index');
    
    var panel = WhatsNext.Panel.find('/todos/index');
    if (panel) {
      panel.afterRender();
      return;
    }
    
    new WhatsNext.Panel('/todos/index').render();
  },
  
  '^/todos/index_filter/?$': function() {
    console.log('/todos/index_filter');
    WhatsNext.Panel.findOrCreate('/todos/index_filter', { bodyClass: 'slide_up' }).render();
  },
  
  '^/todos/new/?$': function() {
    console.log('/todos/new');
    WhatsNext.Panel.findOrCreate('/todos/new', { bodyClass: 'slide_up' }).render();
  },
  
  '^/todos/(\\d+)/edit/?$': function(id) {
    console.log('/todos/edit with id: ' + id);
    WhatsNext.Panel.findOrCreate('/todos/edit', { bodyClass: 'slide_left' }).render();
  }
  
});