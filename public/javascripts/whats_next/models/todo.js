(function(_) {
  
  _.Todo = new Class({
    
    Implements: [ _.Model ],
    
    _attributes: {
      id: null,
      title: ''
    }
    
  });
  
  $extend(_.Todo, {
    
    all: function() {
      var todoAttributes = [
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

      var todos = [];
      todoAttributes.each( function(attributes, i) { 
        todo = new this(attributes);
        todo.setId(i);
        // if (i < 4) todo.checked_attribute = 'checked';
        todos.push(todo);
      }.bind(this));

      return todos;
    },
    
    find: function(id) {
      var todo = this.all()[id];
      return todo;
    }
    
  });
  
})(WhatsNext);