'use strict';

var app = require('../../app');
var request = require('supertest');
var authed = require('../../test/authed-agent');

describe('API: /api/events', function() {
  authed.authorize();

  it('GET: should respond with JSON array', function(done) {
    authed
      .get('/api/events')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

})