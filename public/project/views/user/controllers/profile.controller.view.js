(function () {
    angular
        .module('PRJ')
        .controller('profileController', profileController);

    function profileController($location,
                               currentUser,
                               userService, recipeSearchService, foodTruckSearchService) {
        var model = this;
        model.userId = currentUser._id;
        model.update = update;
        model.deleteUser = deleteUser;
        model.logout = logout;
        model.unregister = unregister;

        function init() {
            renderUser(currentUser);
            renderRecipes(currentUser);
            renderFoodTrucks(currentUser);
        }
        init();
        
        function renderRecipes(user) {
            var userId = user._id;
            recipeSearchService.findRecipesForUser(userId)
                .then(function (response) {
                    model.recipes = response;
                });
        }
        
        function renderFoodTrucks(user) {
            var userId = user._id;
            foodTruckSearchService.findFoodTrucksForUser(userId)
                .then(function (response) {
                    model.foodTrucks = response;
                });
        }
        
        function unregister(user) {
            userService
                .unregister(user._id)
                .then(function (status) {
                   $location.url('/');
                });
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/');
                }, function () {
                    model.error = "Unable to unregister you";
                });
        }

        function update(user) {
            userService
                .update(user._id, user)
                .then(function () {
                    model.message = "User update was successful";
                });
        }

        function renderUser(user) {
            model.user = user;
        }

        function userError(error) {
            model.error = "User not found";
        }
    }
})();