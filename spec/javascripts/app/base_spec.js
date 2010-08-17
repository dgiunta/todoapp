describe('WillDo base functionality', function() {
  
  describe('logging', function() {
    
    it('has logging on by default', function() {
      expect(WillDo.logging).toBe(true);
    });
    
    it('logs to the console', function() {
      spyOn(console, 'log');
      WillDo.log('Hello!');
      expect(console.log).toHaveBeenCalledWith('Hello!');
    });
    
    it('does NOT log when logging has been disabled', function() {
      var original = WillDo.logging;
      WillDo.logging = false;
      
      spyOn(console, 'log');
      WillDo.log('Hello!');
      expect(console.log).not.toHaveBeenCalled();
      
      WillDo.logging = original;
    });

  });
  
  describe('redirecting requests', function() {
    
    it('modifies the browser’s hash', function() {
      window.location.hash = '#/';
      WillDo.redirect('/path/to/something');
      expect(window.location.hash).toEqual('#/path/to/something');
    });
    
  });
  
  describe('routing requests', function() {
    
    beforeEach( function() {
      originalRoutes = WillDo.Routes;
      WillDo.Routes = new Hash({
        '^/$': $empty,
        '^/posts$': $empty,
        '^/posts/(\\d+)/(\\w+)$': $empty
      });
    });
    
    afterEach( function() {
      WillDo.Routes = originalRoutes;
    });
    
    it('finds the route whose regex matches the desired path and calls it', function() {
      var route = '^/$';
      spyOn(WillDo.Routes, route);
      
      WillDo.route('/');
      expect( WillDo.Routes[route] ).toHaveBeenCalled();
    });
    
    it('finds another route whose regex matches the desired path and calls it', function() {
      var route = '^/posts$';
      spyOn(WillDo.Routes, route);
      
      WillDo.route('/posts');
      expect( WillDo.Routes[route] ).toHaveBeenCalled();
    });
    
    it('passes any matched groups in the regex to the called function', function() {
      var route = '^/posts/(\\d+)/(\\w+)$';
      spyOn(WillDo.Routes, route);
      
      WillDo.route('/posts/45/edit');
      expect( WillDo.Routes[route] ).toHaveBeenCalledWith('45', 'edit');
    });
    
    it('redirects to "/" if no routes match the desired path', function() {
      spyOn(WillDo, 'redirect');

      WillDo.route('abcdefg123');
      expect(WillDo.redirect).toHaveBeenCalledWith('/');
    });
    
    it('does NOT redirect to "/" if the current hash is "/" and no route is found', function() {
      WillDo.Routes = new Hash({});
      spyOn(WillDo, 'redirect');
      
      WillDo.route('/');
      expect(WillDo.redirect).not.toHaveBeenCalled();
    });
    
    it('routes based on the browser’s current location hash', function() {
      window.location.hash = '#/the/path';
      spyOn(WillDo, 'route');
      
      WillDo.routeFromLocationHash();
      expect(WillDo.route).toHaveBeenCalledWith('/the/path');
    });
    
  });
  
});

