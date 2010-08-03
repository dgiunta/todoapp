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
    }).toThrow('PanelError: already initialized panel with path "/path"');
  });
  
});