'use strict';

var _ = require('lodash');
var WeightDivision = require('./weightDivision.model');

// Get list of weightDivisions
exports.index = function(req, res) {
  WeightDivision.find(function (err, weightDivisions) {
    if(err) { return handleError(res, err); }
    return res.json(200, weightDivisions);
  });
};

// Get a single weightDivision
exports.show = function(req, res) {
  WeightDivision.findById(req.params.id, function (err, weightDivision) {
    if(err) { return handleError(res, err); }
    if(!weightDivision) { return res.send(404); }
    return res.json(weightDivision);
  });
};

// Creates a new weightDivision in the DB.
exports.create = function(req, res) {
  WeightDivision.create(req.body, function(err, weightDivision) {
    if(err) { return handleError(res, err); }
    return res.json(201, weightDivision);
  });
};

// Updates an existing weightDivision in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  WeightDivision.findById(req.params.id, function (err, weightDivision) {
    if (err) { return handleError(res, err); }
    if(!weightDivision) { return res.send(404); }
    var updated = _.merge(weightDivision, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, weightDivision);
    });
  });
};

// Deletes a weightDivision from the DB.
exports.destroy = function(req, res) {
  WeightDivision.findById(req.params.id, function (err, weightDivision) {
    if(err) { return handleError(res, err); }
    if(!weightDivision) { return res.send(404); }
    weightDivision.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}