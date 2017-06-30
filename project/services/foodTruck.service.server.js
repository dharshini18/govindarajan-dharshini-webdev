var app = require('../../express');
var foodTruckModel = require('../models/foodTruck/foodTruck.model.server');

app.get('/api/foodTruck/:foodTruckId', findFoodTruckById);
app.post('/api/foodTruck', addFoodTruck);
app.put('/api/foodTruck/:userId', addFoodTruckToUser);
app.put('/api/likes/:userId', addLikesToUser);
app.get('/api/trucks/:userId', findFoodTrucksForUser);

function findFoodTrucksForUser(req, res) {
    var userId = req.params['userId'];
    foodTruckModel.findFoodTrucksForUser(userId)
        .then(function (foodTruck) {
            res.json(foodTruck)
        }, function (err) {
            res.send(err);
        });
}


function addLikesToUser(req, res) {
    var userId = req.params['userId'];
    var foodTruck = req.body;
    foodTruckModel.addLikesToUser(userId, foodTruck._id)
        .then(function (status) {
            res.send(status)
        },function (err) {
            res.send(err);
        });
}

function addFoodTruckToUser(req, res) {
    var userId = req.params['userId'];
    var foodTruck = req.body;
    foodTruckModel.addFoodTruckToUser(userId, foodTruck._id)
        .then(function (status) {
            res.send(status)
        },function (err) {
            res.send(err);
        });
}

function addFoodTruck(req, res) {
    console.log("Inside server");
    var foodTruck = req.body;
    foodTruckModel.addFoodTruck(foodTruck)
        .then(function (response) {
            res.json(response);
        }, function (err) {
            res.send(err);
        });
}

function findFoodTruckById(req, res) {
    var foodTruckId = req.params['foodTruckId'];
    foodTruckModel.findFoodTruckById(foodTruckId)
        .then(function (foodTruck) {
            if(foodTruck){
                res.json(foodTruck);
            }else{
                res.send(undefined);
            }
        },function (err) {
            res.send(err);
        });
}