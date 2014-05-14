require('../../../support/_specHelper.js');

var Athlete = require('../../../../app/models/athlete.js')(orm, Sequelize);
var app = require('../../../../app').start();

describe('Athletes Routes', function () {
  'use strict';

  var id, athlete;

  athlete = {
    name: 'Test Name',
    email: 'test@domain.com'
  };

  before(function (done) {
    Athlete
      .create(athlete)
      .success(function (athlete) {
        id = athlete.dataValues.id;

        done();
      });
  });

  describe('GET /athletes', function () {
    describe('when requesting resource /athletes', function () {
      it('should return an array of athletes', function (done) {
        supertest(app)
          .get('/athletes')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {
            if (err) {
              return done(err);
            }
            var result = JSON.parse(res.text);
            result.should.contain.an.item.with.property('id', id);
            done();
          });
      });
    });
  });

  describe('GET /athletes/:id', function () {
    describe('when requesting resource /athletes/:id with a valid id', function () {
      it('should return the athlete', function (done) {
        request(app)
          .get('/athletes/' + id)
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {
            if (err) {
              return done(err);
            }
            var result = JSON.parse(res.text);
            assert.equal(result.id, id);
            assert.equal(athlete.name, result.name);
            assert.equal(athlete.email, result.email);
            done();
          });
      });
    });

    describe('when requesting resource /athletes/:id with an inexistent id', function () {
      it('should return 404', function (done) {
        request(app)
          .get('/athletes/12345678')
          .expect('Content-Type', /json/)
          .expect(404, done);
      });
    });
  });

  describe('POST /athletes', function () {
    describe('when creating a new resource /athletes', function () {
      it('should respond with 201', function (done) {
        var newAthlete = {
          name: 'New Athlete',
          email: 'newathlete@email.com'
        };
        request(app)
          .post('/athletes')
          .send(newAthlete)
          .expect('Content-Type', /json/)
          .expect(201)
          .end(function (err, res) {
            if (err) {
              return done(err);
            }
            var result = JSON.parse(res.text);
            assert.equal(newAthlete.name, result.name);
            assert.equal(newAthlete.email, result.email);
            done();
          });
      });
    });

    describe('when creating an invalid athlete', function () {
      it('should respond with 409', function (done) {
        var invalidAthlete = {
          name: 'Athlete Name',
          email: 'invalid'
        };
        request(app)
          .post('/athletes')
          .send(invalidAthlete)
          .expect('Content-Type', /json/)
          .expect(409, done);
      });
    });
  });

});