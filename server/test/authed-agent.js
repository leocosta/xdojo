'use strict';

var app = require('../app');
var User = require('../api/user/user.model');
var request = require('supertest');
var q = require('q');

function Authed() {
  var agent = request.agent(app);
  var token;

  var admin = {
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'password',
    role: 'admin'
  };

  function createAdmin(done) {
    User.remove(function() {
      var user = new User(admin);

      user.save(function(err) {
        if (err) return done(err);
        done();
      });
    });
  }

  function getToken(done) {
    var deferred = q.defer();
    agent
      .post('/auth/local')
      .send(admin)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        token = res.body.token;
        deferred.resolve();
      });
    return deferred.promise;
  }

  return {
    authorize: function() {
      before(function(done) {
        createAdmin(done);
      });
      before(function(done) {
        getToken().then(function() {
          done();
        });
      })
    },
    token: function() {
      return token;
    },
    get: function(url) {
      return agent.get(url).set('authorization', 'Bearer ' + token);
    },
    post: function(url) {
      return agent.post(url).set('authorization', 'Bearer ' + token);
    },
    put: function(url) {
      return agent.put(url).set('authorization', 'Bearer ' + token);
    },
    delete: function(url) {
      return agent.delete(url).set('authorization', 'Bearer ' + token);
    }
  }
}

module.exports = new Authed();