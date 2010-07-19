WhatsNext.Mustache.Views['/todos/index_filter'] = {      
  
  tags: function() {
    var tags = [
      { title: 'Errand', checked_attribute: 'checked' },
      { title: 'Errand: Groceries' },
      { title: 'Home', checked_attribute: 'checked' },
      { title: 'Refresh Chicago', checked_attribute: 'checked' },
      { title: 'Refresh Chicago: May 2010', checked_attribute: 'checked' },
      { title: 'Refresh Chicago: June 2010', checked_attribute: 'checked' },
      { title: 'Work' }
    ];
    
    tags.each( function(tag, i) {
      tags.id = i;
    });
    
    return tags;
  },
  
  title: 'Filter Todos'
    
};