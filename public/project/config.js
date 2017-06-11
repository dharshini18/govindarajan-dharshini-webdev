/**
 * Created by Dharshini on 5/27/2017.
 */
(function () {
    angular
        .module('PRJ')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/',{
                templateUrl: 'home.html'
            })
            .when('/login',{
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/user/:userId',{
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model'
            })
            .when('/register',{
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/user/:userId/search',{
                templateUrl: 'views/user/templates/search-user.view.client.html',
                controller: 'searchUserController',
                controllerAs: 'model'
            });
    }
})();