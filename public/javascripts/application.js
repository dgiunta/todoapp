WhatsNext = {};

WhatsNext.Mustache = {
  Templates: {},
  Views: {}
};

WhatsNext.Page = new Class({
  
  element: null,
  path: null,
  
  initialize: function(path) {
    this.path = path;
  },
  
  destroy: function() {
    this.element.dispose();
  },
  
  render: function() {
    var rendered_template = Mustache.to_html( 
      WhatsNext.Mustache.Templates[ this.path + '.html' ], 
      WhatsNext.Mustache.Views[ this.path ] 
    );

    this.element = new Element('div', { html: rendered_template }).getFirst();
    document.body.adopt(this.element);
    
    return this.element;
  }
  
});



window.addEvent('domready', function() {
  
  window.todosIndex = new WhatsNext.Page('todos/index');
  window.todosShow  = new WhatsNext.Page('todos/show');
  
  window.todosIndex.render();
  
});