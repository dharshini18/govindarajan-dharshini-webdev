/**
 * Created by Dharshini on 5/26/2017.
 */
(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController($location, $routeParams, userService) {

        //Variable bound to the current instance of the controllers
        var model = this;

        model.userId = $routeParams['userId'];

        model.user = userService.findUserById(model.userId);
    }
})();