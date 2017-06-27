(function () {
    angular
        .module('PRJ')
        .service('recipeSearchService', recipeSearchService);
    
    function recipeSearchService($http) {
        this.searchByCourse = searchByCourse;

        function searchByCourse(url) {
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();