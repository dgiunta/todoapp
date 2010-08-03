describe('WhatsNext.Model', function() {
  
  beforeEach( function() {
    FakeModel = new Class({
      Implements: [ WhatsNext.Model ],
      _attributes: {
        name: 'Jim',
        height: 6.1
      }
    });

    fake = new FakeModel();
  });
  
  it('exists', function() {
    expect(WhatsNext.Model).toBeDefined();
  });
  
  describe('Getters / Setters', function() {
    
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
  
});