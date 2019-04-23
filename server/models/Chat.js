const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ChatSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Chat = mongoose.model('chats', ChatSchema);
