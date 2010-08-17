describe('WillDo.Routes', function() {
  
  beforeEach( function() {
    originalPanels = WillDo.Panel._panels;
    WillDo.Panel._panels = [];
  });
  
  afterEach( function() {
    WillDo.Panel._panels = originalPanels;
  });
  
  describe('/', function() {
    
    it('redirects to /todos', function() {
      spyOn(WillDo, 'redirect');
      WillDo.route('/');
      expect(WillDo.redirect).toHaveBeenCalledWith('/todos');
    });

  });
  
  describe('/todos', function() {
    
    it('finds or creates a panel', function() {
      spyOn(WillDo.Panel, 'findOrCreate').andCallThrough();
      WillDo.route('/todos');
      expect(WillDo.Panel.findOrCreate).toHaveBeenCalledWith('/todos/index');
    });
    
    it('renders the panel', function() {
      thePanel = new WillDo.Panel();
      spyOn(WillDo.Panel, 'findOrCreate').andReturn(thePanel);
      spyOn(thePanel, 'render');
      
      WillDo.route('/todos');
      expect(thePanel.render).toHaveBeenCalled();
    });
    
  });
  
  describe('/todos/index_filter', function() {
    
    it('finds or creates a panel', function() {
      spyOn(WillDo.Panel, 'findOrCreate').andCallThrough();
      WillDo.route('/todos/index_filter');
      expect(WillDo.Panel.findOrCreate).toHaveBeenCalledWith('/todos/index_filter', { bodyClass: 'slide_up' });
    });
    
    it('renders the panel', function() {
      thePanel = new WillDo.Panel();
      spyOn(WillDo.Panel, 'findOrCreate').andReturn(thePanel);
      spyOn(thePanel, 'render');
      
      WillDo.route('/todos/index_filter');
      expect(thePanel.render).toHaveBeenCalled();
    });
    
  });
  
  describe('/todos/new', function() {
    
    it('finds or creates a panel', function() {
      spyOn(WillDo.Panel, 'findOrCreate').andCallThrough();
      WillDo.route('/todos/new');
      expect(WillDo.Panel.findOrCreate).toHaveBeenCalledWith('/todos/new', { bodyClass: 'slide_up' });
    });
    
    it('renders the panel', function() {
      thePanel = new WillDo.Panel();
      spyOn(WillDo.Panel, 'findOrCreate').andReturn(thePanel);
      spyOn(thePanel, 'render');
      
      WillDo.route('/todos/new');
      expect(thePanel.render).toHaveBeenCalled();
    });
    
  });
  
  describe('/todos/1/edit', function() {
    
    it('finds or creates a panel', function() {
      spyOn(WillDo.Panel, 'findOrCreate').andCallThrough();
      WillDo.route('/todos/1/edit');
      expect(WillDo.Panel.findOrCreate).toHaveBeenCalledWith('/todos/edit', { bodyClass: 'slide_left' });
    });
    
    it('unrenders and then renders the panel', function() {
      thePanel = new WillDo.Panel();
      spyOn(WillDo.Panel, 'findOrCreate').andReturn(thePanel);
      spyOn(thePanel, 'unrender').andCallThrough();
      spyOn(thePanel, 'render');
      
      WillDo.route('/todos/42/edit');
      expect(thePanel.unrender).toHaveBeenCalled();
      expect(thePanel.render).toHaveBeenCalledWith({ id: '42' });
    });
    
  });
  
});