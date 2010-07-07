WhatsNext.Mustache.Views['todos/index'] = {      
  
  todos: function() {
    var todos = [
      { title: 'Take out the trash' },
      { title: 'Do the dishes' },
      { title: 'Clean the cat litter' },
      { title: 'Find a lightning talk presenter' },
      { title: 'Find a main presenter' },
      { title: 'Get a Refresh Chicago DBA' },
      { title: 'Create and submit the Refresh Chicago expense report with receipts' },
      { title: 'Send Jon&rsquo;s parents a thank you' },
      { title: 'Get groceries' },
      { title: 'Take out the trash' },
      { title: 'Do the dishes' },
      { title: 'Clean the cat litter' },
      { title: 'Find a lightning talk presenter' },
      { title: 'Find a main presenter' },
      { title: 'Get a Refresh Chicago DBA' },
      { title: 'Create and submit the Refresh Chicago expense report with receipts' },
      { title: 'Send Jon&rsquo;s parents a thank you' },
      { title: 'Get groceries' },
      { title: 'Take out the trash' },
      { title: 'Do the dishes' },
      { title: 'Clean the cat litter' },
      { title: 'Find a lightning talk presenter' },
      { title: 'Find a main presenter' },
      { title: 'Get a Refresh Chicago DBA' },
      { title: 'Create and submit the Refresh Chicago expense report with receipts' },
      { title: 'Send Jon&rsquo;s parents a thank you' },
      { title: 'Get groceries' }
    ];
    
    todos.each( function(todo, i) { 
      todo.id = i;
      if (i < 4) todo.checked_attribute = 'checked';
    });
    
    // todos.insert 7, { :separator => true }
    
    return todos;
  }
  
};