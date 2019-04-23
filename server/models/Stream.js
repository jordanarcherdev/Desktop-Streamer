const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const StreamSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Stream = mongoose.model('stream', StreamSchema);
