(function () {
    angular
        .module('PRJ')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;
        model.login = login;

        function login(username, password) {
            userService
                .findUserByCredentials(username, password)
                .then(function (found) {
                    if(found !== null) {
                        $location.url('/user/' + found._id);
                    } else {
                        model.message = "Sorry, " + username + " not found. please try again!";
                    }
                },function () {
                    model.message = "Sorry, " + username + " not found. please try again!";
                });
        }
    }
})();