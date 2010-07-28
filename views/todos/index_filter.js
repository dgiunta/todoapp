(function(_) {
  
  _.Mustache.Views['/todos/index_filter'] = {      
  
    tags: function() {
      return _.Tag.all();
    },

    title: 'Filter Todos'
    
  };

})(WhatsNext);