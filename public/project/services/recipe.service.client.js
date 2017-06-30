(function () {
    angular
        .module('PRJ')
        .service('recipeSearchService', recipeSearchService);

    function recipeSearchService($http) {
        this.searchByCourse = searchByCourse;
        this.searchByCuisine = searchByCuisine;
        this.findRecipeById = findRecipeById;
        this.addRecipe = addRecipe;
        this.addRecipeToUser = addRecipeToUser;
        this.addLikesToUser = addLikesToUser;
        this.findRecipesForUser = findRecipesForUser;

        function findRecipesForUser(userId) {
            var url = "/api/recipes/"+userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function addLikesToUser(userId, recipe) {
            var url = "/api/likes/"+userId;
            return $http.put(url, recipe)
                .then(function (response) {
                    return response.data;
                });
        }

        function addRecipeToUser(userId, recipe) {
            var url = "/api/recipe/"+userId;
            return $http.put(url, recipe)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function addRecipe(recipe) {
            var url = "/api/recipe";
            return $http.post(url,recipe)
                .then(function (response) {
                    return response.data;
                });
        }

        function findRecipeById(recipeId) {
            var url = "/api/recipe/"+recipeId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function searchByCourse(url) {
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function searchByCuisine(url) {
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();