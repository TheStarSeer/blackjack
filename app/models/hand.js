var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userScema = require('./user.js');

var Hand = new Schema({
  playerCardKeys: {
    type: Array,
    required: true
  },
  computerCardKeys: {
    type: Array,
    required: true
  },
  playerHandValue: {
    type: Number,
    required: true
  },
  computerHandValue: {
    type: Number,
    required: true
  },
  handType: {
    type: String,
    enum: ['standard', 'double-down', 'split'],
    required: true
  },
  betAmount: {
    type: Number,
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  result: {
    type: String,
    enum: ['won', 'lost', 'push'],
    required: true
  },
  user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
  }
});

module.exports = mongoose.model('Hand', Hand);
