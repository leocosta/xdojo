'use strict';

var app = require('../app');
var User = require('../api/user/user.model');
var request = require('supertest');
var q = require('q');

function Authed() {
  var agent = request.agent(app);
  var token;

  var guest = {
    name: 'Guest',
    email: 'guest@guest.com',
    password: 'password',
    role: 'guest'
  };

  var user = {
    name: 'User',
    email: 'user@user.com',
    password: 'password',
    role: 'user'
  };

  var admin = {
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'password',
    role: 'admin'
  };  

  function createGuest(done) {
    User.remove(function() {
      var user = new User(guest);

      user.save(function(err) {
        if (err) return done(err);
        done();
      });
    });
  }

  function createUser(done) {
    User.remove(function() {
      var user = new User(guest);

      user.save(function(err) {
        if (err) return done(err);
        done();
      });
    });
  }

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
    authorize: function(options) {
      options = options || {};
      
      before(function(done) {
        var methods = {
          guest: createGuest,
          user: createUser,
          admin: createAdmin
        };

        var method = methods[options.role || 'admin'];
        method(done);
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