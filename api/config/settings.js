var path       = require('path');

var settings = {
  path       : path.normalize(path.join(__dirname, '..')),
  port       : process.env.NODE_PORT || 3000,
  database   : {
    protocol : "mysql", // or "postgresql"
    query    : { pool: true },
    host     : "localhost",
    database : "xdojoapp",
    user     : "root",
    password : ""
  }
};

module.exports = settings;