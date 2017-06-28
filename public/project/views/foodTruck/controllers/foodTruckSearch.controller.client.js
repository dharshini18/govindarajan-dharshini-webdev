(function () {
    angular
        .module('PRJ')
        .controller('foodTruckSearchController', foodTruckSearchController);
    
    function foodTruckSearchController(foodTruckSearchService, $location, currentUser, userService) {
        var model = this;
        model.searchByCity = searchByCity;
        model.renderCities = renderCities;
        model.renderVendors= renderVendors;
        model.searchByVendor = searchByVendor;
        model.userId = currentUser._id;
        model.renderUser = renderUser;
        model.logout = logout;


        function init() {
            renderUser(currentUser);
            var cities_url ="http://data.streetfoodapp.com/1.1/regions";
            var vendors_url = "http://data.streetfoodapp.com/1.1/vendors";
            foodTruckSearchService
                .findRegions(cities_url)
                .then(renderCities);
            foodTruckSearchService
                .findVendors(vendors_url)
                .then(renderVendors);
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

        function renderCities(cities) {
            model.cities = cities;
        }

        function renderVendors(vendors) {
            model.vendors = vendors;
        }

        function searchByVendor(searchTerm) {
            var url = "http://data.streetfoodapp.com/1.1/vendors/"+searchTerm;
            return foodTruckSearchService
                .searchByVendor(url)
                .then(function (response) {
                    console.log(response);
                    model.foodTruckVendor = response;
                },function () {
                    model.error = "Sorry, We could not fetch the information you requested";
                });
        }

        function searchByCity(searchTerm) {
            var url = "http://data.streetfoodapp.com/1.1/schedule/"+searchTerm;
            return foodTruckSearchService
                .searchByCity(url)
                .then(function (response) {
                    console.log(response.vendors);
                    model.foodTrucks = response.vendors;
                },function () {
                    model.error = "Sorry, We could not fetch the information you requested";
                });
        }
    }
})();