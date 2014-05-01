'use strict';

var moment = require('moment');

module.exports = function (orm, db) {
  var Team = db.define('team', {
    name      : { type: 'text', required: true },
    createdAt : { type: 'date', required: true, time: true }
  },
    {
      hooks: {
        beforeValidation: function () {
          this.createdAt = new Date();
        }
      },
      validations: {
        name   : orm.enforce.ranges.length(1, 1024)
      },
      methods: {
        serialize: function () {
          return {
            name      : this.name,
            createdAt : moment(this.createdAt).fromNow()
          };
        }
      }
    });

  Team.hasMany('athletes', db.models.athlete);
};