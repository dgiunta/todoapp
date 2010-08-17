describe('WillDo.Panel', function() {
  
  beforeEach( function() {
    originalPanels = WillDo.Panel._panels;
    WillDo.Panel._panels = [];
    
    originalTemplates = WillDo.Templates;
    WillDo.Templates = {
      '/path.html':  '<section class="panel">Hello world!</section>',
      '/path2.html': '<section class="panel">Hello other world!</section>'
    };

    originalViews = WillDo.Views;
    WillDo.Views = $H({
      '/path':  new Class(),
      '/path2': new Class()
    });  
    
    panel  = new WillDo.Panel('/path',  { bodyClass: 'the_body_class' });
    panel2 = new WillDo.Panel('/path2', { bodyClass: 'the_other_body_class' });
    
    WillDo.Panel._firstPanelWasRendered = false;
  });
  
  afterEach( function() {
    WillDo.Panel._panels = originalPanels;
    WillDo.Templates     = originalTemplates;
    WillDo.Views         = originalViews;
  });
  
  it('is initialized with a path which dictates where to find the views and templates', function() {
    var panel = new WillDo.Panel('/path/to/views/and/templates');
    expect(panel.path).toEqual('/path/to/views/and/templates');
  });
  
  it('does NOT let you initialize with an already used path', function() {
    expect( function() {
      new WillDo.Panel('/path'); 
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
        WillDo.Templates['/path.html'], 
        new WillDo.Views['/path']() 
      );
    });

    it('throws an error if the associated view class is NOT present', function() {
      WillDo.Views = {};
      expect( function() {
        panel.renderTemplate();
      }).toThrow('Error: could not find the view at "/path"');
    });

    it('throws an error if the associated template is NOT present', function() {
      WillDo.Templates = {};
      expect( function() {
        panel.renderTemplate();
      }).toThrow('Error: could not find the template at "/path.html"');
    });
  
  });
  
  describe('.render()', function() {
    
    it('returns the object for easy chaining', function() {
      expect( panel.render() ).toBe(panel);
    });
  
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

      it('denotes the current panel with a class', function() {
        runs( function() {
          panel.render();
        });
        waits(100);
        runs( function() {
          expect(panel.element.className).toContain('current');
        });
        
        runs( function() {
          panel2.render();
        });
        waits(100);
        runs( function() {
          expect(panel.element.className).not.toContain('current');
          expect(panel2.element.className).toContain('current');
        });
      });

      it('adds a class to the body when specified', function() {
        runs( function() {
          expect(document.body.className).not.toContain('the_body_class');
          expect(document.body.className).not.toContain('first_render');

          panel.render();
        });
        waits(100);
        runs( function() {
          expect(document.body.className).toContain('the_body_class');
          expect(document.body.className).toContain('first_render');

          panel2.render();
        });
        waits(100);
        runs( function() {
          expect(document.body.className).not.toContain('the_body_class');
          expect(document.body.className).not.toContain('first_render');
          expect(document.body.className).toContain('the_other_body_class');
        });
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
  
  describe('.unrender()', function() {
    
    it('returns the object for easy chaining', function() {
      expect( panel.unrender() ).toBe(panel);
    });
  
    it('removes the panel’s element from the DOM', function() {
      runs( function() {
        panel.render();
        theElement = panel.element;
      });
      waits(100);
      runs( function() {
        panel.unrender();
        expect(panel.element).toBeNull();
        expect( theElement.getParent() ).toBeNull();        
      });
    });
    
  });
  
  describe('self.find()', function() {
    
    it('returns an initialized panel based on the specified path', function() {
      expect( WillDo.Panel.find('/path')  ).toBe(panel);
      expect( WillDo.Panel.find('/path2') ).toBe(panel2);
    });
    
    it('returns null if a panel with the specified path does NOT exist', function() {
      expect( WillDo.Panel.find('/non-existant/path') ).toBeNull();
    });
    
  });
  
  describe('self.findOrCreate()', function() {
    
    beforeEach( function() {
      WillDo.Templates['/path3.html'] = '<section class="panel">Hello other world!</section>';
      WillDo.Views['/path3'] = new Class();
    });
    
    it('returns an already-initialized panel based on the specified path', function() {
      expect( WillDo.Panel.findOrCreate('/path')  ).toBe(panel);
    });
    
    it('initializes and returns a not-yet-initialized panel based on the specified path', function() {
      var panel3 = WillDo.Panel.findOrCreate('/path3');
      expect(panel3).toBeAnInstanceOf(WillDo.Panel);
      expect(panel3.path).toEqual('/path3');
    });
    
  });
  
});