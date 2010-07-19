WhatsNext = {};

WhatsNext.Mustache = {
  Templates: {},
  Views: {}
};

WhatsNext.panels = [];
$extend(WhatsNext.panels, {
  
  findByPath: function(path) {
    for (var i = this.length - 1; i >= 0; i--) {
      if (this[i].path == path) 
        return this[i];
    }
    
    return null;
  }
  
});

WhatsNext.Panel = new Class({
  
  Implements: [ Options ],
  
  element: null,
  options: {    
    bodyClass: ''
  },
  path: null,
  
  initialize: function(path, options) {
    this.path = path;
    this.setOptions(options);
    WhatsNext.panels.push(this);
  },
  
  remove: function() {
    if (this.element) this.element.dispose();
  },
  
  render: function() {
    if ( !WhatsNext.Mustache.Views[this.path] ) return;
    
    this.remove();

    var rendered_template = Mustache.to_html( 
      WhatsNext.Mustache.Templates[this.path + '.html'], 
      WhatsNext.Mustache.Views[this.path] 
    );

    this.element = new Element('div', { html: rendered_template }).getFirst();
    this.element.inject(document.body);
    
    (function() {
      document.body.className = this.options.bodyClass;
    }.bind(this)).delay(10);
    
    // new iScroll( this.element.getElement('.body') );
  }
  
});



WhatsNext.redirect = function(path) {
  console.log('Redirecting to "' + path + '"');
  window.location.hash = '#' + path;
};

WhatsNext.callRouteFromFragment = function() {
  var path   = window.location.hash.substr(1);
  var routes = WhatsNext.routes.getKeys();
  
  for (var i = 0; i < routes.length; i++) {
    var match = path.match( routes[i] );
    if (match) {
      WhatsNext.routes[ routes[i] ].apply( null, match.splice(1) );
      return;
    }
  };
  
  WhatsNext.redirect('/');
};



window.addEvent('domready', function() {
  
  document.addEventListener('touchmove', function(e) { e.preventDefault(); });
    
  window.addEventListener('hashchange', WhatsNext.callRouteFromFragment, false);
  
  WhatsNext.callRouteFromFragment();
    
});