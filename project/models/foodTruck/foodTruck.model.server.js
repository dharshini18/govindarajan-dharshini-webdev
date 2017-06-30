var mongoose = require('mongoose');
var foodTruckSchema = require('./foodTruck.schema.server');
var userModel = require('../user/user.model.server');
var foodTruckModel = mongoose.model('FoodTruckModel',foodTruckSchema);

foodTruckModel.findFoodTruckById = findFoodTruckById;
foodTruckModel.addFoodTruck = addFoodTruck;
foodTruckModel.addFoodTruckToUser = addFoodTruckToUser;
foodTruckModel.addLikesToUser = addLikesToUser;

module.exports = foodTruckModel;

function addLikesToUser(userId, foodTruckId) {
    return userModel.addFdLikesToUser(userId, foodTruckId);
}

function addFoodTruckToUser(userId, foodTruckId) {
    return userModel.addFoodTruckToUser(userId, foodTruckId);
}

function addFoodTruck(foodTruck) {
    return foodTruckModel.create(foodTruck);
}

function findFoodTruckById(foodTruckId) {
    return foodTruckModel.findOne({identifier: foodTruckId});
}
