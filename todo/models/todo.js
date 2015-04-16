var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(callback) {
    console.log('yay!');

});

var todoSchema = mongoose.Schema({
    todo_due_date: Date,
    todo_timestamp: {
        type: Date,
        default: Date.now
    },
    todo_description: {
        type: String,
        required: true
    },
    todo_title: {
        type: String,
        required: true
    },
    todo_priority: {
        type: Number,
        required: true
    },
    todo_completion: {
        type: Boolean,
        default: false
    }

});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = router;
module.exports = Todo;
