WhatsNext.Mustache.Views['todos/edit'] = {      
  
  tags: function() {
    var tags = [
      { title: 'Errand', checked_attribute: 'checked' },
      { title: 'Errand: Groceries' },
      { title: 'Home' },
      { title: 'Refresh Chicago' },
      { title: 'Refresh Chicago: May 2010' },
      { title: 'Refresh Chicago: June 2010', checked_attribute: 'checked' },
      { title: 'Work' }
    ];
    
    tags.each( function(tag, i) {
      tags.id = i;
    });
    
    return tags;
  },
  
  title: 'Edit Todo'
  
};
