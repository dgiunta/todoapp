describe('WillDo.Views', function() {
  
  describe('/todos/edit', function() {
    
    beforeEach( function() {
      view = new WillDo.Views['/todos/edit']({ id: 3 });
    });
    
    it('has an associated template', function() {
      expect( WillDo.Templates['/todos/edit.html'] ).not.toBeNull();
    });
    
    it('has a title', function() {
      expect( view.title ).toEqual('Soon I Will&hellip;');
    });
    
    it('gets a single todo based on the passed "id" option', function() {
      spyOn(WillDo.Todo, 'find').andReturn('the todo');
      expect( view.todo() ).toEqual('the todo');
      expect( WillDo.Todo.find ).toHaveBeenCalledWith(3);
    });
    
    it('gets all tags', function() {
      spyOn(WillDo.Tag, 'all').andReturn('an array of tags');
      expect( view.tags() ).toEqual('an array of tags');
      expect( WillDo.Tag.all ).toHaveBeenCalled();
    });
    
  });
  
  describe('/todos/index', function() {
    
    beforeEach( function() {
      view = new WillDo.Views['/todos/index']();
    });
    
    it('has an associated template', function() {
      expect( WillDo.Templates['/todos/index.html'] ).not.toBeNull();
    });
    
    it('has a title', function() {
      expect( view.title ).toEqual('Will Do!');
    });
    
    it('gets all todos with a separator amongst them', function() {
      spyOn(WillDo.Todo, 'all').andReturn([ { an: 'array' }, { of: 'todos' } ]);
      expect( view.todos() ).toEqual([ { an: 'array' }, { of: 'todos' }, { separator: true } ]);
      expect( WillDo.Todo.all ).toHaveBeenCalled();
    });
    
  });
  
  describe('/todos/index_filter', function() {
    
    beforeEach( function() {
      view = new WillDo.Views['/todos/index_filter']();
    });
    
    it('has an associated template', function() {
      expect( WillDo.Templates['/todos/index_filter.html'] ).not.toBeNull();
    });
    
    it('has a title', function() {
      expect( view.title ).toEqual('Filter Todos');
    });
    
    it('gets all tags', function() {
      spyOn(WillDo.Tag, 'all').andReturn([ { an: 'array' }, { of: 'tags' } ]);
      expect( view.tags() ).toEqual([ { an: 'array' }, { of: 'tags' } ]);
      expect( WillDo.Tag.all ).toHaveBeenCalled();
    });
    
  });
  
  describe('/todos/new', function() {
    
    beforeEach( function() {
      view = new WillDo.Views['/todos/new']();
    });
    
    it('has an associated template', function() {
      expect( WillDo.Templates['/todos/new.html'] ).not.toBeNull();
    });
    
    it('has a title', function() {
      expect( view.title ).toEqual('Soon I Will&hellip;');
    });
    
    it('gets all tags', function() {
      spyOn(WillDo.Tag, 'all').andReturn([ { an: 'array' }, { of: 'tags' } ]);
      expect( view.tags() ).toEqual([ { an: 'array' }, { of: 'tags' } ]);
      expect( WillDo.Tag.all ).toHaveBeenCalled();
    });
    
  });
  
});