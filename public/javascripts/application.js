WhatsNext = {};

WhatsNext.Mustache = {
  Templates: {},
  Views: {}
};

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
    WhatsNext._panels.push(this);
  },
  
  afterRender: function() {
    (function() {
      document.body.className = this.options.bodyClass;
    }.bind(this)).delay(10);
    
    return this;
  },
  
  render: function() {
    if ( this.element || !WhatsNext.Mustache.Views[this.path] ) return this;
    console.log('rendering...');
    
    var rendered_template = Mustache.to_html( 
      WhatsNext.Mustache.Templates[this.path + '.html'], 
      WhatsNext.Mustache.Views[this.path] 
    );

    this.element = new Element('div', { html: rendered_template }).getFirst();
    this.element.inject(document.body);
    
    // new iScroll( this.element.getElement('.body') );
    
    return this;
  },
  
  show: function() {
    this.render();
    this.afterRender();
    return this;
  },
  
  unrender: function() {
    if (this.element) {
      this.element.dispose();
      this.element = null;
    }
    
    return this;
  }
  
});

WhatsNext._panels = [];

$extend(WhatsNext.Panel, {
  
  find: function(path) {
    for (var i = WhatsNext._panels.length - 1; i >= 0; i--) {
      if (WhatsNext._panels[i].path == path) 
        return WhatsNext._panels[i];
    }
    
    return null;
  },
  
  findOrCreate: function(path, options) {
    var panel = this.find(path);
    if (panel) return panel;
    
    return new this(path, options);
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