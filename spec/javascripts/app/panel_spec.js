describe('WhatsNext.Panel', function() {
  
  beforeEach( function() {
    originalPanels = WhatsNext._panels;
    WhatsNext._panels = [];
    
    originalTemplates = WhatsNext.Templates;
    WhatsNext.Templates = {
      '/path.html': '<section>Hello world!</section>'
    };

    originalViews = WhatsNext.Views;
    WhatsNext.Views = $H({
      '/path': new Class()
    });  
    
    panel = new WhatsNext.Panel('/path');    
  });
  
  afterEach( function() {
    WhatsNext._panels   = originalPanels;
    WhatsNext.Templates = originalTemplates;
    WhatsNext.Views     = originalViews;
  });
  
  it('is initialized with a path which dictates where to find the views and templates', function() {
    var panel = new WhatsNext.Panel('/path/to/views/and/templates');
    expect(panel.path).toEqual('/path/to/views/and/templates');
  });
  
  it('does NOT let you initialize with an already used path', function() {
    expect( function() {
      new WhatsNext.Panel('/path'); 
    }).toThrow('Error: already initialized panel with path "/path"');
  });
  
  it('keeps track of a containing element', function() {
    expect( panel.element ).toBe(null);
  });
  
  describe('.renderTemplate()', function() {
  
    it('renders the template with Mustache', function() {
      spyOn(Mustache, 'to_html');
      panel.renderTemplate();
  
      expect(Mustache.to_html).toHaveBeenCalledWith( 
        WhatsNext.Templates['/path.html'], 
        new WhatsNext.Views['/path']() 
      );
    });

    it('throws an error if the associated view class is NOT present', function() {
      WhatsNext.Views = {};
      expect( function() {
        panel.renderTemplate();
      }).toThrow('Error: could not find the view at "/path"');
    });

    it('throws an error if the associated template is NOT present', function() {
      WhatsNext.Templates = {};
      expect( function() {
        panel.renderTemplate();
      }).toThrow('Error: could not find the template at "/path.html"');
    });
  
  });
  
  describe('.render()', function() {
  
    describe('when the containing element does NOT yet exist', function() {
  
      it('creates the containing element using the rendered template', function() {
        spyOn(panel, 'renderTemplate').andReturn('<section>Where you at dawg?</section>');
        panel.render();
        
        expect( panel.renderTemplate ).toHaveBeenCalled();
        expect( panel.element.get('text') ).toEqual('Where you at dawg?');
      });
  
      it('injects the containing element into the document body', function() {
        panel.render();
        expect( panel.element.getParent() ).toBe(document.body);
      });

    });
  
    describe('when the containing element exists', function() {
    
      beforeEach( function() {
        panel.element = new Element('div');
      });
      
      it('does NOT render the template', function() {
        spyOn(panel, 'renderTemplate');
        panel.render();
        expect( panel.renderTemplate ).not.toHaveBeenCalled();
      });
    
      it('does NOT modify the containing element', function() {
        var originalElement = panel.element;
        panel.render();
        expect( panel.element ).toBe(originalElement);
      });
    
    });
  
  });
      
});