(function(_) {

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

})(WhatsNext);