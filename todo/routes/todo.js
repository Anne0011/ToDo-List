var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


module.exports = router;
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('yay!');

});

var todoSchema = mongoose.Schema({
    todo_due_date: Date,
    todo_timestamp: {type: Date, default: Date.now},
    todo_description: {type: String, required: true},
    todo_title: {type: String, required: true},
    todo_priority: {type: Number, required: true},
    todo_completion: {type: Boolean, default:false}

});
var Todo = mongoose.model('Todo', todoSchema);


// Get todo page
router.get('/', function(req, res, next){
	return Todo.find( function (err, tasks) {
		if(!err){
			res.render ('todo',{
				greeting: "New Todo List",
				tasks: tasks, 
				// postData: JSON.stringify(req.body)
			});
			console.log(tasks);
		} else {
			return console.error(err);
		}
	});
});


// Post Form
router.post('/', function(req, res){
	new Todo({
		todo_due_date: req.body.todoDate,
		todo_priority: req.body.todoPriority,
		todo_title: req.body.todoTitle,
		todo_description: req.body.todoDescription,
		todo_complete: req.body.todoComplete,
		//complete: false
	}).save(function (err, task) {
  if (err) {
    return console.error(err);
	}
	console.log(tasks);
	
	});
	
	res.redirect('todo');
	console.log("HERE THE DESCRIPTION ======+++++" + req.todoDescription);
});

module.exports = router;
