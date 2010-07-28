(function(_) {
  
  _.Mustache.Views['/todos/new'] = {      
  
    tags: function() {
      return _.Tag.all();
    },

    title: 'New Todo'
    
  };

})(WhatsNext);