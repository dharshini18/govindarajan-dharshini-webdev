/*
var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel',userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findAllUser = findAllUser;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.addWebsite = addWebsite;
userModel.deleteWebsite = deleteWebsite;
userModel.updateProfile = updateProfile;
userModel.findUserByFacebookId = findUserByFacebookId;

module.exports = userModel;

function findUserByFacebookId(facebookId) {
    return userModel.findOne({'facebook.id': facebookId});
}

function deleteWebsite(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.websites.indexOf(websiteId);
            user.websites.splice(index, 1);
            return user.save();
        });
}

function addWebsite(userId, website) {
    console.log(userId);
    return userModel
        .findById(userId)
        .then(function (user) {
            user.websites.push(website);
            return user.save();
        });
}

function createUser(user) {
    if(user.roles){
        user.roles = user.roles.split(',');
    } else {
        user.roles = ['USER'];
    }
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findAllUser() {
    return userModel.find();
}

function findUserByUsername(username) {
    return userModel.findOne({usermame: username});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function updateUser(userId, newUser) {
    delete newUser.username;
    if(typeof newUser.roles === 'string'){
        newUser.roles = newUser.roles.split(',');
    }
    return userModel.update({_id: userId}, {$set: newUser})
}

function updateProfile(userId, newUser) {
    return userModel.update({_id: userId}, {$set: newUser})
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}*/
