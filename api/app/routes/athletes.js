/*jslint unparam: true*/

'use strict';

var models = require("../models");

module.exports = function (app) {
  app.get("/athletes", function (req, res) {
    models.Athlete.findAll()
      .complete(function (err, athletes) {
        if (err) {
          return res.send(404, 'Not Found');
        }
        res.json(athletes);
      });
  });

  app.get("/athletes/:id", function (req, res) {
    models.Athlete.find(req.params.id)
      .complete(function (err, athlete) {
        if (err) {
          return res.json(500, err);
        }
        if (athlete === null) {
          return res.json(404, 'Not Found');
        }
        return res.json(200, athlete);
      });
  });

  app.post("/athletes", function (req, res) {
    var athlete = models.Athlete.build(req.body);
    athlete.save(["name", "email"])
      .complete(function (err, athlete) {
        if (err) {
          return res.send('400', 'Post syntax incorrect');
        }
        res.json(athlete);
      });
  });

  app.delete("/athletes/:id", function (req, res) {
    models.Athlete.find(req.params.id)
      .complete(function (err, athlete) {
        if (err) {
          return res.send(404, 'Not Found');
        }
        athlete.destroy().complete(function (err) {
          if (err) {
            return res.send(500, 'Internal Error');
          }
          res.json(athlete);
        });
      });
  });
};