describe('WhatsNext.Views', function() {
  
  describe('/todos/edit', function() {
    
    beforeEach( function() {
      view = new WhatsNext.Views['/todos/edit']({ id: 3 });
    });
    
    it('has an associated template', function() {
      expect( WhatsNext.Templates['/todos/edit.html'] ).not.toBeNull();
    });
    
    it('has a title', function() {
      expect( view.title ).toEqual('Edit Todo');
    });
    
    it('gets a single todo based on the passed "id" option', function() {
      spyOn(WhatsNext.Todo, 'find').andReturn('the todo');
      expect( view.todo() ).toEqual('the todo');
      expect( WhatsNext.Todo.find ).toHaveBeenCalledWith(3);
    });
    
    it('gets all tags', function() {
      spyOn(WhatsNext.Tag, 'all').andReturn('an array of tags');
      expect( view.tags() ).toEqual('an array of tags');
      expect( WhatsNext.Tag.all ).toHaveBeenCalled();
    });
    
  });
  
  describe('/todos/index', function() {
    
    beforeEach( function() {
      view = new WhatsNext.Views['/todos/index']();
    });
    
    it('has an associated template', function() {
      expect( WhatsNext.Templates['/todos/index.html'] ).not.toBeNull();
    });
    
    it('has a title', function() {
      expect( view.title ).toEqual('What&rsquo;s Next?');
    });
    
    it('gets all todos with a separator amongst them', function() {
      spyOn(WhatsNext.Todo, 'all').andReturn([ { an: 'array' }, { of: 'todos' } ]);
      expect( view.todos() ).toEqual([ { an: 'array' }, { of: 'todos' }, { separator: true } ]);
      expect( WhatsNext.Todo.all ).toHaveBeenCalled();
    });
    
  });
  
  describe('/todos/index_filter', function() {
    
    beforeEach( function() {
      view = new WhatsNext.Views['/todos/index_filter']();
    });
    
    it('has an associated template', function() {
      expect( WhatsNext.Templates['/todos/index_filter.html'] ).not.toBeNull();
    });
    
    it('has a title', function() {
      expect( view.title ).toEqual('Filter Todos');
    });
    
    it('gets all tags', function() {
      spyOn(WhatsNext.Tag, 'all').andReturn([ { an: 'array' }, { of: 'tags' } ]);
      expect( view.tags() ).toEqual([ { an: 'array' }, { of: 'tags' } ]);
      expect( WhatsNext.Tag.all ).toHaveBeenCalled();
    });
    
  });
  
  describe('/todos/new', function() {
    
    beforeEach( function() {
      view = new WhatsNext.Views['/todos/new']();
    });
    
    it('has an associated template', function() {
      expect( WhatsNext.Templates['/todos/new.html'] ).not.toBeNull();
    });
    
    it('has a title', function() {
      expect( view.title ).toEqual('New Todo');
    });
    
    it('gets all tags', function() {
      spyOn(WhatsNext.Tag, 'all').andReturn([ { an: 'array' }, { of: 'tags' } ]);
      expect( view.tags() ).toEqual([ { an: 'array' }, { of: 'tags' } ]);
      expect( WhatsNext.Tag.all ).toHaveBeenCalled();
    });
    
  });
  
});