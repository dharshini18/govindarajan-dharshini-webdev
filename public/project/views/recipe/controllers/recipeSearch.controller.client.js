(function () {
    angular
        .module('PRJ')
        .controller('recipeSearchController', recipeSearchController);

    function recipeSearchController($location, recipeSearchService, currentUser, userService) {
        var model = this;
        var APP_ID = "188ffe5c";
        var API_KEY = "d7ab5be4eadc755720c1fcfbdaa17e5d";
        model.searchByCourse = searchByCourse;
        model.searchByCuisine = searchByCuisine;
        model.userId = currentUser._id;
        model.renderUser = renderUser;
        model.logout = logout;
        model.findRecipeById = findRecipeById;
        model.addToFavourites = addToFavourites;
        model.addLikes = addLikes;

        function init() {
            renderUser(currentUser);
        }

        init();

        function renderUser(user) {
            model.user = user;
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        function addLikes(recipe) {
            var user = model.user;
            var userId = user._id;
            var recipeId = recipe.id;
            return recipeSearchService
                .findRecipeById(recipeId)
                .then(function (response) {
                    if (response === undefined || response === "" || response === null) {
                        var newRecipe = {
                            userId: userId,
                            recipeId: recipe.id,
                            rating: recipe.rating,
                            ingredients: recipe.ingredients,
                            imageUrl: recipe.imageUrlsBySize["90"],
                            totalTimeInSeconds: recipe.totalTimeInSeconds,
                            recipeName: recipe.recipeName
                        };
                        return recipeSearchService
                            .addRecipe(newRecipe)
                            .then(function (response) {
                                return recipeSearchService
                                    .addLikesToUser(userId, response)
                                    .then(function (status) {
                                        model.message = "Yay ! Thanks for the like";
                                    }, function (err) {
                                        model.error = "Looks like something went wrong";
                                    });
                            }, function (err) {
                                model.error = "Sorry the recipe could not be updated";
                            });
                    } else {
                        return recipeSearchService
                            .addLikesToUser(userId, response)
                            .then(function (status) {
                                model.message = "Yay ! Thanks for the like";
                            }, function (status) {
                                model.error = "Looks like something went wrong";
                            });
                    }
                }, function (err) {
                    model.error = "Oops ! Recipe could not be found";
                });
        }

        function addToFavourites(recipe) {
            var user = model.user;
            var userId = user._id;
            var recipeId = recipe.id;
            return recipeSearchService
                .findRecipeById(recipeId)
                .then(function (response) {
                    if (response === undefined || response === "" || response === null) {
                        var newRecipe = {
                            userId: userId,
                            recipeId: recipe.id,
                            rating: recipe.rating,
                            ingredients: recipe.ingredients,
                            imageUrl: recipe.imageUrlsBySize["90"],
                            totalTimeInSeconds: recipe.totalTimeInSeconds,
                            recipeName: recipe.recipeName
                        };
                        return recipeSearchService
                            .addRecipe(newRecipe)
                            .then(function (response) {
                                console.log(response);
                                return recipeSearchService
                                    .addRecipeToUser(userId, response)
                                    .then(function (status) {
                                        model.message = "Yay ! Recipe was added to your favourites";
                                    }, function (err) {
                                        model.error = "Looks like something went wrong";
                                    });
                            }, function (err) {
                                model.error = "Sorry the recipe could not be updated";
                            });
                    } else {
                        console.log(response.data);
                        return recipeSearchService
                            .addRecipeToUser(userId, response)
                            .then(function (status) {
                                model.message = "Yay ! Recipe was added to your favourites";
                            }, function (status) {
                                model.error = "Looks like something went wrong";
                            });
                    }
                }, function (err) {
                    model.error = "Oops ! Recipe could not be found";
                });
        }

        function findRecipeById(recipe) {
            if (recipe !== 'undefined') {
                model.recipe = recipe;
                model.ingredients = recipe.ingredients;
            }
        }

        function searchByCourse(searchTerm) {
            var url = "http://api.yummly.com/v1/api/recipes?_app_id=" + APP_ID + "&_app_key=" + API_KEY + "&allowedCourse[]=course^course-" + searchTerm + "&maxResult=100&start=10&requirePictures=true";
            return recipeSearchService
                .searchByCourse(url)
                .then(function (response) {
                    model.recipes = response.matches;
                    model.course = searchTerm;
                }, function () {
                    model.error = "Unable to render the Information you requested";
                });
        }

        function searchByCuisine(searchTerm) {
            var url = "http://api.yummly.com/v1/api/recipes?_app_id=" + APP_ID + "&_app_key=" + API_KEY + "&allowedCuisine[]=cuisine^cuisine-" + searchTerm + "&maxResult=100&start=10&requirePictures=true";
            return recipeSearchService
                .searchByCuisine(url)
                .then(function (response) {
                    model.recipes = response.matches;
                }, function () {
                    model.error = "Unable to render the Information you requested";
                });
        }
    }
})();