var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//message db model
var Message = mongoose.model('Message',{
    msg: String
});
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


//instanciate new object to and save the post data
app.post('/api/message', function(req,res){
    console.log(req.body);

    var message = new Message(req.body);

    message.save();

    res.status(200);
})

app.get('/api/message', getMessages);

//get all db data
function getMessages(req, res){
    Message.find({}).exec(function(err, result){
        res.send(result);
    })
}
//start node server with express
var server = app.listen(5000, function(){
    console.log('listening on port ', server.address().port)
})
