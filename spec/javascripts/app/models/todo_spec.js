describe('WillDo.Todo', function() {
  
  describe('attributes', function() {
    
    beforeEach( function() {
      todo = new WillDo.Todo();
    });
  
    it('has an id attribute', function() {
      expect( todo.id() ).toBe(null);
    });
  
    it('has a name attribute', function() {
      expect( todo.title() ).toEqual('');
    });
  
  });

  describe('class methods', function() {

    it('gets an array of all todos, which are instances of WillDo.Todo', function() {
      var todos = WillDo.Todo.all();
      expect( todos[0] ).toBeAnInstanceOf(WillDo.Todo);
    });

  });
   
});
