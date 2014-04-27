
/**
 * Module dependencies.
 */

var path        = require('path')
  , express     = require('express')
  , colors      = require('colors')
  , settings    = require('./config/settings')
  , environment = require('./config/environment')
  , routes      = require('./config/routes')
  , models      = require('./app/models/')
  , http        = require('http');


module.exports.start = function (done) {
  var app = express();

  environment(app);
  routes(app);

  http.createServer(app).listen(settings.port, function () {
    console.log( ("Listening on port " + settings.port).green );

    if (done) {
      return done(null, app, server);
    }
  }).on('error', function (e) {
    if (e.code == 'EADDRINUSE') {
      console.log('Address in use. Is the server already running?'.red);
    }
    if (done) {
      return done(e);
    }
  });

}

// If someone ran: "node server.js" then automatically start the server
if (path.basename(process.argv[1],'.js') == path.basename(__filename,'.js')) {
  module.exports.start()
}