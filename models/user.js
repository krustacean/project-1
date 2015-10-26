var mongoose = require('mongoose');
var Todo = require('./todo')

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {
    type: String,
    unique: true
  }
  passwordDigest: String,
  todos: [Todo.schema]
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
