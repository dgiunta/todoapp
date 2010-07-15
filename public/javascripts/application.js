WhatsNext = {};

WhatsNext.Mustache = {
  Templates: {},
  Views: {}
};

WhatsNext.Panel = new Class({
  
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
    this.element.inject(document.body);
    
    new iScroll( this.element.getElement('.body') );
    
    return this.element;
  }
  
});

WhatsNext.renderPanelFromFragment = function() {
  var path = window.location.hash.substr(2);

  if (path == 'todos/index') {
    document.body.removeClass('slide_left').removeClass('slide_up');
    return;
  }
  
  if ( !WhatsNext.Mustache.Views[path] ) return;
  
  var panelElement = $( path.replace('/', '_') + '_panel' );
  if (panelElement) panelElement.dispose();

  new WhatsNext.Panel(path).render();
  
  var addBodyClass = null;
  if (path == 'todos/edit')
    addBodyClass = 'slide_left';
  else if (path == 'todos/index_filter' || path == 'todos/new')
    addBodyClass = 'slide_up';
    
  if (addBodyClass)
    (function() {
      document.body.addClass(addBodyClass);
    }).delay(10);
};



window.addEvent('domready', function() {
  
  document.addEventListener('touchmove', function(e) { e.preventDefault(); });
    
  new WhatsNext.Panel('todos/index').render();
  
  window.addEventListener('hashchange', WhatsNext.renderPanelFromFragment, false);
  
  WhatsNext.renderPanelFromFragment();
    
});