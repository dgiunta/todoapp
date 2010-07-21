WhatsNext = {};

(function(_) {
  
  _.logging = true;
  _.log = function(message) {
    if (_.logging) console.log(message);
  };

  _.Mustache = {
    Templates: {},
    Views: {}
  };

  _.Panel = new Class({
  
    Implements: [ Options ],
  
    element: null,
    options: {    
      bodyClass: ''
    },
    path: null,
  
    initialize: function(path, options) {
      this.path = path;
      this.setOptions(options);
      _._panels.push(this);
    },
  
    afterRender: function() {
      (function() {
        document.body.className = this.options.bodyClass;
      }.bind(this)).delay(10);
    
      return this;
    },
  
    render: function() {
      if ( this.element || !_.Mustache.Views[this.path] ) return this;
      _.log('RENDER "' + this.path + '"');
    
      var rendered_template = Mustache.to_html( 
        _.Mustache.Templates[this.path + '.html'], 
        _.Mustache.Views[this.path] 
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

  _._panels = [];

  $extend(_.Panel, {
  
    find: function(path) {
      for (var i = _._panels.length - 1; i >= 0; i--) {
        if (_._panels[i].path == path) 
          return _._panels[i];
      }
    
      return null;
    },
  
    findOrCreate: function(path, options) {
      var panel = this.find(path);
      if (panel) return panel;
    
      return new this(path, options);
    }
  
  });



  _.redirect = function(path) {
    _.log('REDIRECT "' + path + '"');
    window.location.hash = '#' + path;
  };

  _.callRouteFromFragment = function() {
    var path   = window.location.hash.substr(1);
    var routes = _.routes.getKeys();
  
    for (var i = 0; i < routes.length; i++) {
      var match = path.match( routes[i] );
      if (match) {
        _.log('GET "' + path + '" => "' + routes[i] + '"');
        _.routes[ routes[i] ].apply( null, match.splice(1) );
        return;
      }
    };
  
    _.redirect('/');
  };



  window.addEvent('domready', function() {
  
    document.addEventListener('touchmove', function(e) { e.preventDefault(); });
    
    window.addEventListener('hashchange', _.callRouteFromFragment, false);
    _.callRouteFromFragment();
    
  });

})(WhatsNext);