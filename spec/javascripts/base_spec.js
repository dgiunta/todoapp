describe('Base', function() {
  
  it('should have a common namespace', function() {
    expect(WhatsNext).not.toBe(null);
  });
  
  describe('logging', function() {
    
    it('has logging on by default', function() {
      expect(WhatsNext.logging).toBe(true);
    });
    
    it('logs to the console', function() {
      spyOn(console, 'log');
      WhatsNext.log('Hello!');
      expect(console.log).toHaveBeenCalledWith('Hello!');
    });
    
    it('does NOT log when logging has been disabled', function() {
      var original = WhatsNext.logging;
      WhatsNext.logging = false;
      
      spyOn(console, 'log');
      WhatsNext.log('Hello!');
      expect(console.log).not.toHaveBeenCalled();
      
      WhatsNext.logging = original;
    });

  });
  
  describe('redirecting requests', function() {
    
    it('modifies the browser’s hash', function() {
      window.location.hash = '#/';
      WhatsNext.redirect('/path/to/something');
      expect(window.location.hash).toEqual('#/path/to/something');
    });
    
  });
  
});

