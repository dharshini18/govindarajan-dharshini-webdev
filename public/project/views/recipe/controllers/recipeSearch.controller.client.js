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
            recipeSearchService
                .addLikes(userId, recipe)
                .then(function (status) {
                    model.message = "Yes! Thanks for the thumbs up"
                }, function (status) {
                    model.error = "Oops! Looks like something went wrong"
                });
        }

        function addToFavourites(recipe) {
            console.log("Inside Add Fav");
            var user = model.user;
            var userId = user._id;
            var recipeId = recipe.id;
            return recipeSearchService
                .findRecipeById(recipeId)
                .then(function (recipeNew) {
                    return recipeSearchService
                        .addRecipeToUser(userId, recipeNew._id)
                        .then(function (status) {
                            model.message = "Yes! Your favourites list has been updated";
                        }, function (status) {
                            model.error = "Oops! Looks like something went wrong";
                        });

                }, function () {
                    return recipeSearchService.addRecipe(recipe)
                        .then(function (recipeNew) {
                            var recipeNewId = recipeNew._id;
                            return recipeSearchService
                                .addRecipeToUser(userId, recipeNewId)
                                .then(function (status) {
                                    model.message = "Yes! Your favourites list has been updated";
                                }, function (status) {
                                    model.error = "Oops! Looks like something went wrong";
                                });
                        });
                });
        }

        function findRecipeById(recipe) {
            if (recipe !== 'undefined') {
                console.log(recipe);
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