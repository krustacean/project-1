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
app.listen(process.env.port || 5000, function (){
  console.log("listening on port 5000");
});

app.get("/", function (req, res){
  res.send('We be jammin!')
});
