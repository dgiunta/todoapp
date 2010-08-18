describe('WillDo.Tag', function() {
  
  describe('attributes', function() {
    
    beforeEach( function() {
      tag = new WillDo.Tag();
    });
  
    it('has an id attribute', function() {
      expect( tag.id() ).toBe(null);
    });
  
    it('has a name attribute', function() {
      expect( tag.title() ).toEqual('');
    });
  
  });

  describe('class methods', function() {
    
    it('gets the name of class', function() {
      expect( WillDo.Tag.toString() ).toBe('WillDo.Tag');
    });

    it('gets an array of all tags, which are instances of WillDo.Tag', function() {
      var tags = WillDo.Tag.all();
      expect( tags[0] ).toBeAnInstanceOf(WillDo.Tag);
    });

  });
  
});
