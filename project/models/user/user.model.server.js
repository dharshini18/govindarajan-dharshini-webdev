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
userModel.updateProfile = updateProfile;
userModel.findUserByFacebookId = findUserByFacebookId;
userModel.addRecipeToUser = addRecipeToUser;
userModel.addLikesToUser = addLikesToUser;
userModel.addFoodTruckToUser = addFoodTruckToUser;
userModel.addFdLikesToUser = addFdLikesToUser;

module.exports = userModel;

function addFdLikesToUser(userId, foodTruckId) {
    return userModel.findById(userId)
        .then(function (user) {
            user.fdlikes.push(foodTruckId)
            return user.save();
        });
}

function addFoodTruckToUser(userId, foodTruckId) {
    return userModel.findById(userId)
        .then(function (user) {
            user.foodTrucks.push(foodTruckId)
            return user.save();
        });
}

function addLikesToUser(userId, recipeId) {
    return userModel.findById(userId)
        .then(function (user) {
            user.likes.push(recipeId)
            return user.save();
        });
}

function addRecipeToUser(userId, recipeId) {
    return userModel.findById(userId)
        .then(function (user) {
            user.recipes.push(recipeId)
            return user.save();
        });
}

function findUserByFacebookId(facebookId) {
    return userModel.findOne({'facebook.id': facebookId});
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
}