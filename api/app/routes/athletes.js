/*jslint unparam: true*/

'use strict';

var models = require("../models");

module.exports = function (app) {
  app.get("/athletes", function (req, res) {
    models.Athlete.findAll()
      .complete(function (err, athletes) {
        if (err) {
          return res.send(500, 'Internal Server Error');
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
    var athlete = models.Athlete.create(req.body);
    athlete
      .error(function (err) {
        return res.json(409, 'Conflict');
      })
      .success(function (athlete) {
        res.json(201, athlete);
      });
  });

  app.delete("/athletes/:id", function (req, res) {
    models.Athlete.find(req.params.id)
      .complete(function (err, athlete) {
        if (athlete === null) {
          return res.json(404, 'Not Found');
        }
        athlete
          .destroy()
          .complete(function (err) {
            if (err) {
              return res.json(500, 'Internal Server Error');
            }
            res.json(204, 'No Content');
          });
      });
  });
};