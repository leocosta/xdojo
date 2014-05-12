/*jslint unparam: true*/

'use strict';

var models = require("../app/models");

module.exports = function (app) {
  app.get("/athletes", function (req, res) {
    models.Athlete.findAll()
      .complete(function (err, athletes) {
        if (err) {
          throw err;
        }
        res.json(athletes);
      });
  });

  app.post("/athletes", function (req, res) {
    var athlete = models.Athlete.build(req.body);

    console.log(athlete);

    athlete.save(["title", "delayedUntil"])
      .complete(function (err, athlete) {
        if (err) {
          throw err;
        }
        res.json(athlete);
      });
  });

  app.delete("/athletes/:id", function (req, res) {
    models.Athlete.find(req.params.id)
      .complete(function (err, athlete) {
        if (err) {
          throw err;
        }
        athlete.destroy().complete(function (err) {
          if (err) {
            throw err;
          }
          res.json(athlete);
        });
      });
  });
};