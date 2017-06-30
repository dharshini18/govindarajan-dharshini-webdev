var app = require('../../express');
var recipeModel = require('../models/recipe/recipe.model.server');

app.get('/api/recipe/:recipeId', findRecipeById);
app.get('/api/recipes/:userId', findRecipesForUser);
app.post('/api/recipe', addRecipe);
app.put('/api/recipe/:userId', addRecipeToUser);
app.put('/api/likes/:userId', addLikesToUser);

function findRecipesForUser(req, res) {
    var userId = req.params['userId'];
    recipeModel.findRecipesForUser(userId)
        .then(function (recipe) {
            res.json(recipe)
        }, function (err) {
            res.send(err);
        });
}

function addLikesToUser(req, res) {
    var userId = req.params['userId'];
    var recipe = req.body;
    recipeModel.addLikesToUser(userId, recipe._id)
        .then(function (status) {
            res.send(status)
        }, function (err) {
            res.send(err);
        });
}

function addRecipeToUser(req, res) {
    var userId = req.params['userId'];
    var recipe = req.body;
    recipeModel.addRecipeToUser(userId, recipe._id)
        .then(function (status) {
            res.send(status)
        }, function (err) {
            res.send(err);
        });
}

function addRecipe(req, res) {
    var recipe = req.body;
    recipeModel.addRecipe(recipe)
        .then(function (recipeNew) {
            res.json(recipeNew);
        }, function (err) {
            res.send(err);
        });
}

function findRecipeById(req, res) {
    var recipeId = req.params['recipeId'];
    recipeModel.findRecipeById(recipeId)
        .then(function (recipe) {
            if (recipe) {
                res.json(recipe);
            } else {
                res.send(undefined);
            }
        }, function (err) {
            res.send(err);
        });
}