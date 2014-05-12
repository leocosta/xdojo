var chai = require('chai');
var sinon = require('sinon');

supertest = require('supertest');
expect = chai.expect;
assert = chai.assert;

chai.should();
chai.use(require('chai-fuzzy'));
chai.use(require('chai-things'));

chai.config.includeStack = true;

chai.use(require("sinon-chai"));

// chai.use(require('chai-datetime'));
// chai.use(require("chai-as-promised"));
