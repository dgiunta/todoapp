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

  describe('class methods', function() {

    it('gets an array of all todos, which are instances of WhatsNext.Todo', function() {
      var todos = WhatsNext.Todo.all();
      expect( todos[0] ).toBeAnInstanceOf(WhatsNext.Todo);
    });

  });
   
});
