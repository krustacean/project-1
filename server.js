var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var session = require('express-session');
var user = require('./models/user');
var favicon = require('express-favicon');
var todo = require('./models/todo');

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
  if (req.session.userId === undefined) {
		res.render('index');
	} else {
		res.redirect('/home');
	}
});

app.get('/about', function(req, res){
  res.render('about')
})
//login check
app.post('/api/login', function(req, res){
  console.log('User login',req.body.email, req.body.password);
  user.authenticate(req.body.email, req.body.password, function (err, loggedInUser) {
    if (err){
      console.log(err);
      res.status(500).send();
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
app.get('/home/:id', function(req,res){
  //userId = req.params.id;
  res.json('res')
});

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
      res.render('list', {user: currentUser});
    }
  });
});


//add a new todo
app.post('/api/todos', function(req,res){
  console.log('New Todo post request to api/todos', req.body.content)
  var userId = req.session.userId;
  var newTodo = new todo({content:req.body.content});
  user.findOne({_id: userId}, function (err, foundUser) {
   foundUser.todos.push(newTodo);
   foundUser.save(function (err, savedList) {
     res.json(savedList);
   });
  });
});

//remove a todo item from a user
app.delete('api/home/:id', function(req,res){
  id = req.params.id;
  res.send('you just deleted post: ' + id)
})

app.get('/login', function (req, res){
  res.render('login')
})

app.get('/signup', function (req, res){
  res.render('signup')
})

// log a user out
app.get('/logout', function (req, res) {
  // remove the session user id
  req.session.destroy(function(err) {
  if (err) {console.log(err)}
  res.redirect('/login');
  })
  // redirect to login (for now)

});
