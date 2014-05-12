require('../../../support/_specHelper.js');

var Athlete = require('../../../../app/models/athlete.js')(orm, Sequelize);

describe('Athlete', function () {

  'use strict';
  before(function (done) {
    Athlete.sync({ force : true }) // drops table and re-creates it
      .success(function () {
        done(null);
      })
      .error(function (error) {
        done(error);
      });
  });

  describe('#create', function () {
    it('should create a athlete', function (done) {
      Athlete
        .create({name: 'test', email: 'email@domain.com'})
        .success(function (athlete) {
          athlete.should.not.to.be.a('null');
          done();
        });
    });

    it('should not create a invalid athlete', function (done) {
      Athlete
        .create({name: 'test', email: 'invalid_email'})
        .error(function () {
          done();
        });
    });
  });
});