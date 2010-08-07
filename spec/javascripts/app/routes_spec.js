describe('WhatsNext.Routes', function() {
  
  beforeEach( function() {
    originalPanels = WhatsNext.Panel._panels;
    WhatsNext.Panel._panels = [];
  });
  
  afterEach( function() {
    WhatsNext.Panel._panels = originalPanels;
  });
  
  describe('/', function() {
    
    it('redirects to /todos', function() {
      spyOn(WhatsNext, 'redirect');
      WhatsNext.route('/');
      expect(WhatsNext.redirect).toHaveBeenCalledWith('/todos');
    });

  });
  
  describe('/todos', function() {
    
    it('creates a panel', function() {
      spyOn(WhatsNext.Panel, 'findOrCreate').andCallThrough();
      WhatsNext.route('/todos');
      expect(WhatsNext.Panel.findOrCreate).toHaveBeenCalledWith('/todos/index');
    });
    
    it('renders the panel', function() {
      thePanel = new WhatsNext.Panel();
      spyOn(WhatsNext.Panel, 'findOrCreate').andReturn(thePanel);
      spyOn(thePanel, 'render');
      
      WhatsNext.route('/todos');
      expect(thePanel.render).toHaveBeenCalled();
    });
    
  });
  
  describe('/todos/index_filter', function() {
    
    it('creates a panel', function() {
      spyOn(WhatsNext.Panel, 'findOrCreate').andCallThrough();
      WhatsNext.route('/todos/index_filter');
      expect(WhatsNext.Panel.findOrCreate).toHaveBeenCalledWith('/todos/index_filter', { bodyClass: 'slide_up' });
    });
    
    it('renders the panel', function() {
      thePanel = new WhatsNext.Panel();
      spyOn(WhatsNext.Panel, 'findOrCreate').andReturn(thePanel);
      spyOn(thePanel, 'render');
      
      WhatsNext.route('/todos/index_filter');
      expect(thePanel.render).toHaveBeenCalled();
    });
    
  });
  
  describe('/todos/new', function() {
    
    it('creates a panel', function() {
      spyOn(WhatsNext.Panel, 'findOrCreate').andCallThrough();
      WhatsNext.route('/todos/new');
      expect(WhatsNext.Panel.findOrCreate).toHaveBeenCalledWith('/todos/new', { bodyClass: 'slide_up' });
    });
    
    it('renders the panel', function() {
      thePanel = new WhatsNext.Panel();
      spyOn(WhatsNext.Panel, 'findOrCreate').andReturn(thePanel);
      spyOn(thePanel, 'render');
      
      WhatsNext.route('/todos/new');
      expect(thePanel.render).toHaveBeenCalled();
    });
    
  });
  
});