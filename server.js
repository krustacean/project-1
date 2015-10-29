var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var session = require('express-session');
var user = require('./models/user');
var favicon = require('express-favicon');
var todo = require('./models/todo');
var moment = require('moment');
require('dotenv').load();



///set app dependencies
app.set('view engine', 'ejs')
app.use("/static", express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(__dirname + '/public/favicon.ico'));


//setup sessions
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 48 * 60 * 60 * 1000 } //48hour ttl
}));


//start server
app.listen(process.env.PORT || 5000, function (){
  console.log("listening on port 5000");
});

//root route
app.get("/", function (req, res){
  if (req.session.userId === undefined) {
		res.render('index', {user: null});
	} else {
		res.redirect('/home');
	}
});

app.get('/about', function(req, res){
  res.render('about', {user: null})
})
//login check
app.post('/api/login', function(req, res){
  console.log('User login',req.body.email, req.body.password);
  user.authenticate(req.body.email, req.body.password, function (err, loggedInUser) {
    if (err){
      console.log(err);
      res.redirect('/login');
    } else {
      console.log('setting sesstion user id ', loggedInUser._id);
      req.session.userId = loggedInUser._id;
      res.redirect('/home');
    }
  });
});

//create a new user
app.post('/api/signup', function(req,res){
  console.log(req.body);
  user.createSecure(req.body.email, req.body.password, req.body.name, function (err, newUser) {
    if (err) {console.log(err)}
    console.log('New user created', newUser)
    //TODO add the seed callback module
    req.session.userId = newUser._id;
    console.log('newuserid: ', newUser._id)
    console.log('session userid:', req.session.userId)
    res.redirect('/home');
  });
});

//view all of a user's to-dos
app.get('/api/user/:id/todos', function(req,res){
  userId = req.params.id;
  user.findOne({_id: userId}, function (err, foundUser) {
    res.json(foundUser.todos);
  });
});

//api call to get a single todo for a user
app.get('/api/user/:id/todos/:todoId', function(req,res){
  userId = req.params.id;
  todoId = req.params.todoId;
  user.findOne({_id: userId}, function (err, foundUser) {
    var foundToDo = foundUser.todos.id(todoId);
    res.json(foundToDo);
  });
});

//update entry when action is repeated
app.put('/api/user/:id/todos/:todoId/repeat', function(req,res){
  userId = req.params.id;
  todoId = req.params.todoId;
  user.findOne({_id: userId}, function (err, foundUser) {
    var foundToDo = foundUser.todos.id(todoId);
    console.log("Foundtodo",foundToDo);
    foundToDo.timestamp = Date.now();
    foundToDo.count += 1;
    foundUser.save(function(err, savedList){
      res.json(savedList);
    })
  });
});



//remove a todo item from a single user
app.delete('/api/user/:id/todos/:todoId', function(req,res){
  userId = req.params.id;
  todoId = req.params.todoId;
  res.send('you just deleted post: ' + id)
})



//check if user is logged in then show them their list of todos
app.get('/home', function(req,res){
  var userId = req.session.userId;
  user.findOne({_id: userId}, function (err, currentUser) {
    if (err){
      console.log('database error: ', err);
      res.redirect('/login');
    } else if (currentUser === null) {
      res.redirect('/login');
    } else {
      console.log('loading profile of logged in user');
      res.render('list', {user: currentUser, moment: moment});
    }
  });
});


//add a new todo
app.post('/api/todos', function(req,res){
  console.log('New Todo post request to api/todos', req.body.content)
  var userId = req.session.userId;
  var newTodo = new todo({content:req.body.content});
  user.findOne({_id: userId}, function (err, foundUser) {
   foundUser.todos.unshift(newTodo);
   foundUser.save(function (err, savedList) {
     res.json(savedList);
   });
  });
});


//render the login screen
app.get('/login', function (req, res){
  res.render('login', {user: null})
})

//render a separate signup screen
app.get('/signup', function (req, res){
  res.render('signup', {user: null})
})

// log a user out
app.get('/logout', function (req, res) {
  // remove the session user id
  req.session.destroy(function(err) {
  if (err) {console.log(err)}
  res.redirect('/login');
  })
});
