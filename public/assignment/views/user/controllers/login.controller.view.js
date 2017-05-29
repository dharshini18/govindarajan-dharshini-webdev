/**
 * Created by Dharshini on 5/24/2017.
 */
(function () {
    angular
        .module('WAM')
        .controller('loginController', loginController);
    
    function loginController($location, userService) {

        //Variable bound to the current instance of the controllers
        var model = this;

        /*Event Handlers*/
        model.login = login;

        function login(username,password) {
            var found = userService.findUserByCredentials(username,password);

            if(found != null){
                $location.url('/user/' + found._id);
            }
            else {
                model.message = "Sorry, " + username + " does not exist!";
            }
        }
    }
})();