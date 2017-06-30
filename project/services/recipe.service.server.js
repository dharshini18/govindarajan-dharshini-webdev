var app = require('../../express');
var recipeModel = require('../models/recipe/recipe.model.server');

app.get('/api/recipe/:recipeId', findRecipeById);
app.post('/api/recipe', addRecipe);
app.put('/api/recipe/:userId', addRecipeToUser);

function addRecipeToUser(req, res) {
    var userId = req.params['userId'];
    var recipeId = req.body;
    recipeModel.addRecipeToUser(userId, recipeId)
        .then(function (status) {
            res.send(status)
        },function (err) {
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
    console.log("Inside findRecipeById");
    var recipeId = req.params['recipeId'];
    recipeModel.findRecipeById(recipeId)
        .then(function (recipe) {
            res.json(recipe);
        },function (err) {
            res.send(err);
        });
}