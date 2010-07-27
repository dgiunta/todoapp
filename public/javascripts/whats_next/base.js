WhatsNext = {
  _panels: [],
  logging: true,
  Mustache: {
    Templates: {},
    Views: {}
  }
};

(function(_) {
  
  _.log = function(message) {
    if (_.logging) console.log(message);
  };



  _.Panel = new Class({
  
    Implements: [ Events, Options ],
  
    element: null,
    options: {    
      bodyClass: ''
    },
    path: null,
  
    initialize: function(path, options) {
      this.path = path;
      this.setOptions(options);
      _._panels.push(this);
      
      this.addEvent('afterRender', this._setCurrent);
      this.addEvent('afterRender', this._setBodyClass);
    },
    
    _renderTemplate: function(viewVariables) {
      return Mustache.to_html( 
        _.Mustache.Templates[this.path + '.html'], 
        viewVariables 
      );
    },
  
    _setBodyClass: function() {
      var bodyClass = this.options.bodyClass;
      if (_._panels.length == 1) bodyClass += ' first_slide';
      document.body.className = bodyClass;
    },
    
    _setCurrent: function() {
      $$('.panel.current').removeClass('current');
      this.element.addClass('current');
    },
  
    render: function(viewVariables) {
      if (!this.element) {
        _.log('RENDER "' + this.path + '"');
        
        var renderedTemplate = this._renderTemplate(viewVariables);
        
        this.element = new Element('div', { html: renderedTemplate }).getFirst();
        this.element.inject(document.body);
    
        // new iScroll( this.element.getElement('.body') );
      }
      
      this.fireEvent('afterRender', [], 50);
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

  _.callRouteFromHash = function() {
    var path   = window.location.hash.substr(1);
    var routes = _.routes.getKeys();
  
    for (var i = 0; i < routes.length; i++) {
      var match = path.match( routes[i] );
      if (match) {
        _.log('ROUTE "' + path + '"  -->  "' + routes[i] + '"');
        _.routes[ routes[i] ].apply( null, match.splice(1) );
        return;
      }
    };
  
    _.redirect('/');
  };

})(WhatsNext);