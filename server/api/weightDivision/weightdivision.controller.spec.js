'use strict';

var app = require('../../app');
var request = require('supertest');
var authed = require('../../test/authed-agent');
var WeightDivision = require('./weightDivision.model');

describe('API: /api/weightDivisions', function() {

  var newWeightDivision = {
    name: 'foo_name',
    resourceKey: 'foo_key'
  };

  authed.authorize();

  // Clear weight divisions after testing
  after(function() {
    return WeightDivision.remove().exec();
  });

  it('GET: should respond with JSON array', function(done) {
    authed
      .get('/api/weightDivisions')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('POST: should respond with a created weight division', function(done) {
    authed
      .post('/api/weightDivisions')
      .send(newWeightDivision)
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        
        res.body._id.should.not.equal(undefined);
        res.body.name.should.equal('foo_name');
        res.body.resourceKey.should.equal('foo_key');
        done();
      });
  });

  it('POST: should respond with a updated weight division', function(done) {
    
    WeightDivision.create(newWeightDivision, function(err, weightDivision) {
      if (err) return done(err);
      
      weightDivision.name = 'bar_name';
      weightDivision.resourceKey = 'bar_key';

      authed
        .put('/api/weightDivisions/' + weightDivision._id)
        .send(weightDivision)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);

          res.body._id.should.equal(weightDivision._id.toString());
          res.body.name.should.equal('bar_name');
          res.body.resourceKey.should.equal('bar_key');
          done();
        });
    });

  });

})
