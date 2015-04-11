var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 

  	title: 'Todo Application', 
    header: 'Simple Todo List', 
    body_text: 'The Best To Do App Ever!'
	} 
   );

});

module.exports = router;
