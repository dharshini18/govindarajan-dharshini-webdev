var mongoose = require('mongoose');
var recipeSchema = require('./recipe.schema.server');
var userModel = require('../user/user.model.server');
var recipeModel = mongoose.model('RecipeModel',recipeSchema);

recipeModel.findRecipeById = findRecipeById;
recipeModel.addRecipe = addRecipe;
recipeModel.addRecipeToUser = addRecipeToUser;
recipeModel.addLikesToUser = addLikesToUser;
recipeModel.findRecipesForUser= findRecipesForUser;

module.exports = recipeModel;

function findRecipesForUser(userId) {
    return recipeModel.find({userId: userId})
        .populate('recipes')
        .exec();
}

function addLikesToUser(userId, recipeId) {
    return userModel.addLikesToUser(userId, recipeId);
}

function addRecipeToUser(userId, recipeId) {
    return userModel.addRecipeToUser(userId, recipeId);
}

function addRecipe(recipe) {
    return recipeModel.create(recipe);
}

function findRecipeById(recipeId) {
    return recipeModel.findOne({recipeId: recipeId});
}
