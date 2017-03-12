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

//import middleware services to check for authentication
var checkAuthenticated = require('./services/middleware/checkAuthenticated')

//import middleware headers set
var core = require('./services/middleware/core')

//add json parsing for node
app.use(bodyParser.json());

//middliware functions
//change header to allow angular to post
app.use(core)


//connect to database
mongoose.connect("mongodb://localhost:27017/test", function(err,db){
    if(!err){
        console.log("we are connected to mongo");
    }
})

//register a user with auth controller register funcction
app.post('/auth/register', auth.register);

//instanciate new object to and save the post data
app.post('/api/message',checkAuthenticated, message.post);

//get database message
app.get('/api/message', message.get);


//start node server with express
var server = app.listen(5000, function(){
    console.log('listening on port ', server.address().port)
})
