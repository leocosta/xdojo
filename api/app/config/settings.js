'use strict';

var path = require('path');

var settings = {
  path       : path.normalize(path.join(__dirname, '..')),
  port       : process.env.NODE_PORT || 3000,
  database   : {
    development: {
      database: "xdojoapp",
      username: "root",
      password: null,
      options: {
        host: "localhost",
        dialect: "mysql"
      }
    },
    test: {
      database: "xdojoapp_test",
      username: "root",
      password: null,
      options: {
        host: "localhost",
        dialect: "mysql",
        logging: false
      }
    },
    production: {
      use_env_variable: "DATABASE_URL"
    }
  }
};

module.exports = settings;