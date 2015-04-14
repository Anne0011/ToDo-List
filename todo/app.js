var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var todo = require('./routes/todo');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/todo', todo);
app.use('/create',todo);

// Get todo page
app.get('/', function(req, res, next){
  return Todo.find( function (err, tasks) {
    if(!err){
      res.render ('todo',{
        greeting: "New Todo List",
        tasks: tasks, 
        postData: JSON.stringify(req.body)
      });
      console.log(tasks);
    } else {
      return console.error(err);
    }
  });
});


// Post Form
app.post('/', function(req, res){
  new Todo({
    todo_due_date: req.body.todoDate,
    todo_priority: req.body.todoPriority,
    todo_title: req.body.todoTitle,
    todo_description: req.body.todoDescription,
    todo_complete: req.body.todoComplete,
    //complete: false
  }).save(function (err, task) {
  if (err) {
    res.render('error',{
      status: 300,
      stack: JSON.stringify(err.errors)
    }, 
    message: "You Failed!"  
    });
  } else {
    es.render('error',{
      title: "Todo Created",
      message: "Success!",
  }
  console.log(tasks);
  
  });
  
  res.redirect('todo');
  console.log("HERE THE DESCRIPTION ======+++++" + req.todoDescription);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});






module.exports = app;
