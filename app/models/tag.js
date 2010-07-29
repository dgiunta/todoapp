_.Tag = new Class({
  
  Implements: [ _.Model ],
  
  _attributes: {
    id: null,
    title: ''
  }
  
});

$extend(_.Tag, {
  
  all: function() {
    var tagAttributes = [
      { title: 'Errand' },
      { title: 'Errand: Groceries' },
      { title: 'Home' },
      { title: 'Refresh Chicago' },
      { title: 'Refresh Chicago: May 2010' },
      { title: 'Refresh Chicago: June 2010' },
      { title: 'Work' }
    ];
    
    var tags = [];
    tagAttributes.each( function(attributes, i) {
      tag = new this(attributes);
      tag.setId(i);
      tags.push(tag);
    }.bind(this));

    return tags;
  }
  
});
