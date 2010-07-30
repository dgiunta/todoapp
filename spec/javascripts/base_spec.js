describe('WhatsNext base functionality', function() {
  
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
  
  describe('routing requests', function() {
    
    beforeEach( function() {
      originalRoutes = WhatsNext.routes;
      WhatsNext.routes = new Hash({
        '^/$': $empty,
        '^/posts$': $empty,
        '^/posts/(\\d+)/(\\w+)$': $empty
      });
    });
    
    afterEach( function() {
      WhatsNext.routes = originalRoutes;
    });
    
    it('finds the appropriate regex route from the hash and calls it', function() {
      var route = '^/$';
      spyOn(WhatsNext.routes, route);
      window.location.hash = '#/';
      
      WhatsNext.callRouteFromHash();
      expect( WhatsNext.routes[route] ).toHaveBeenCalled();
    });
    
    it('finds the another regex route from the hash and calls it', function() {
      var route = '^/posts$';
      spyOn(WhatsNext.routes, route);
      window.location.hash = '#/posts';
      
      WhatsNext.callRouteFromHash();
      expect( WhatsNext.routes[route] ).toHaveBeenCalled();
    });
    
    it('passes any matched groups in the regex to the called function', function() {
      var route = '^/posts/(\\d+)/(\\w+)$';
      spyOn(WhatsNext.routes, route);
      window.location.hash = '#/posts/45/edit';
      
      WhatsNext.callRouteFromHash();
      expect( WhatsNext.routes[route] ).toHaveBeenCalledWith([ '45', 'edit' ]);
    });
    
  });
  
});

