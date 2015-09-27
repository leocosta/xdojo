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

  it('POST: should respond with a created event', function(done) {
    var newEvent = {
      name: 'Event name',
      info: 'Some info',
      location: 'Location',
      startsAt: '2015-09-06T00:00:00.000Z',
      endsAt: '2015-09-06T00:00:00.000Z'
    };

    authed
      .post('/api/events')
      .send(newEvent)
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.have.properties(newEvent);
        done();
      });
  });
})