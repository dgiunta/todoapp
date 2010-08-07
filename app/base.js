_.logging = true;
_.log = function(message) {
  if (_.logging) console.log(message);
};

_.redirect = function(path) {
  _.log('REDIRECT "' + path + '"');
  window.location.hash = '#' + path;
};

_.route = function(path) {
  var routes = _.Routes.getKeys();

  for (var i = 0; i < routes.length; i++) {
    var match = path.match( routes[i] );
    if (match) {
      _.log('ROUTE "' + path + '"  -->  "' + routes[i] + '"');
      _.Routes[ routes[i] ].apply( null, match.splice(1) );
      return;
    }
  };

  if (path != '/') _.redirect('/');
};

_.routeFromLocationHash = function() {
  return _.route( window.location.hash.substr(1) );
};