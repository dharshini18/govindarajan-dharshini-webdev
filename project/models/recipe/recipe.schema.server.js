var mongoose = require('mongoose');

var recipeSchema = mongoose.Schema({
    userId: {type: String},
    course: {type: String},
    cuisine: {type: String},
    recipeId: {type: String},
    rating: {type: String},
    ingredients: [{type: String}],
    imageUrl: {type: String},
    totalTimeInSeconds: {type: Number},
    recipeName: {type: String},
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "project_recipe"});

module.exports = recipeSchema;