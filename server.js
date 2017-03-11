//require and start express
var express = require('express');
var app = express();

//require iditional packages
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


//import authentication controller for registering and logging
var auth = require('./controllers/authController');

//import message controller for posting and getting messages
var message = require('./controllers/messageController');

//add json parsing for node
app.use(bodyParser.json());

//change header to allow angular to post
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
})


//connect to database
mongoose.connect("mongodb://localhost:27017/test", function(err,db){
    if(!err){
        console.log("we are connected to mongo");
    }
})

//register a user with auth controller register funcction
app.post('/auth/register', auth.register);

//instanciate new object to and save the post data
app.post('/api/message', message.post);

//get database message
app.get('/api/message', message.get);


//start node server with express
var server = app.listen(5000, function(){
    console.log('listening on port ', server.address().port)
})
