(function(_) {
  
  _.Mustache.Views['/todos/new'] = new Class({
    
    Implements: [ _.View ],    
  
    tags: function() {
      return _.Tag.all();
    },

    title: 'New Todo'
    
  });

})(WhatsNext);