_.logging = true;
_.log = function(message) {
  if (_.logging) console.log(message);
};

_.redirect = function(path) {
  _.log('REDIRECT "' + path + '"');
  window.location.hash = '#' + path;
};

_.callRouteFromHash = function() {
  var path   = window.location.hash.substr(1);
  var routes = _.routes.getKeys();

  for (var i = 0; i < routes.length; i++) {
    var match = path.match( routes[i] );
    if (match) {
      _.log('ROUTE "' + path + '"  -->  "' + routes[i] + '"');
      _.routes[ routes[i] ].apply( null, match.splice(1) );
      return;
    }
  };

  _.redirect('/');
};
