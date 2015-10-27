var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var session = require('express-session');
var user = require('./models/user');
var favicon = require('express-favicon');

//load dotenv
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
  res.render('index')
});

app.get('/about', function(req, res){
  res.render('about')
})
//login check
app.get('/api/users/', function(req, res){
  res.send('you just logged in');
});

//create a new user
app.post('/api/users', function(req,res){
  console.log(req.body);
  user.createSecure(req.body.email, req.body.password, function (err, newUser) {
    console.log('New user created',newUser)
    req.session.userId = newUser._id;
    res.redirect('/home');
  });
});

//view all of a user's to-dos
app.get('/home/:id', function(req,res){
  res.render('list')
});

app.get('/home', function(req,res){
  res.render('list')
});

//add a new todo
app.post('/home/:id/todos', function(req,res){
  var user = req.params.id;
  res.send('you just created a new todo in this user"s list: ' + id)
})

//remove a todo item from a user
app.delete('api/home/:id', function(req,res){
  id = req.params.id;
  res.send('you just deleted post: ' + id)
})

app.get('/login', function (req, res){
  res.render('login')
})

// log a user out
app.get('/logout', function (req, res) {
  // remove the session user id
  req.session.userId = null;
  // redirect to login (for now)
  res.redirect('/login');
});
