(function () {
    angular
        .module('PRJ')
        .controller('recipeSearchController', recipeSearchController);

    function recipeSearchController($location,recipeSearchService) {
        var model = this;
        var APP_ID = "188ffe5c";
        var API_KEY = "d7ab5be4eadc755720c1fcfbdaa17e5d";
        model.searchByCourse = searchByCourse;

        function searchByCourse(searchTerm) {
            var url = "http://api.yummly.com/v1/api/recipes?_app_id=" + APP_ID + "&_app_key=" + API_KEY + "&allowedCourse[]=course^course-" + searchTerm + "&maxResult=100&start=10&requirePictures=true";
            console.log(url);
            return recipeSearchService
                .searchByCourse(url, searchTerm)
                .then(function (response) {
                    model.recipes = response.matches;
                    console.log(response.matches);
                },function () {
                    model.error = "Unable to render the Information you requested";
                });
        }
    }
})();