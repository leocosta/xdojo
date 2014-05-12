var chai = require('chai');
var sinon = require('sinon');

expect = chai.expect;

chai.should();
chai.use(require('chai-fuzzy'));

chai.config.includeStack = true;

chai.use(require("sinon-chai"));

// chai.use(require('chai-datetime'));
// chai.use(require("chai-as-promised"));
