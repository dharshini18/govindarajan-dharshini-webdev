var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    email: {type: String, unique: true},
    phone: String,
    roles: [{type: String, default: 'USER', enum: ['USER', 'ADMIN']}],
    recipes: [{type: mongoose.Schema.ObjectId, ref: "RecipeModel"}],
    likes: [{type: String}],
    foodTrucks : [{type: mongoose.Schema.ObjectId, ref: "FoodTruckModel"}],
    fdlikes: [{type: String}],
    facebook: {
        id:    String,
        token: String
    },
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "project_user"});

module.exports = userSchema;