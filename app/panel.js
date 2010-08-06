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
      throw 'Error: already initialized panel with path "' + path + '"';
    
    _.Panel._panels.push(this);
  
    this.addEvent('afterRender', this._setCurrent);
    this.addEvent('afterRender', this._setBodyClass);
  },
  
  _setBodyClass: function() {
    var bodyClass = this.options.bodyClass;
    if (!_.Panel._firstPanelWasRendered) bodyClass += ' first_render';
    document.body.className = bodyClass;
    
    _.Panel._firstPanelWasRendered = true;
  },

  _setCurrent: function() {
    $$('.panel.current').removeClass('current');
    this.element.addClass('current');
  },

  render: function(viewOptions) {
    if (!this.element) {
      _.log('RENDER "' + this.path + '"');
    
      var renderedTemplate = this.renderTemplate(viewOptions);
    
      this.element = new Element('div', { html: renderedTemplate }).getFirst();
      this.element.inject(document.body);
    }
  
    this.fireEvent('afterRender', [], 50);
    return this;
  },

  renderTemplate: function(viewOptions) {
    var templatePath = this.path + '.html';
    
    if ( !_.Templates[templatePath] )
      throw 'Error: could not find the template at "' + templatePath + '"';
  
    if ( !_.Views[this.path] )
      throw 'Error: could not find the view at "' + this.path + '"';
  
    return Mustache.to_html( 
      _.Templates[templatePath], 
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
  
  _firstPanelWasRendered: false,
  _panels: [],

  find: function(path) {
    for (var i = this._panels.length - 1; i >= 0; i--) {
      if (this._panels[i].path == path) 
        return this._panels[i];
    }

    return null;
  },

  findOrCreate: function(path, options) {
    var panel = this.find(path);
    if (panel) return panel;

    return new this(path, options);
  }

});