var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var TodoSchema = new Schema({
    author_id: String,
    content: String,
    created: Date,
    updated: Date,
    count: Number,
    status: Number,
    dueDate: Date,


});

var Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
