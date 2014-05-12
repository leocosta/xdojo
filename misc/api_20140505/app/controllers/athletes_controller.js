'use strict';

var _       = require('lodash');
//var helpers = require('./_helpers');
var orm     = require('orm');

module.exports = {
  list: function (req, res, next) {
    req.models.athlete.find().limit(4).order('-id').all(function (err, athletes) {
      if (err) {
        return next(err);
      }

      var items = athletes.map(function (m) {
        return m.serialize();
      });

      res.send({ items: items });
    });
  },
  create: function (req, res, next) {
    var params = _.pick(req.body, 'name', 'body');

    req.models.athlete.create(params, function (err, athlete) {
      if (err) {
        if (Array.isArray(err)) {
          //helpers.formatErrors(err) 
          return res.send(200, { errors: "error"});
        }
        return next(err);
      }

      return res.send(200, athlete.serialize());
    });
  }
};