(function(_) {

  window.addEvent('domready', function() {

    document.addEventListener('touchmove', function(e) { e.preventDefault(); });
  
    window.addEventListener('hashchange', _.routeFromLocationHash, false);
    _.routeFromLocationHash();
  
  });

})(WhatsNext);