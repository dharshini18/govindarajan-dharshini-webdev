var app = require('../../express');
var userModel = require('../models/user/user.model.server');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.get ('/api/user/:userId', findUserById);
app.get ('/api/user', findAllUsers);
app.post('/api/user', createUser);
app.put ('/api/user/:userId', updateUser);
app.delete ('/api/user/:userId', deleteUser);

//To test passport authentication
app.post ('/api/login', passport.authenticate('local'), login);
app.get ('/api/loggedIn', loggedIn);
app.post ('/api/logout', logout);
app.post ('/api/register', register);

function register (req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            req.login(user, function (status) {
                res.send(status);
            });
        });
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            if(user) {
                done(null, user);
            } else {
                done(null, false);
            }
        }, function (error) {
            done(error, false);
        });
}

function loggedIn(req, res) {
    console.log(req.user);
    var user = req.user;
    if (req.isAuthenticated()){
        res.json(user);
    } else {
        res.send('0');
    }
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}


function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel.deleteUser(userId)
        .then(function (status) {
            res.send(status);
        },function (err) {
            res.send(err);
        })
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params['userId'];
    userModel.updateUser(userId, user)
        .then(function (status) {
            res.send(status);
        },function (err) {
            res.send(err);
        })
}

function createUser(req, res) {
    var user = req.body;
    userModel.createUser(user)
        .then(function (user) {
            res.json(user);
        },function (err) {
            res.send(err);
        });
}

function findUserById(req, res) {
    var userId = req.params['userId'];
    userModel.findUserById(userId)
        .then(function (user) {
            res.json(user);
        },function (err) {
            res.send(err);
        });
}

function findAllUsers(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    if (username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if (user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            }, function(error){
                console.log(error);
                res.sendStatus(404);
            });
    } else if (username) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if (user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            });
    } else {
        userModel
            .findAllUser()
            .then(function (users) {
                res.json(users);
            });
    }
}