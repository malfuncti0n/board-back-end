var express = require('express');
var app=express();

app.post('/api/message', function(req,res){
    console.log(req.body);
    res.status(200);
})
var server =app.listen(5000, function(){
    console.log('listening on port ', server.address().port)
})
