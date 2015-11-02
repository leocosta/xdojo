'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
  name: { type: String, required: true },
  info: String,
  creator: { type : Schema.ObjectId, ref: 'User' },
  location: Schema.Types.Mixed,
  startsAt: Date,
  endsAt: Date,
  subscribers: [{ type : Schema.ObjectId, ref: 'User' }],
  status: {type: String, enum: ['Created', 'Opened', 'CheckingReleased', 'BracketReleased', 'Finished'], default: 'Created' },
  createdAt: { type: Date, default: Date.now }
});

EventSchema.pre('save', function(next) {
  var self = this;
  this.constructor.findOne({creator: this.creator}, function(err, event) {
    if(err) throw err;
    if(event) {
      if(self.id !== event.id){
        next(new Error('You cannot create a new event'));
      }
    }
    next(err);
  });
});

module.exports = mongoose.model('Event', EventSchema);
