var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// organize the app a little better
// check your indentation, should be 2 spaces between logical blocks (both horizontial and verticle)
// organize the 'requires'
// organize the routes
// move the model into a models folder


// todo this isn't right! there are too many route files. put everything in
// `routes/index.js`. There should be a controller for seeing all tasks, adding a
// new task, deleting a task, and changing a task.
var routes = require('./routes/index');
var users = require('./routes/users'); // what is this even for?
var Todo = require('./models/todo'); // This a model, move it somewhere else it almost can be confused for a route
var app = express(); // this is where you're creating you express app

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes); // this is where you're registering routes. See how this is only
// registering `routes` defined above? That means even though you've imported `users` it isn't doing anything


/// these routes are overriding the routes above, need some clarity here.
/// Get todo page
app.get('/', function(req, res, next) {
    return Todo.find(function(err, tasks) {
        if (!err) {
            res.render('todo', {
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
// handle a delete request from client
app.delete('/todo', function(req, res) {
    console.log(req.body)
    Todo.find({
            id: req.body.todo_id
        })
        .remove(function(err) {
            //was there and error when removing?
            if (err) {
                console.log("err");

                //delete was sucessful
            } else {
                res.send('SUCCESS');
            }
        });
});
// Post Form
app.post('/todo', function(req, res) {
    console.log(req.body);

    new Todo({
        todo_due_date: req.body.todoDate,
        todo_priority: req.body.todoPriority,

        todo_title: req.body.todoTitle,
        todo_description: req.body.todoDescription,
        todo_complete: req.body.todoComplete,

        //complete: false

    }).save(function(err, task) {
            if (err) {
                res.render('error', {
                    error:{
                        status: 300,
                        stack: JSON.stringify(err.errors)
                    },
                    message: "You Failed!"
                });


            } else {
                res.render('tasklist', {
                        title: "Todo Created",
                        message: "Success!",
                    }
                    //console.log(tasks);

                );

                // catch 404 and forward to error handler
                app.use(function(req, res, next) {
                    var err = new Error('Not Found');
                    err.status = 404;
                    next(err);
                });

            };

    });
});


// error handlers
// development error handler !==
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
