describe('WhatsNext.Todo', function() {
  
  describe('attributes', function() {
    
    beforeEach( function() {
      todo = new WhatsNext.Todo();
    });
  
    it('has an id attribute', function() {
      expect( todo.id() ).toBe(null);
    });
  
    it('has a name attribute', function() {
      expect( todo.title() ).toEqual('');
    });
  
  });
  
});