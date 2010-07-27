(function(_) {

  window.addEvent('domready', function() {

    document.addEventListener('touchmove', function(e) { e.preventDefault(); });
  
    window.addEventListener('hashchange', _.callRouteFromHash, false);
    _.callRouteFromHash();
  
  });

})(WhatsNext);