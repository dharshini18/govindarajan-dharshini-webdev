(function () {
    angular
        .module('PRJ')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/',{
                templateUrl: '../project/views/home/templates/home.html',
                controller: 'mainController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/login',{
                templateUrl: '../project/views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/admin', {
                templateUrl: '../project/views/admin/templates/admin.view.client.html',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/admin/user', {
                templateUrl: '../project/views/admin/templates/admin.users.view.client.html',
                controller: 'adminUsersController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/profile',{
                templateUrl: '../project/views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/register',{
                templateUrl: '../project/views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/recipeSearch',{
                templateUrl: '../project/views/recipe/templates/recipeSearch.view.client.html',
                controller: 'recipeSearchController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/foodTruckSearch',{
                templateUrl: '../project/views/foodTruck/templates/foodTruckSearch.view.client.html',
                controller: 'foodTruckSearchController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/Search',{
                templateUrl: '../project/views/home/templates/home.html',
                controller: 'foodTruckSearchController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            });
    }

    function checkLoggedIn(userService, $q, $location) {
        var deferred = $q.defer();
        userService
            .loggedIn()
            .then(function (user) {
                if (user === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function checkCurrentUser(userService, $q, $location) {
        var deferred = $q.defer();
        userService
            .loggedIn()
            .then(function (user) {
                if (user === '0') {
                    deferred.resolve({});
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function checkAdmin(userService, $q, $location) {
        var deferred = $q.defer();
        userService
            .checkAdmin()
            .then(function (user) {
                if (user === '0') {
                    deferred.reject();
                    $location.url('/');
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }
})();