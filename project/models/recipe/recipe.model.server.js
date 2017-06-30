var mongoose = require('mongoose');
var recipeSchema = require('./recipe.schema.server');
var userModel = require('../user/user.model.server');
var recipeModel = mongoose.model('RecipeModel',recipeSchema);

recipeModel.findRecipeById = findRecipeById;
recipeModel.addRecipe = addRecipe;
recipeModel.addRecipeToUser = addRecipeToUser;

module.exports = recipeModel;

function addRecipeToUser(userId, recipeId) {
    return userModel.addRecipeToUser(userId, recipeId);
}

function addRecipe(recipe) {
    return recipeModel.create(recipe);
}

function findRecipeById(recipeId) {
    console("Inside server model");
    return recipeModel.findOne({id: recipeId});
}
