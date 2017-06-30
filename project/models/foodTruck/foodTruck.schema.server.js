var mongoose = require('mongoose');

var foodTruckSchema = mongoose.Schema({
    userId: {type: String},
    description: {type: String, default: "NA"},
    name: {type: String, default:"NA"},
    email: {type: String, default: "NA"},
    imageUrl: {type: String, default:"NA"},
    rating: {type: String, default: "0"},
    url: {type: String, default:"NA"},
    identifier: {type: String},
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "project_foodTruck"});

module.exports = foodTruckSchema;