var path = require('path');
var appDir = path.join(__dirname, '..', '..', 'app');

require('blanket')({
  pattern: appDir
});
