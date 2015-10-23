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
app.listen(8080, function (){
  console.log("listening on port 8080");
});

app.get("/", function (req, res){
  res.send('We be jammin!')
});
