describe('WhatsNext.Panel', function() {
  
  beforeEach( function() {
    originalPanels = WhatsNext._panels;
    WhatsNext._panels = [];
  });
  
  afterEach( function() {
    WhatsNext._panels = originalPanels;
  });
  
  it('is initialized with a path which dictates where to find the views and templates', function() {
    var panel = new WhatsNext.Panel('/path/to/views/and/templates');
    expect(panel.path).toEqual('/path/to/views/and/templates');
  });
  
  it('does NOT let you initialize with an already used path', function() {
    new WhatsNext.Panel('/path');
    
    expect( function() {
      new WhatsNext.Panel('/path'); 
    }).toThrow('Error: already initialized panel with path "/path"');
  });
  
  it('keeps track of a containing element', function() {
    var panel = new WhatsNext.Panel('/path');
    expect( panel.element ).toBe(null);
  });
  
  describe('rendering', function() {
    
    beforeEach( function() {
      originalTemplates = WhatsNext.Templates;
      WhatsNext.Templates = {
        '/path.html': 'Hello world!'
      };

      originalViews = WhatsNext.Views;
      WhatsNext.Views = $H({
        '/path': new Class()
      });      
    });
    
    afterEach( function() {
      WhatsNext.Views     = originalViews;
      WhatsNext.Templates = originalTemplates;
    });
    
    it('renders the template with Mustache', function() {
      spyOn(Mustache, 'to_html');
      
      var panel = new WhatsNext.Panel('/path');
      panel.renderTemplate();
      
      expect(Mustache.to_html).toHaveBeenCalledWith( 
        WhatsNext.Templates['/path.html'], 
        new WhatsNext.Views['/path']() 
      );
    });
    
  });
  
});