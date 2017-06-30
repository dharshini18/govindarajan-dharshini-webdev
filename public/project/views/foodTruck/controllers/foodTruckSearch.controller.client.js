(function () {
    angular
        .module('PRJ')
        .controller('foodTruckSearchController', foodTruckSearchController);

    function foodTruckSearchController(foodTruckSearchService, $location, currentUser, userService) {
        var model = this;
        model.searchByCity = searchByCity;
        model.renderCities = renderCities;
        model.renderVendors = renderVendors;
        model.searchByVendor = searchByVendor;
        model.userId = currentUser._id;
        model.renderUser = renderUser;
        model.logout = logout;
        model.findFoodTruckCity = findFoodTruckCity;
        model.findFoodTruckVendor = findFoodTruckVendor;
        model.addToFavourites = addToFavourites;
        model.addLikes = addLikes;


        function init() {
            renderUser(currentUser);
            var cities_url = "http://data.streetfoodapp.com/1.1/regions";
            var vendors_url = "http://data.streetfoodapp.com/1.1/vendors";
            foodTruckSearchService
                .findRegions(cities_url)
                .then(renderCities);
            foodTruckSearchService
                .findVendors(vendors_url)
                .then(renderVendors);
        }
        init();

        function addLikes(foodTruck) {
            var user = model.user;
            var userId = user._id;
            var foodTruckId = foodTruck.identifier;
            return foodTruckSearchService
                .findFoodTruckById(foodTruckId)
                .then(function (response) {
                    if (response === undefined || response === "" || response === null) {
                        var newFoodTruck = {
                            userId: userId,
                            description: foodTruck.description,
                            name: foodTruck.name,
                            email: foodTruck.email,
                            rating: foodTruck.rating,
                            url: foodTruck.url,
                            identifier: foodTruck.identifier
                        };
                        return foodTruckSearchService
                            .addFoodTruck(newFoodTruck)
                            .then(function (response) {
                                return foodTruckSearchService
                                    .addLikesToUser(userId, response)
                                    .then(function (status) {
                                        model.message = "Yay ! Thanks for the like";
                                    }, function (err) {
                                        model.error = "Looks like something went wrong";
                                    });
                            }, function (err) {
                                model.error = "Sorry the data could not be updated";
                            });
                    } else {
                        return foodTruckSearchService
                            .addLikesToUser(userId, response)
                            .then(function (status) {
                                model.message = "Yay ! Thanks for the like";
                            }, function (status) {
                                model.error = "Looks like something went wrong";
                            });
                    }
                }, function (err) {
                    model.error = "Oops ! FoodTruck could not be found";
                });
        }

        function addToFavourites(foodTruck) {
            var user = model.user;
            var userId = user._id;
            var foodTruckId = foodTruck.identifier;
            return foodTruckSearchService
                .findFoodTruckById(foodTruckId)
                .then(function (response) {
                    if (response === undefined || response === "" || response === null) {
                        var newFoodTruck = {
                            userId: userId,
                            description: foodTruck.description,
                            name: foodTruck.name,
                            email: foodTruck.email,
                            rating: foodTruck.rating,
                            url: foodTruck.url,
                            identifier: foodTruck.identifier
                        };
                        return foodTruckSearchService
                            .addFoodTruck(newFoodTruck)
                            .then(function (response) {
                                return foodTruckSearchService
                                    .addFoodTruckToUser(userId, response)
                                    .then(function (status) {
                                        model.message = "Yay ! FoodTruck was added to your favourites";
                                    }, function (err) {
                                        model.error = "Looks like something went wrong";
                                    });
                            }, function (err) {
                                model.error = "Sorry the foodTruck could not be updated";
                            });
                    } else {
                        console.log("Inside else");
                        console.log(response);
                        return foodTruckSearchService
                            .addFoodTruckToUser(userId, response)
                            .then(function (status) {
                                model.message = "Yay ! FoodTruck was added to your favourites";
                            }, function (status) {
                                model.error = "Looks like something went wrong";
                            });
                    }
                }, function (err) {
                    model.error = "Oops ! FoodTruck could not be found";
                });
        }

        function findFoodTruckVendor(foodTruck) {
            if (foodTruck !== 'undefined') {
                model.foodTruckVendorForDiv = foodTruck;
            }
        }

        function findFoodTruckCity(foodTruck) {
            if (foodTruck !== 'undefined') {
                model.foodTruck = foodTruck;
            }
        }

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
            var url = "http://data.streetfoodapp.com/1.1/vendors/" + searchTerm;
            return foodTruckSearchService
                .searchByVendor(url)
                .then(function (response) {
                    console.log(response);
                    model.foodTruckVendor = response;
                }, function () {
                    model.error = "Sorry, We could not fetch the information you requested";
                });
        }

        function searchByCity(searchTerm) {
            var url = "http://data.streetfoodapp.com/1.1/schedule/" + searchTerm;
            return foodTruckSearchService
                .searchByCity(url)
                .then(function (response) {
                    console.log(response.vendors);
                    model.foodTrucks = response.vendors;
                }, function () {
                    model.error = "Sorry, We could not fetch the information you requested";
                });
        }
    }
})();