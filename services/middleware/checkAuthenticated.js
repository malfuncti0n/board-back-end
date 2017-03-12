var jwt = require('jwt-simple');
var moment = require('moment');

//function to check if a user is authentication
module.exports = function checkAuthenticated(req, res, next) {
    if(!req.header('Authorization')) {
        //not authenticate error
        return res.status(401).send({message: 'Please make sure your request has an Authorization header'});
    }

    var token = req.header('Authorization').split(' ')[1];

    var payload = jwt.decode(token, 'secret');

    if(payload.exp <= moment().unix()){
        //token has expire error
        return res.status(401).send({message: 'Token has expired'});
    }
    //user is authenticated
    req.user = payload.sub;

    next();
}
