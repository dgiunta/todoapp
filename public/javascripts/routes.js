WhatsNext.routes = new Hash({
  
  '^/?$': function() {
    WhatsNext.redirect('/todos');
  },
  
  '^/todos/?$': function() {
    console.log('/todos/index');
    
    if ( !WhatsNext.panels.findByPath('/todos/index') )
      new WhatsNext.Panel('/todos/index');
    
    WhatsNext.panels.findByPath('/todos/index').render();
  },
  
  '^/todos/index_filter/?$': function() {
    console.log('/todos/index_filter');

    if ( !WhatsNext.panels.findByPath('/todos/index_filter') )
      new WhatsNext.Panel('/todos/index_filter', { bodyClass: 'slide_up' });
    
    WhatsNext.panels.findByPath('/todos/index_filter').render();
  },
  
  '^/todos/new/?$': function() {
    console.log('/todos/new');

    if ( !WhatsNext.panels.findByPath('/todos/new') )
      new WhatsNext.Panel('/todos/new', { bodyClass: 'slide_up' });
    
    WhatsNext.panels.findByPath('/todos/new').render();
  },
  
  '^/todos/(\\d+)/edit/?$': function(id) {
    console.log('/todos/edit with id: ' + id);

    if ( !WhatsNext.panels.findByPath('/todos/edit') )
      new WhatsNext.Panel('/todos/edit', { bodyClass: 'slide_left' });
    
    WhatsNext.panels.findByPath('/todos/edit').render();
  }
  
});