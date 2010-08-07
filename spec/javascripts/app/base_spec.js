describe('WhatsNext base functionality', function() {
  
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
      originalRoutes = WhatsNext.Routes;
      WhatsNext.Routes = new Hash({
        '^/$': $empty,
        '^/posts$': $empty,
        '^/posts/(\\d+)/(\\w+)$': $empty
      });
    });
    
    afterEach( function() {
      WhatsNext.Routes = originalRoutes;
    });
    
    it('finds the route whose regex matches the desired path and calls it', function() {
      var route = '^/$';
      spyOn(WhatsNext.Routes, route);
      
      WhatsNext.route('/');
      expect( WhatsNext.Routes[route] ).toHaveBeenCalled();
    });
    
    it('finds another route whose regex matches the desired path and calls it', function() {
      var route = '^/posts$';
      spyOn(WhatsNext.Routes, route);
      
      WhatsNext.route('/posts');
      expect( WhatsNext.Routes[route] ).toHaveBeenCalled();
    });
    
    it('passes any matched groups in the regex to the called function', function() {
      var route = '^/posts/(\\d+)/(\\w+)$';
      spyOn(WhatsNext.Routes, route);
      
      WhatsNext.route('/posts/45/edit');
      expect( WhatsNext.Routes[route] ).toHaveBeenCalledWith('45', 'edit');
    });
    
    it('redirects to "/" if no routes match the desired path', function() {
      spyOn(WhatsNext, 'redirect');

      WhatsNext.route('abcdefg123');
      expect(WhatsNext.redirect).toHaveBeenCalledWith('/');
    });
    
    it('does NOT redirect to "/" if the current hash is "/" and no route is found', function() {
      WhatsNext.Routes = new Hash({});
      spyOn(WhatsNext, 'redirect');
      
      WhatsNext.route('/');
      expect(WhatsNext.redirect).not.toHaveBeenCalled();
    });
    
    it('routes based on the browser’s current location hash', function() {
      window.location.hash = '#/the/path';
      spyOn(WhatsNext, 'route');
      
      WhatsNext.routeFromLocationHash();
      expect(WhatsNext.route).toHaveBeenCalledWith('/the/path');
    });
    
  });
  
});

