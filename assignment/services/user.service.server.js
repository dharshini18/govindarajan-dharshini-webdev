var app = require('../../express');
var userModel = require('../models/user/user.model.server');

app.get ('/api/user/:userId', findUserById);
app.get ('/api/user', findAllUsers);
app.post('/api/user', createUser);
app.put ('/api/user/:userId', updateUser);
app.delete ('/api/user/:userId', deleteUser);

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
    userModel
        .createUser(user)
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
        })
}

function findAllUsers(req, res) {
    var username = req.query['username'];
    var password = req.query.password;
    userModel.findUserByCredentials(username, password)
        .then(function (user) {
            res.json(user);
        },function (err) {
            res.send(err);
        });
}