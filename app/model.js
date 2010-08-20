_.Model = new Class({

  _attributes: {
    id: null
  },
  
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
    
    this[setter] = function(value) {
      this._attributes[attribute] = value;
      return this;
    }.bind(this);
  },

  _generateId: function() {
    var json = this.toJSON();
    return SHA1("blob " + json.length + "\0" + json);
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

  _storageKey: function() {
    if (this.id() === null)
      throw 'Error: the storage key requires an id to already exist';
    
    return this.constructor.toString() + '.find("' + this.id() + '")';
  },
  
  _validatePresenceOf: function(attribute) {
    if ( !(attribute in this._attributes) )
      throw 'ArgumentError: ' + attribute + ' is not present in _attributes';
  },
  
  save: function() {
    if (this.id() === null)
      this.setId( this._generateId() );
    
    localStorage.setItem( this._storageKey(), this.toJSON() );
    return true;
  },
  
  toJSON: function() {
    return JSON.encode( $H(this._attributes) );
  }
  
});
