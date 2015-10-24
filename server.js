var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
//var db = require('./models'); TODO

///set app dependencies
app.set('view engine', 'ejs')
app.use("/static", express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//start server
app.listen(process.env.PORT || 5000, function (){
  console.log("listening on port 5000");
});

//root route
app.get("/", function (req, res){
  res.send('We be jammin!')
});

//login check
app.get('/users', function(req, res){
  res.send('you just logged in');
});

//create a new user
app.post('/users', function(req,res){
  res.send('User Posted')
});

//view all to-dos
app.get('/list', function(req,res){
  res.send('this is where your posts will live')
});

//add a new todo
app.post('/list', function(req,res){
  res.send('you just created a new todo')
})

//remove a todo item from a user
app.delete('/list/:id', function(req,res){
  id = req.params.id;
  res.send('you just deleted post: ' + id)
})
