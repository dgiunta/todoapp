_._panels = [];

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
    
    if ( _.Panel.find(path) )
      throw 'PanelError: already initialized panel with path "' + path + '"';
    
    _._panels.push(this);
  
    this.addEvent('afterRender', this._setCurrent);
    this.addEvent('afterRender', this._setBodyClass);
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
      if ( !_.Views[this.path] )
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

  renderTemplate: function(viewOptions) {
    return Mustache.to_html( 
      _.Templates[this.path + '.html'], 
      new _.Views[this.path](viewOptions) 
    );
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
