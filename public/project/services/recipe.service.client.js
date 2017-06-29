(function () {
    angular
        .module('PRJ')
        .service('recipeSearchService', recipeSearchService);

    function recipeSearchService($http) {
        this.searchByCourse = searchByCourse;
        this.searchByCuisine = searchByCuisine;

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