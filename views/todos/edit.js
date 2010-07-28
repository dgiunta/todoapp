(function(_) {
  
  _.Mustache.Views['/todos/edit'] = new Class({
    
    Implements: [ _.View ],
    
    tags: function() {
      return _.Tag.all();
    },

    title: 'Edit Todo',
    
    todo: function() {
      return _.Todo.find(this.options.id);
    }
    
  });

})(WhatsNext);