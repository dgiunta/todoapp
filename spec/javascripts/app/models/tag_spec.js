describe('WhatsNext.Tag', function() {
  
  describe('attributes', function() {
    
    beforeEach( function() {
      tag = new WhatsNext.Tag();
    });
  
    it('has an id attribute', function() {
      expect( tag.id() ).toBe(null);
    });
  
    it('has a name attribute', function() {
      expect( tag.title() ).toEqual('');
    });
  
  });

  describe('class methods', function() {

    it('gets an array of all tags, which are instances of WhatsNext.Tag', function() {
      var tags = WhatsNext.Tag.all();
      expect( tags[0] ).toBeAnInstanceOf(WhatsNext.Tag);
    });

  });
  
});
