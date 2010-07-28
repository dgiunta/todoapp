(function(_) {
  
  _.Mustache.Views['/todos/index_filter'] = new Class({
    
    Implements: [ _.View ],    
  
    tags: function() {
      return _.Tag.all();
    },

    title: 'Filter Todos'
    
  });

})(WhatsNext);