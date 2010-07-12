WhatsNext.Mustache.Views['todos/new'] = {      
  
  tags: function() {
    var tags = [
      { title: 'Errand' },
      { title: 'Errand: Groceries' },
      { title: 'Home' },
      { title: 'Refresh Chicago' },
      { title: 'Refresh Chicago: May 2010' },
      { title: 'Refresh Chicago: June 2010' },
      { title: 'Work' }
    ];
    
    tags.each( function(tag, i) {
      tags.id = i;
    });
    
    return tags;
  },

  title: 'New'
    
};