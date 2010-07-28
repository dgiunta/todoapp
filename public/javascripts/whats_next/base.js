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



  _.Model = new Class({
    
    _attributes: {},
    
    initialize: function(attributes) {
      this._createAccessors();
      this._setAttributes(attributes);
    },
    
    _createAccessor: function(attribute) {
      this._createGetter(attribute);
      this._createSetter(attribute);
    },
    
    _createAccessors: function() {
      $H(this._attributes).getKeys().each( function(attribute) {
        this._createAccessor(attribute);
      }.bind(this));
    },
    
    _createGetter: function(attribute) {
      if ( this[attribute] ) return;
      
      this._validatePresenceOf(attribute);
      
      this[attribute] = function() {
        return this._attributes[attribute];
      }.bind(this);
    },
    
    _createSetter: function(attribute) {
      var setter = this._setterFor(attribute);
      if ( this[setter] ) return;
      
      this._validatePresenceOf(attribute);
      
      this[setter] = function(value) {
        this._attributes[attribute] = value;
        return this;
      }.bind(this);
    },
    
    _setAttributes: function(attributes) {
      $H(attributes).each( function(value, attribute) {
        this[ this._setterFor(attribute) ](value);
      }.bind(this));
    },
    
    _setterFor: function(attribute) {
      this._validatePresenceOf(attribute);
      return 'set' + attribute.charAt(0).toUpperCase() + attribute.slice(1);
    },
    
    _validatePresenceOf: function(attribute) {
      if ( !(attribute in this._attributes) )
        throw 'ArgumentError: ' + attribute + ' is not present in _attributes';
    }
    
  });
  
  
  
  _.View = new Class({
    
    Implements: [ Options ],
    
    options: {},
    
    initialize: function(options) {
      this.setOptions(options);
    }
  
  });
  
  
  
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
    
    _renderTemplate: function(viewOptions) {
      return Mustache.to_html( 
        _.Mustache.Templates[this.path + '.html'], 
        new _.Mustache.Views[this.path](viewOptions) 
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
  
    render: function(viewOptions) {
      if (!this.element) {
        if ( !_.Mustache.Views[this.path] )
          throw 'Error: could not find the view at "' + this.path + '"';
        
        _.log('RENDER "' + this.path + '"');
        
        var renderedTemplate = this._renderTemplate(viewOptions);
        
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