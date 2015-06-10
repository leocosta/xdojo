'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://localhost:9000',
  SESSION_SECRET:   'xdojo-secret',

  FACEBOOK_ID:      '454222718075948',
  FACEBOOK_SECRET:  '786d05391d5e32287563f34ec66584f9',

  TWITTER_ID:       'app-id',
  TWITTER_SECRET:   'secret',

  GOOGLE_ID:        'app-id',
  GOOGLE_SECRET:    'secret',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
