'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
  name: String,
  info: String,
  creator: { type : Schema.ObjectId, ref: 'User' },
  location: String,
  startsAt: Date,
  endsAt: Date,
  subscribers: [{ type : Schema.ObjectId, ref: 'User' }],
  status: {type: String, enum: ['Created', 'Valeri'], default: 'Created' },
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', EventSchema);