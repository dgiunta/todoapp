describe('WillDo.Model', function() {
  
  beforeEach( function() {
    localStorage.clear();
    
    FakeModel = new Class({
      Implements: [ WillDo.Model ],
      _attributes: {
        name: 'Jim',
        height: 6.1
      }
    });
    
    FakeModel.toString = function() {
      return 'FakeModel';
    };

    fake = new FakeModel();
  });
  
  describe('Getters / Setters', function() {
    
    it('has an "id" getter by default', function() {
      expect( fake.id() ).toBeNull();
    });
    
    it('creates a getter method based on keys specified in _attributes', function() {
      expect( fake.name() ).toEqual('Jim');
      expect( fake.height() ).toEqual(6.1);
    });
    
    it('creates a setter method for each key specified in _attributes', function() {
      fake.setName('Fred');
      expect(fake._attributes.name).toEqual('Fred');
      
      fake.setHeight(3.2);
      expect(fake._attributes.height).toEqual(3.2);
    });
    
    it('gets the modified value after setting it', function() {
      fake.setName('Bob');
      expect( fake.name() ).toEqual('Bob');
    });

    describe('when they already exist', function() {
      
      beforeEach( function() {
        methods = {
          name:    function() { return 'Custom Getter'; },
          setName: function() { return 'Custom Setter'; }
        };
        
        FakeModel.implement(methods);
        fake = new FakeModel();
      });

      it('does NOT create the getter', function() {
        expect( fake.name() ).toEqual('Custom Getter');
      });
    
      it('does NOT create the setter', function() {
        expect( fake.setName() ).toEqual('Custom Setter');
      });
    
    });

  });
  
  describe('when setting attributes during initialization', function() {
    
    it('replaces the default values with the values passed in an object literal', function() {
      var fake = new FakeModel({ name: 'Marcia', height: 5.5 });
      expect( fake._attributes.name ).toEqual('Marcia');
      expect( fake._attributes.height ).toEqual(5.5);
    });
    
    it('preserves default values for keys not passed in the object literal', function() {
      var fake = new FakeModel({ height: 4.8 });
      expect( fake._attributes.name ).toEqual('Jim');
      expect( fake._attributes.height ).toEqual(4.8);
    });
    
    it('throws an error when you pass keys that do not already exist in _attributes', function() {
      expect( function() {
        new FakeModel({ nonexistent: 'whatever' });
      }).toThrow('ArgumentError: nonexistent is not present in _attributes');
    });

  });
  
  describe('when coercing', function() {
    
    it('produces a key to be used specifically for storage', function() {
      spyOn(FakeModel, 'toString').andReturn('TheFakeModelName');
      spyOn(fake, 'id').andReturn('q1w2e3r4');
      
      expect( fake._storageKey() ).toBe('TheFakeModelName.find("q1w2e3r4")');
    });
    
    it('throws an error when there is no id for the storage key to use', function() {
      expect( function() {
        fake._storageKey();
      }).toThrow('Error: the storage key requires an id to already exist');
    });
    
    it('produces JSON from the attributes', function() {
      expect( fake.toJSON() ).toBe('{"id":null,"name":"Jim","height":6.1}');
    });
    
    xit('uses the JSON when coercing to a string', function() {
      spyOn(fake, 'toJSON').andReturn('{"key":"val"}');
      expect( fake.toString() ).toBe('{"key":"val"}');
    });
    
  });

  describe('when saving', function() {
    
    it('generates an id to use', function() {
      spyOn(window, 'SHA1').andReturn('q1w2e3r4');
      spyOn(fake, 'toJSON').andReturn('The-JSON-Data');
      
      var id = fake._generateId();
      
      expect(id).toBe('q1w2e3r4');
      expect(window.SHA1).toHaveBeenCalledWith("blob 13\0The-JSON-Data");
      expect(fake.toJSON).toHaveBeenCalled();
    });
    
    it('sets the "id" attribute when it doesn’t already exist', function() {
      expect( fake.id() ).toBe(null);
      
      spyOn(fake, '_generateId').andReturn('r4t5y6u7');
      spyOn(fake, 'setId').andCallThrough();
      
      fake.save();
      
      expect(fake._generateId).toHaveBeenCalled();
      expect(fake.setId).toHaveBeenCalledWith('r4t5y6u7');
    }); 

    it('does NOT set the "id" attribute when it already exists', function() {
      spyOn(fake, 'id').andReturn('e3r4t5y6');
      spyOn(fake, 'setId').andCallThrough();
      
      fake.save();
      
      expect(fake.setId).not.toHaveBeenCalled();
    });
    
    it('saves the current state of the object', function() {
      spyOn(localStorage, 'setItem');
      spyOn(fake, '_storageKey').andReturn('The-Storage-Key');
      spyOn(fake, 'toJSON').andReturn('The-JSON-Data');
      
      var result = fake.save();
      expect(result).toBe(true);
      
      expect(fake.toJSON).toHaveBeenCalled();
      expect(fake._storageKey).toHaveBeenCalled();
      expect(localStorage.setItem).toHaveBeenCalledWith('The-Storage-Key', 'The-JSON-Data');
    }); 

  });
  
});
