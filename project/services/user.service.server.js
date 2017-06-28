var app = require('../../express');
var userModel = require('../models/user/user.model.server');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['email']
};
passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

app.get ('/api/user/:userId', findUserById);
app.get ('/api/user', isAdmin, findAllUsers);
app.post('/api/user', isAdmin, createUser);
app.put ('/api/user/:userId',isAdmin, updateUser);
app.delete ('/api/user/:userId', isAdmin, deleteUser);

//To test passport authentication
app.post ('/api/login', passport.authenticate('local'), login);
app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/assignment/index.html#!/profile',
        failureRedirect: '/#!/login'
    }));

app.get ('/api/loggedIn', loggedIn);
app.get ('/api/checkAdmin', checkAdmin);
app.post ('/api/logout', logout);
app.post ('/api/register', register);
app.post ('/api/unregister/:userId', unregister);
app.post ('/api/user/:userId', update);

function facebookStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var newFacebookUser = {
                        username:  profile.emails[0].value,
                        email: profile.emails[0].value,
                        facebook: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newFacebookUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}

function unregister (req, res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function (user) {
            req.logout();
            res.sendStatus(200);
        });
}

function isAdmin(req, res, next) {
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN')>-1){
        next();
    } else {
        res.sendStatus(401);
    }
}

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
    var user = req.user;
    if (req.isAuthenticated()){
        res.json(user);
    } else {
        res.send('0');
    }
}

function checkAdmin(req, res) {
    var user = req.user;
    if (req.isAuthenticated() && user.roles.indexOf('ADMIN')>-1){
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

function update(req, res) {
    var user = req.body;
    var userId = req.params['userId'];
    userModel.updateProfile(userId, user)
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