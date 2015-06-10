'use strict';

var app = require('../../app');
var request = require('supertest');
var authed = require('../../test/authed-agent');

describe('API: /api/users', function() {
  authed.authorize();

  it('GET: should respond with JSON array', function(done) {
    authed
      .get('/api/users')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('POST: should respond with token', function(done) {
    authed
      .post('/api/users')
      .send({
        email: 'newUser@example.com',
        password: 'password'
      })
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.have.property('token');
        (res.body.hashedPassword === undefined).should.be.true;
        (res.body.salt === undefined).should.be.true;
        done();
      });
  });

  it('GET: should respond with a user profile when authenticated', function(done) {
    authed
      .get('/api/users/me')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        res.body._id.should.not.equal(undefined);
        res.body.name.should.equal('Admin');
        res.body.email.should.equal('admin@admin.com');
        res.body.role.should.equal('admin');
        done();
      });
  });

  it('GET: should respond with a 401 when not authenticated', function(done) {
    request(app)
      .get('/api/users/me')
      .expect(401)
      .end(done);
  });
})