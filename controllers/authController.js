//requre database models
var User = require('../Models/User');
//requre jwt for toket authentication
var jwt = require('jwt-simple');
//require moment for time manipulation
var moment = require('moment');
//export register function with a save in database
module.exports = {
    //chech if user exist in database before register
    register: function (req, res) {
        console.log(req.body);
        User.findOne({
            email: req.body.email
        }, function (err, existingUser) {
            if (existingUser) {
                //response back to user with an error if email exist
                return res.status(409).send({
                    message: 'Email is allready registered'
                });
            }
            //save user in database if not exist
            var user = new User(req.body);
            user.save(function (err, result) {
                //if any other error happend possible is a server error.
                if (err) {
                    res.status(500).send({
                        message: err.message
                    });
                }
                //we passing variable result in createtoken because it have the user object we allready save
                res.status(200).send({
                    token: createToken(result)
                });
            })
        });
    }
    , login: function (req, res) {
        user.findOne({
            email: req.body.email
        }, function (err, user) {});
        if (!user) return res.status(401).send({
            message: 'Email or Password invalid'
        });
        if (req.body.pwd == user.pwd) {
            res.send({
                token: createToken(user)
            });
        }
        else {
            return res.status(401).send({
                message: 'Invalid email and/or password'
            });
        }
    }
}

function createToken(user) {
    var payload = {
        sub: user._id
        , //moment library usage for time calculation of now time
        iat: moment().unix()
        , //and of expire time
        exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(payload, 'secret');
}
