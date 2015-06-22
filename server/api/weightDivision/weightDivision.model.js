'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WeightDivisionSchema = new Schema({
  name: String,
  resourceKey: String
});

module.exports = mongoose.model('WeightDivision', WeightDivisionSchema);