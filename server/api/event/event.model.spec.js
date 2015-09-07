'use strict';

var should = require('should');
var app = require('../../app');
var User = require('../user/user.model');
var Event = require('./event.model');

var creator = new User({
  name: 'Creator',
  email: 'creator@email.com',
  paswsord: '123456'
});

var event = new Event({
  name: 'Event name',
  creator: creator,
  info: 'Some info',
  location: 'Location',
  startsAt: '2015-09-06T00:00:00.000Z',
  endsAt: '2015-09-06T00:00:00.000Z'
});

describe('Event Model', function() {
  before(function(done) {
    // Clear users before testing
    Event.remove().exec().then(function() {
      done();
    });
  });

  afterEach(function(done) {
    Event.remove().exec().then(function() {
      done();
    });
  });

  it('should begin with no users', function(done) {
    Event.find({}, function(err, events) {
      events.should.have.length(0);
      done();
    });
  });

  it('should fail when saving a duplicate event', function(done) {
    event.save(function() {
      var eventDup = new User(event);
      eventDup.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  it('should fail when saving a second event with a non-payer user', function(done) {
    var oneEvent = new Event(event);
    oneEvent.save(function() {
      var otherEvent = new Event({
        name: 'Other event',
        creator: creator,
        info: 'Some info'
      });

      otherEvent.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  it('should fail when saving without a name', function(done) {
    event.name = '';
    event.save(function(err) {
      should.exist(err);
      done();
    });
  });
});
