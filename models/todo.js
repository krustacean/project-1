var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var TodoSchema = new Schema({
    content: String,
    timestamp : {
      type : Date,
      default: Date.now
    },
    updated: Date,
    count: {
      type: Number,
      default: 1
    },
    status: Number,
    dueDate: Date,
});

var Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
