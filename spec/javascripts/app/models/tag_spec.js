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
  
});